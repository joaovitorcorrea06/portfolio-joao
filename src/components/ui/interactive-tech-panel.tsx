import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import * as THREE from 'three';

const techBadges = [
  { label: 'REACT', className: 'left-[10%] top-[14%]' },
  { label: 'TYPESCRIPT', className: 'right-[8%] top-[18%]' },
  { label: 'APIS', className: 'left-[18%] bottom-[16%]' },
  { label: 'VITEST', className: 'right-[14%] bottom-[20%]' },
];

export function InteractiveTechPanel() {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const badgeRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const panel = panelRef.current;
    const sceneHost = sceneRef.current;
    if (!panel || !sceneHost) {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0, 7.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    sceneHost.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xf3e4ff, 1.2);
    scene.add(ambient);

    const lightA = new THREE.PointLight(0xbf6df5, 12, 30, 2);
    lightA.position.set(2.8, 2.2, 6);
    scene.add(lightA);

    const lightB = new THREE.PointLight(0x7dd3fc, 7, 24, 2);
    lightB.position.set(-3.6, -2.4, 4);
    scene.add(lightB);

    const group = new THREE.Group();
    scene.add(group);

    const solid = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.2, 1),
      new THREE.MeshPhysicalMaterial({
        color: 0x8a05be,
        roughness: 0.24,
        metalness: 0.68,
        transmission: 0.08,
        thickness: 0.9,
        emissive: 0x5a138f,
        emissiveIntensity: 0.6,
        clearcoat: 1,
      })
    );
    group.add(solid);

    const wireframe = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.55, 1)),
      new THREE.LineBasicMaterial({
        color: 0xe7c8ff,
        transparent: true,
        opacity: 0.45,
      })
    );
    group.add(wireframe);

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.35, 0.05, 18, 160),
      new THREE.MeshBasicMaterial({
        color: 0x8ef7ff,
        transparent: true,
        opacity: 0.35,
      })
    );
    ring.rotation.x = Math.PI / 1.8;
    ring.rotation.y = Math.PI / 4.5;
    group.add(ring);

    const halo = new THREE.Mesh(
      new THREE.TorusGeometry(1.85, 0.03, 16, 140),
      new THREE.MeshBasicMaterial({
        color: 0xf2defe,
        transparent: true,
        opacity: 0.3,
      })
    );
    halo.rotation.x = Math.PI / 2.3;
    group.add(halo);

    const count = 680;
    const positions = new Float32Array(count * 3);
    for (let index = 0; index < count; index += 1) {
      const stride = index * 3;
      const radius = 2.1 + Math.random() * 2.5;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 2.8;
      positions[stride] = Math.cos(angle) * radius;
      positions[stride + 1] = y;
      positions[stride + 2] = Math.sin(angle) * radius;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xf8f1ff,
      size: 0.024,
      transparent: true,
      opacity: 0.82,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    group.add(particles);

    const glow = new THREE.Mesh(
      new THREE.PlaneGeometry(9, 9),
      new THREE.MeshBasicMaterial({
        color: 0x56067a,
        transparent: true,
        opacity: 0.1,
      })
    );
    glow.position.z = -3.3;
    scene.add(glow);

    const badgeQuickTos = badgeRefs.current.map((badge, index) => {
      if (!badge) {
        return null;
      }

      gsap.set(badge, { y: index % 2 === 0 ? -4 : 4 });
      gsap.to(badge, {
        y: index % 2 === 0 ? 4 : -4,
        duration: 2.6 + index * 0.25,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      return {
        xTo: gsap.quickTo(badge, 'x', { duration: 0.45, ease: 'power3.out' }),
        yTo: gsap.quickTo(badge, 'y', { duration: 0.45, ease: 'power3.out' }),
      };
    });

    const rotateXTo = gsap.quickTo(panel, 'rotateX', {
      duration: 0.45,
      ease: 'power3.out',
    });
    const rotateYTo = gsap.quickTo(panel, 'rotateY', {
      duration: 0.45,
      ease: 'power3.out',
    });
    const sceneXTo = gsap.quickTo(sceneHost, 'x', {
      duration: 0.5,
      ease: 'power3.out',
    });
    const sceneYTo = gsap.quickTo(sceneHost, 'y', {
      duration: 0.5,
      ease: 'power3.out',
    });

    let width = 0;
    let height = 0;
    let frame = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const resize = () => {
      width = sceneHost.clientWidth;
      height = sceneHost.clientHeight;
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const handleMove = (event: PointerEvent) => {
      const rect = panel.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;

      targetX = px * 0.75;
      targetY = py * 0.55;

      rotateYTo(px * 10);
      rotateXTo(-py * 10);
      sceneXTo(px * 18);
      sceneYTo(py * 18);

      badgeQuickTos.forEach((controls, index) => {
        if (!controls) {
          return;
        }

        const direction = index % 2 === 0 ? 1 : -1;
        controls.xTo(px * 18 * direction);
        controls.yTo(py * 14 * -direction);
      });
    };

    const handleLeave = () => {
      targetX = 0;
      targetY = 0;
      rotateXTo(0);
      rotateYTo(0);
      sceneXTo(0);
      sceneYTo(0);
      badgeQuickTos.forEach((controls) => {
        controls?.xTo(0);
        controls?.yTo(0);
      });
    };

    const animate = (time: number) => {
      frame = requestAnimationFrame(animate);

      currentX += (targetX - currentX) * 0.04;
      currentY += (targetY - currentY) * 0.04;

      solid.rotation.x = time * 0.00026 + currentY * 0.9;
      solid.rotation.y = time * 0.00048 + currentX * 1.2;
      wireframe.rotation.x = -time * 0.00018;
      wireframe.rotation.y = time * 0.00032;
      ring.rotation.z = time * 0.00034;
      halo.rotation.z = -time * 0.00028;
      particles.rotation.y = time * 0.00008;
      group.rotation.y = currentX * 0.55;
      group.rotation.x = currentY * 0.35;

      renderer.render(scene, camera);
    };

    resize();
    window.addEventListener('resize', resize);
    panel.addEventListener('pointermove', handleMove);
    panel.addEventListener('pointerleave', handleLeave);

    gsap.fromTo(
      panel,
      { opacity: 0, y: 28, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out' }
    );

    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      panel.removeEventListener('pointermove', handleMove);
      panel.removeEventListener('pointerleave', handleLeave);

      group.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((material) => material.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
      wireframe.geometry.dispose();
      wireframe.material.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      glow.geometry.dispose();
      (glow.material as THREE.Material).dispose();
      renderer.dispose();
      sceneHost.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={panelRef}
      className="relative mt-8 h-56 overflow-hidden rounded-[1.7rem] border border-white/10 bg-black/24 [transform-style:preserve-3d] md:h-64"
      style={{ perspective: '1200px' }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_26%),linear-gradient(180deg,rgba(10,4,18,0.35),rgba(5,1,11,0.2))]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:42px_42px]" />
      <div ref={sceneRef} className="absolute inset-0" />

      {techBadges.map((badge, index) => (
        <div
          key={badge.label}
          ref={(element) => {
            badgeRefs.current[index] = element;
          }}
          className={`absolute rounded-full border border-white/10 bg-white/8 px-3 py-2 text-[0.66rem] uppercase tracking-[0.24em] text-primary-100/82 backdrop-blur-xl ${badge.className}`.trim()}
        >
          {badge.label}
        </div>
      ))}

    </div>
  );
}
