import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function CtaSignalScene() {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 8.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xf3e4ff, 1.6);
    scene.add(ambient);

    const key = new THREE.PointLight(0xbf6df5, 28, 30, 2);
    key.position.set(2.4, 2.8, 5.8);
    scene.add(key);

    const fill = new THREE.PointLight(0x7dd3fc, 14, 26, 2);
    fill.position.set(-3.2, -2.4, 4.6);
    scene.add(fill);

    const group = new THREE.Group();
    scene.add(group);

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.42, 2),
      new THREE.MeshPhysicalMaterial({
        color: 0x8a05be,
        roughness: 0.18,
        metalness: 0.62,
        transmission: 0.06,
        thickness: 1.2,
        clearcoat: 1,
        emissive: 0x5f0d8e,
        emissiveIntensity: 1.1,
      })
    );
    group.add(core);

    const wire = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.82, 1)),
      new THREE.LineBasicMaterial({
        color: 0xf3e4ff,
        transparent: true,
        opacity: 0.36,
      })
    );
    group.add(wire);

    const ringA = new THREE.Mesh(
      new THREE.TorusGeometry(2.45, 0.05, 20, 160),
      new THREE.MeshBasicMaterial({
        color: 0xd39cfb,
        transparent: true,
        opacity: 0.34,
      })
    );
    ringA.rotation.x = Math.PI / 2.4;
    ringA.rotation.y = Math.PI / 4.5;
    group.add(ringA);

    const ringB = new THREE.Mesh(
      new THREE.TorusGeometry(3.05, 0.035, 20, 180),
      new THREE.MeshBasicMaterial({
        color: 0x9efcff,
        transparent: true,
        opacity: 0.2,
      })
    );
    ringB.rotation.x = Math.PI / 1.55;
    ringB.rotation.z = Math.PI / 5;
    group.add(ringB);

    const particlesCount = 900;
    const positions = new Float32Array(particlesCount * 3);
    for (let index = 0; index < particlesCount; index += 1) {
      const stride = index * 3;
      const radius = 2.8 + Math.random() * 2.8;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 3.2;
      positions[stride] = Math.cos(angle) * radius;
      positions[stride + 1] = y;
      positions[stride + 2] = Math.sin(angle) * radius;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xf8f1ff,
      size: 0.028,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    group.add(particles);

    const glowPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(12, 12),
      new THREE.MeshBasicMaterial({
        color: 0x7a12b2,
        transparent: true,
        opacity: 0.12,
      })
    );
    glowPlane.position.z = -4;
    scene.add(glowPlane);

    let frame = 0;
    let width = 0;
    let height = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const resize = () => {
      width = host.clientWidth;
      height = host.clientHeight;
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const handleMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 0.85;
      targetY = y * 0.65;
    };

    const handleLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const animate = (time: number) => {
      frame = requestAnimationFrame(animate);
      currentX += (targetX - currentX) * 0.035;
      currentY += (targetY - currentY) * 0.035;

      core.rotation.x = time * 0.00022 + currentY * 0.95;
      core.rotation.y = time * 0.00046 + currentX * 1.1;
      wire.rotation.x = -time * 0.00015;
      wire.rotation.y = time * 0.00026;
      ringA.rotation.z = time * 0.00034;
      ringB.rotation.z = -time * 0.00025;
      group.rotation.y = currentX * 0.45;
      group.rotation.x = currentY * 0.28;
      particles.rotation.y = time * 0.00008;
      particles.rotation.x = time * 0.00003;

      renderer.render(scene, camera);
    };

    resize();
    window.addEventListener('resize', resize);
    host.addEventListener('pointermove', handleMove);
    host.addEventListener('pointerleave', handleLeave);
    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      host.removeEventListener('pointermove', handleMove);
      host.removeEventListener('pointerleave', handleLeave);
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
      host.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={hostRef} className="absolute inset-0" />;
}
