import * as THREE from 'three';

export type OrbitalSphereOptions = {
  hue: number;
  particleColor: number;
  orbitColor: number;
  nodeColor: number;
  particleCount: number;
  orbitCount: number;
  pointSize: number;
  rotationSpeed: number;
  backgroundOpacity: number;
};

export const ORBITAL_SPHERE_DEFAULTS: OrbitalSphereOptions = {
  hue: 0,
  particleColor: 0x9d4edd,
  orbitColor: 0x4c1d95,
  nodeColor: 0xe9d5ff,
  particleCount: 5200,
  orbitCount: 7,
  pointSize: 0.018,
  rotationSpeed: 1,
  backgroundOpacity: 0,
};

function fibonacciSpherePoint(index: number, total: number, radius: number) {
  const phi = Math.acos(1 - (2 * (index + 0.5)) / total);
  const theta = Math.PI * (1 + Math.sqrt(5)) * (index + 0.5);

  return new THREE.Vector3(
    Math.cos(theta) * Math.sin(phi) * radius,
    Math.sin(theta) * Math.sin(phi) * radius,
    Math.cos(phi) * radius
  );
}

function buildOrbitCurve(radiusX: number, radiusY: number, tiltX: number, tiltY: number) {
  const points: THREE.Vector3[] = [];
  for (let index = 0; index <= 240; index += 1) {
    const angle = (index / 240) * Math.PI * 2;
    const point = new THREE.Vector3(
      Math.cos(angle) * radiusX,
      Math.sin(angle) * radiusY,
      Math.sin(angle * 0.7) * radiusX * 0.18
    );
    point.applyAxisAngle(new THREE.Vector3(1, 0, 0), tiltX);
    point.applyAxisAngle(new THREE.Vector3(0, 1, 0), tiltY);
    points.push(point);
  }

  return new THREE.BufferGeometry().setFromPoints(points);
}

function createGlowTexture() {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;

  const context = canvas.getContext('2d');
  if (!context) {
    return new THREE.Texture();
  }

  const gradient = context.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  );
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.18, 'rgba(240,171,252,0.95)');
  gradient.addColorStop(0.38, 'rgba(217,70,239,0.42)');
  gradient.addColorStop(0.7, 'rgba(217,70,239,0.08)');
  gradient.addColorStop(1, 'rgba(217,70,239,0)');

  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export function createOrbitalSphereRenderer(
  canvas: HTMLCanvasElement,
  getOptions: () => OrbitalSphereOptions
) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
  camera.position.set(0, 0, 8.4);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  const group = new THREE.Group();
  group.position.x = 1.4;
  scene.add(group);

  const ambient = new THREE.AmbientLight(0xffffff, 0.9);
  scene.add(ambient);

  const light = new THREE.PointLight(0xbf6df5, 4, 24, 2);
  light.position.set(2.4, 1.8, 5.2);
  scene.add(light);

  const particleGeometry = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(ORBITAL_SPHERE_DEFAULTS.particleCount * 3);
  for (let index = 0; index < ORBITAL_SPHERE_DEFAULTS.particleCount; index += 1) {
    const point = fibonacciSpherePoint(index, ORBITAL_SPHERE_DEFAULTS.particleCount, 2.18);
    const wobble = 0.08 + Math.sin(index * 0.17) * 0.02;
    particlePositions[index * 3] = point.x * (1 + wobble * 0.06);
    particlePositions[index * 3 + 1] = point.y * (1 + wobble * 0.04);
    particlePositions[index * 3 + 2] = point.z * (1 + wobble * 0.05);
  }
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

  const particleMaterial = new THREE.PointsMaterial({
    color: ORBITAL_SPHERE_DEFAULTS.particleColor,
    size: ORBITAL_SPHERE_DEFAULTS.pointSize,
    transparent: true,
    opacity: 0.92,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const particleSphere = new THREE.Points(particleGeometry, particleMaterial);
  group.add(particleSphere);

  const orbitLines = Array.from({ length: ORBITAL_SPHERE_DEFAULTS.orbitCount }, (_, index) => {
    const geometry = buildOrbitCurve(
      2.9 + index * 0.12,
      2.15 + (index % 3) * 0.24,
      0.25 + index * 0.18,
      0.4 + index * 0.22
    );
    const material = new THREE.LineBasicMaterial({
      color: ORBITAL_SPHERE_DEFAULTS.orbitColor,
      transparent: true,
      opacity: 0.34 - index * 0.026,
    });
    const line = new THREE.Line(geometry, material);
    group.add(line);
    return line;
  });

  const nodeGroup = new THREE.Group();
  group.add(nodeGroup);

  const nodeGeometry = new THREE.SphereGeometry(0.05, 12, 12);
  const glowTexture = createGlowTexture();
  const nodes = Array.from({ length: 3 }, (_, index) => {
    const material = new THREE.MeshBasicMaterial({
      color: ORBITAL_SPHERE_DEFAULTS.nodeColor,
      transparent: true,
      opacity: 0.95,
    });
    const node = new THREE.Mesh(nodeGeometry, material);
    const glow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTexture,
        color: 0xd946ef,
        transparent: true,
        opacity: 0.68,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    );
    glow.scale.set(0.42, 0.42, 1);
    node.add(glow);
    nodeGroup.add(node);
    node.position.set(index * 0.2, 0, 0);
    return node;
  });

  const halo = new THREE.Mesh(
    new THREE.PlaneGeometry(12, 12),
    new THREE.MeshBasicMaterial({
      color: 0x6d28d9,
      transparent: true,
      opacity: ORBITAL_SPHERE_DEFAULTS.backgroundOpacity,
    })
  );
  halo.position.set(1.2, 0, -4);
  scene.add(halo);

  let width = 0;
  let height = 0;

  return {
    resize(nextWidth: number, nextHeight: number) {
      width = Math.max(nextWidth, 1);
      height = Math.max(nextHeight, 1);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    },
    render() {
      const options = getOptions();
      const time = performance.now() * 0.00011 * options.rotationSpeed;

      particleMaterial.color.setHex(options.particleColor);
      particleMaterial.size = options.pointSize;
      orbitLines.forEach((orbitLine, index) => {
        const material = orbitLine.material as THREE.LineBasicMaterial;
        material.color.setHex(options.orbitColor);
        material.opacity = 0.34 - index * 0.026;
        orbitLine.rotation.z = time * (0.9 + index * 0.18);
        orbitLine.rotation.y = time * (0.4 + index * 0.1);
      });

      nodes.forEach((node, index) => {
        const orbitRadius = 2.7 + index * 0.48;
        const speed = 0.9 + index * 0.28;
        const angle = time * 4.2 * speed + index * Math.PI * 0.85;
        node.position.set(
          Math.cos(angle) * orbitRadius,
          Math.sin(angle * 1.18) * (1.1 + index * 0.16),
          Math.sin(angle) * orbitRadius * 0.36
        );
        node.lookAt(camera.position);
        (node.material as THREE.MeshBasicMaterial).color.setHex(options.nodeColor);
        const glow = node.children[0] as THREE.Sprite | undefined;
        if (glow) {
          glow.material.color.setHex(options.nodeColor);
        }
      });

      particleSphere.rotation.y = time * 1.2;
      particleSphere.rotation.x = Math.sin(time * 1.4) * 0.08;
      group.rotation.y = Math.sin(time * 0.42) * 0.12;
      group.rotation.x = Math.cos(time * 0.36) * 0.06;
      halo.material.opacity = options.backgroundOpacity;

      renderer.render(scene, camera);
    },
    dispose() {
      particleGeometry.dispose();
      particleMaterial.dispose();
      orbitLines.forEach((orbitLine) => {
        orbitLine.geometry.dispose();
        (orbitLine.material as THREE.Material).dispose();
      });
      nodes.forEach((node) => {
        const glow = node.children[0] as THREE.Sprite | undefined;
        (glow?.material as THREE.Material | undefined)?.dispose?.();
        node.geometry.dispose();
        (node.material as THREE.Material).dispose();
      });
      nodeGeometry.dispose();
      glowTexture.dispose();
      halo.geometry.dispose();
      (halo.material as THREE.Material).dispose();
      renderer.dispose();
    },
  };
}
