import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function MacbookScene() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xf4d5ff, 1.1);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xbf6df5, 22, 30, 2);
    pointLight.position.set(3.5, 2.5, 6);
    scene.add(pointLight);

    const rimLight = new THREE.PointLight(0x5eead4, 10, 24, 2);
    rimLight.position.set(-4, -1.5, 4);
    scene.add(rimLight);

    const group = new THREE.Group();
    group.rotation.x = -0.18;
    scene.add(group);

    const ringGeometry = new THREE.TorusGeometry(1.55, 0.08, 24, 120);
    const ringMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xa855f7,
      emissive: 0x5b1694,
      emissiveIntensity: 0.75,
      roughness: 0.16,
      metalness: 0.78,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
    });
    const rings = [0, Math.PI / 3, (Math.PI * 2) / 3].map((rotation) => {
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.scale.set(1.36, 0.58, 1);
      ring.rotation.z = rotation;
      group.add(ring);
      return ring;
    });

    const coreGeometry = new THREE.SphereGeometry(0.36, 48, 48);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xf3e4ff,
      emissive: 0xbf6df5,
      emissiveIntensity: 1.5,
      roughness: 0.08,
      metalness: 0.25,
      clearcoat: 1,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    core.position.z = 0.18;
    group.add(core);

    const particlesCount = 900;
    const particlePositions = new Float32Array(particlesCount * 3);
    for (let index = 0; index < particlesCount; index += 1) {
      const stride = index * 3;
      const radius = 2.2 + Math.random() * 2.2;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 3.4;
      particlePositions[stride] = Math.cos(angle) * radius;
      particlePositions[stride + 1] = y;
      particlePositions[stride + 2] = Math.sin(angle) * radius;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(particlePositions, 3)
    );
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xf2defe,
      size: 0.03,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    group.add(particles);

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 0.65;
      targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 0.45;
    };

    const handlePointerLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const renderLoop = (time: number) => {
      animationFrame = requestAnimationFrame(renderLoop);

      currentX += (targetX - currentX) * 0.045;
      currentY += (targetY - currentY) * 0.045;

      rings.forEach((ring, index) => {
        ring.rotation.z = index * (Math.PI / 3) + time * 0.00014 * (index % 2 ? -1 : 1);
        ring.rotation.x = Math.sin(time * 0.00045 + index) * 0.08;
      });
      core.position.z = 0.18 + Math.sin(time * 0.0012) * 0.08;
      core.scale.setScalar(1 + Math.sin(time * 0.0012) * 0.06);
      particles.rotation.y = time * 0.00009;
      particles.rotation.x = currentY * 0.35;

      group.rotation.y = time * 0.00018 + currentX * 0.65;
      group.rotation.x = -0.18 + currentY * 0.45;

      renderer.render(scene, camera);
    };

    resize();
    window.addEventListener('resize', resize);
    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerleave', handlePointerLeave);
    animationFrame = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerLeave);

      ringGeometry.dispose();
      ringMaterial.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0" />;
}
