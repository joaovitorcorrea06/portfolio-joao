import { CSSProperties, useEffect, useMemo, useRef, useState } from 'react';
import './split-flap-text.css';

const DEFAULT_WORDS = ['FRONTEND', 'MOTION', '3D WEB'];

const CHARSETS = {
  alpha: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  alphanumeric: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
  numeric: '0123456789',
};

type Charset = keyof typeof CHARSETS | string;

type SplitFlapTextProps = {
  words?: string[];
  text?: string;
  flipDuration?: number;
  stagger?: number;
  cycleDelay?: number;
  charset?: Charset;
  flipsPerChar?: number;
  tileColor?: string;
  textColor?: string;
  tileRadius?: number | string;
  gap?: number | string;
  fontSize?: number | string;
  loop?: boolean;
  padTo?: number;
  className?: string;
  style?: CSSProperties;
};

type Tile = {
  current: string;
  tick: number;
};

const toCssUnit = (value: number | string) =>
  typeof value === 'number' ? `${value}px` : value;

const normalizePhrase = (phrase: string, width: number) =>
  String(phrase ?? '').padEnd(width, ' ').slice(0, width);

const createTiles = (phrase: string): Tile[] =>
  phrase.split('').map((char) => ({
    current: char,
    tick: 0,
  }));

const sampleChar = (charset: string) =>
  charset.charAt(Math.floor(Math.random() * charset.length)) || ' ';

const buildSequence = (target: string, flips: number, charset: string) => {
  const steps: string[] = [];
  for (let index = 0; index < flips; index += 1) {
    steps.push(sampleChar(charset));
  }
  steps.push(target);
  return steps;
};

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}

export default function SplitFlapText({
  words = DEFAULT_WORDS,
  text,
  flipDuration = 0.11,
  stagger = 0.045,
  cycleDelay = 2200,
  charset = 'alpha',
  flipsPerChar = 6,
  tileColor = '#1d0a2f',
  textColor = '#f8f1ff',
  tileRadius = 10,
  gap = 6,
  fontSize = 20,
  loop = true,
  padTo = 12,
  className = '',
  style = {},
}: SplitFlapTextProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const rafRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const currentTextRef = useRef('');

  const sourceWords =
    typeof text === 'string' ? [text] : Array.isArray(words) && words.length ? words : DEFAULT_WORDS;

  const width = useMemo(() => {
    const longest = sourceWords.reduce(
      (max, phrase) => Math.max(max, String(phrase ?? '').length),
      1
    );
    return Math.max(1, padTo, longest);
  }, [padTo, sourceWords]);

  const phrases = useMemo(
    () => sourceWords.map((phrase) => normalizePhrase(String(phrase ?? ''), width)),
    [sourceWords, width]
  );

  const [tiles, setTiles] = useState<Tile[]>(() => createTiles(phrases[0] || ''));

  useEffect(() => {
    const clearTimers = () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }

      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    clearTimers();

    const activeCharset =
      typeof charset === 'string' && charset in CHARSETS
        ? CHARSETS[charset as keyof typeof CHARSETS]
        : typeof charset === 'string' && charset.length > 0
          ? charset
          : CHARSETS.alpha;

    const firstPhrase = phrases[0] || '';
    currentTextRef.current = firstPhrase;
    setTiles(createTiles(firstPhrase));

    if (phrases.length <= 1) {
      return clearTimers;
    }

    let phraseIndex = 0;
    let cancelled = false;

    const safeFlipMs = Math.max(40, flipDuration * 1000);
    const safeStaggerMs = Math.max(0, stagger * 1000);
    const safeCycleDelay = Math.max(400, cycleDelay);
    const safeFlips = Math.max(0, Math.floor(flipsPerChar));

    const animateTo = (targetPhrase: string) => {
      if (prefersReducedMotion) {
        currentTextRef.current = targetPhrase;
        setTiles(createTiles(targetPhrase));
        return 0;
      }

      const fromPhrase = normalizePhrase(currentTextRef.current, width);
      const targetChars = targetPhrase.split('');
      const plans = targetChars
        .map((targetChar, index) => {
          const fromChar = fromPhrase[index] || ' ';
          if (fromChar === targetChar) {
            return null;
          }

          return {
            index,
            sequence: buildSequence(targetChar, safeFlips, activeCharset),
            start: index * safeStaggerMs,
            step: -1,
          };
        })
        .filter(Boolean) as Array<{
        index: number;
        sequence: string[];
        start: number;
        step: number;
      }>;

      if (!plans.length) {
        currentTextRef.current = targetPhrase;
        setTiles(createTiles(targetPhrase));
        return 0;
      }

      const totalDuration = plans.reduce(
        (max, plan) => Math.max(max, plan.start + plan.sequence.length * safeFlipMs),
        0
      );
      const startedAt = performance.now();

      const tick = (now: number) => {
        if (cancelled) {
          return;
        }

        const elapsed = now - startedAt;
        let shouldContinue = false;
        const updates: Array<{ index: number; current: string }> = [];

        plans.forEach((plan) => {
          const localElapsed = elapsed - plan.start;

          if (localElapsed < 0) {
            shouldContinue = true;
            return;
          }

          const step = Math.floor(localElapsed / safeFlipMs);
          if (step < plan.sequence.length) {
            shouldContinue = true;
            if (step !== plan.step) {
              plan.step = step;
              updates.push({
                index: plan.index,
                current: plan.sequence[Math.min(step, plan.sequence.length - 1)] || ' ',
              });
            }
          }
        });

        if (updates.length) {
          setTiles((previous) => {
            const nextTiles = [...previous];
            updates.forEach((update) => {
              const tile = nextTiles[update.index];
              if (!tile) {
                return;
              }

              nextTiles[update.index] = {
                current: update.current,
                tick: tile.tick + 1,
              };
            });
            return nextTiles;
          });
        }

        if (shouldContinue) {
          rafRef.current = requestAnimationFrame(tick);
          return;
        }

        currentTextRef.current = targetPhrase;
        setTiles(createTiles(targetPhrase));
      };

      rafRef.current = requestAnimationFrame(tick);
      return totalDuration;
    };

    const scheduleNext = () => {
      if (cancelled) {
        return;
      }

      phraseIndex += 1;
      if (phraseIndex >= phrases.length) {
        if (!loop) {
          return;
        }
        phraseIndex = 0;
      }

      const duration = animateTo(phrases[phraseIndex] || phrases[0] || '');
      timeoutRef.current = window.setTimeout(scheduleNext, safeCycleDelay + duration);
    };

    timeoutRef.current = window.setTimeout(scheduleNext, safeCycleDelay);

    return () => {
      cancelled = true;
      clearTimers();
    };
  }, [
    charset,
    cycleDelay,
    flipDuration,
    flipsPerChar,
    loop,
    phrases,
    prefersReducedMotion,
    stagger,
    width,
  ]);

  return (
    <div
      className={`split-flap ${className}`.trim()}
      style={
        {
          '--split-flap-gap': toCssUnit(gap),
          '--split-flap-radius': toCssUnit(tileRadius),
          color: textColor,
          fontSize: toCssUnit(fontSize),
          ...style,
        } as CSSProperties
      }
      aria-label={text ?? sourceWords.join(', ')}
    >
      {tiles.map((tile, index) => {
        if (tile.current === ' ') {
          return <span key={`space-${index}`} className="split-flap__space" aria-hidden="true" />;
        }

        return (
          <span
            key={`${index}-${tile.tick}`}
            className="split-flap__tile"
            style={{ background: tileColor }}
            aria-hidden="true"
          >
            <span className="split-flap__char">{tile.current}</span>
          </span>
        );
      })}
    </div>
  );
}
