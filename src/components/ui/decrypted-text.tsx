import {
  HTMLAttributes,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

type AnimateOn = 'view' | 'hover' | 'click';
type RevealDirection = 'start' | 'end' | 'center';
type ClickMode = 'once' | 'toggle';

type DecryptedTextProps = {
  text: string;
  speed?: number;
  sequential?: boolean;
  revealDirection?: RevealDirection;
  useOriginalCharsOnly?: boolean;
  characters?: string;
  animateOn?: AnimateOn;
  clickMode?: ClickMode;
  className?: string;
  encryptedClassName?: string;
  parentClassName?: string;
} & Omit<HTMLAttributes<HTMLSpanElement>, 'children'>;

export default function DecryptedText({
  text,
  speed = 42,
  sequential = true,
  revealDirection = 'center',
  useOriginalCharsOnly = false,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890',
  animateOn = 'view',
  clickMode = 'once',
  className = '',
  encryptedClassName = '',
  parentClassName = '',
  ...props
}: DecryptedTextProps) {
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const intervalRef = useRef<number | null>(null);
  const [displayText, setDisplayText] = useState(text);
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isDecrypted, setIsDecrypted] = useState(animateOn !== 'click');

  const availableChars = useMemo(() => {
    return useOriginalCharsOnly
      ? Array.from(new Set(text.split(''))).filter((char) => char !== ' ')
      : characters.split('');
  }, [characters, text, useOriginalCharsOnly]);

  const shuffleText = useCallback(
    (currentRevealed: Set<number>) => {
      return text
        .split('')
        .map((char, index) => {
          if (char === ' ') {
            return ' ';
          }

          if (currentRevealed.has(index)) {
            return char;
          }

          return availableChars[
            Math.floor(Math.random() * availableChars.length)
          ];
        })
        .join('');
    },
    [availableChars, text]
  );

  const getRevealOrder = useCallback(() => {
    const order: number[] = [];
    const length = text.length;

    if (revealDirection === 'start') {
      for (let index = 0; index < length; index += 1) {
        order.push(index);
      }
      return order;
    }

    if (revealDirection === 'end') {
      for (let index = length - 1; index >= 0; index -= 1) {
        order.push(index);
      }
      return order;
    }

    const center = Math.floor(length / 2);
    let offset = 0;

    while (order.length < length) {
      const right = center + offset;
      const left = center - offset - 1;

      if (right < length) {
        order.push(right);
      }

      if (left >= 0) {
        order.push(left);
      }

      offset += 1;
    }

    return order;
  }, [revealDirection, text.length]);

  const clearAnimation = useCallback(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startAnimation = useCallback(() => {
    if (hasAnimated && animateOn === 'view') {
      return;
    }

    clearAnimation();

    const revealOrder = sequential
      ? getRevealOrder().filter((index) => text[index] !== ' ')
      : text
          .split('')
          .map((_, index) => index)
          .filter((index) => text[index] !== ' ');

    let pointer = 0;
    const nextRevealed = new Set<number>();

    setIsDecrypted(false);
    setDisplayText(shuffleText(nextRevealed));

    intervalRef.current = window.setInterval(() => {
      if (pointer >= revealOrder.length) {
        clearAnimation();
        setDisplayText(text);
        setRevealed(new Set(revealOrder));
        setIsDecrypted(true);
        setHasAnimated(true);
        return;
      }

      const iterations = sequential ? 1 : 2;
      for (
        let iteration = 0;
        iteration < iterations && pointer < revealOrder.length;
        iteration += 1
      ) {
        nextRevealed.add(revealOrder[pointer]);
        pointer += 1;
      }

      setRevealed(new Set(nextRevealed));
      setDisplayText(shuffleText(nextRevealed));
    }, speed);
  }, [
    animateOn,
    clearAnimation,
    getRevealOrder,
    hasAnimated,
    sequential,
    shuffleText,
    speed,
    text,
  ]);

  useEffect(() => {
    if (animateOn !== 'view') {
      return;
    }

    const node = containerRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          startAnimation();
        }
      },
      { threshold: 0.65 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [animateOn, startAnimation]);

  useEffect(() => {
    setDisplayText(text);
    setRevealed(new Set());
    setHasAnimated(false);
    setIsDecrypted(animateOn !== 'click');
    clearAnimation();
    return () => clearAnimation();
  }, [animateOn, clearAnimation, text]);

  const handleHover = () => {
    if (animateOn === 'hover') {
      startAnimation();
    }
  };

  const handleClick = () => {
    if (animateOn !== 'click') {
      return;
    }

    if (clickMode === 'toggle' && isDecrypted) {
      setDisplayText(shuffleText(new Set()));
      setRevealed(new Set());
      setIsDecrypted(false);
      return;
    }

    startAnimation();
  };

  return (
    <span
      ref={containerRef}
      className={parentClassName}
      onMouseEnter={handleHover}
      onClick={handleClick}
      {...props}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline-block whitespace-pre-wrap">
        {displayText.split('').map((char, index) => {
          const revealedChar = revealed.has(index) || char === ' ';
          return (
            <span
              key={`${char}-${index}`}
              className={revealedChar ? className : encryptedClassName}
            >
              {char}
            </span>
          );
        })}
      </span>
    </span>
  );
}
