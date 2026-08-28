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

    const ambientLight = new THREE.AmbientLight(0xf4d5ff, 1.3);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xbf6df5, 16, 30, 2);
    pointLight.position.set(3, 2, 6);
    scene.add(pointLight);

    const rimLight = new THREE.PointLight(0x5eead4, 8, 24, 2);
    rimLight.position.set(-4, -2, 4);
    scene.add(rimLight);

    const group = new THREE.Group();
    scene.add(group);

    const coreGeometry = new THREE.TorusKnotGeometry(1.15, 0.32, 220, 32);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x8a05be,
      emissive: 0x5b1694,
      emissiveIntensity: 0.8,
      roughness: 0.18,
      metalness: 0.7,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    group.add(core);

    const haloGeometry = new THREE.TorusGeometry(2.4, 0.045, 32, 220);
    const haloMaterial = new THREE.MeshBasicMaterial({
      color: 0xd39cfb,
      transparent: true,
      opacity: 0.65,
    });
    const halo = new THREE.Mesh(haloGeometry, haloMaterial);
    halo.rotation.x = Math.PI / 2.25;
    group.add(halo);

    const orbitGeometry = new THREE.TorusGeometry(1.8, 0.028, 20, 180);
    const orbitMaterial = new THREE.MeshBasicMaterial({
      color: 0x8ef7ff,
      transparent: true,
      opacity: 0.35,
    });
    const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
    orbit.rotation.x = Math.PI / 1.8;
    orbit.rotation.y = Math.PI / 5;
    group.add(orbit);

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

    const glowPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(8, 8),
      new THREE.MeshBasicMaterial({
        color: 0x56067a,
        transparent: true,
        opacity: 0.12,
      })
    );
    glowPlane.position.z = -3.5;
    scene.add(glowPlane);

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

      core.rotation.x = time * 0.00035 + currentY;
      core.rotation.y = time * 0.0006 + currentX;
      halo.rotation.z = time * 0.00026;
      orbit.rotation.z = -time * 0.00042;
      particles.rotation.y = time * 0.00009;
      particles.rotation.x = currentY * 0.35;

      group.rotation.y = currentX * 0.65;
      group.rotation.x = currentY * 0.45;

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

      coreGeometry.dispose();
      coreMaterial.dispose();
      haloGeometry.dispose();
      haloMaterial.dispose();
      orbitGeometry.dispose();
      orbitMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      glowPlane.geometry.dispose();
      (glowPlane.material as THREE.Material).dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0" />;
}
