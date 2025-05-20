"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useRef, Suspense, useEffect, useState } from "react";
import * as THREE from "three";

function CenteredModel({
  rotation,
  dragging,
}: {
  rotation: React.MutableRefObject<{ x: number; y: number }>;
  dragging: React.MutableRefObject<boolean>;
}) {
  const modelGroup = useRef<THREE.Group>(null!);
  const { scene } = useGLTF("/models/sph01.glb");
  const [centered, setCentered] = useState(false);

  useEffect(() => {
    if (!scene || !modelGroup.current || centered) return;

    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    modelGroup.current.position.set(-center.x, -center.y, -center.z);
    modelGroup.current.rotation.y = Math.PI - 2.5;

    const maxDim = Math.max(size.x, size.y, size.z);
    modelGroup.current.scale.setScalar(2 / maxDim);

    setCentered(true);
  }, [scene, centered]);

  useFrame(() => {
    if (!modelGroup.current) return;

    const targetY = dragging.current
      ? rotation.current.y
      : modelGroup.current.rotation.y + 0.015;

    const targetX = dragging.current
      ? rotation.current.x
      : modelGroup.current.rotation.x;

    modelGroup.current.rotation.y +=
      (targetY - modelGroup.current.rotation.y) * 0.1;
    modelGroup.current.rotation.x +=
      (targetX - modelGroup.current.rotation.x) * 0.1;
  });

  return (
    <group ref={modelGroup}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/models/sph01.glb");

export default function SoftOrbit() {
  const rotation = useRef({ x: 0, y: 0 });
  const dragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    dragging.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;

    const deltaX = e.clientX - lastMouse.current.x;
    const deltaY = e.clientY - lastMouse.current.y;

    rotation.current.y += deltaX * 0.01;
    rotation.current.x += deltaY * 0.01;

    lastMouse.current = { x: e.clientX, y: e.clientY };
  };

  return (
    <div
      style={{
        width: "100%",
        height: "400px",
        touchAction: "none",
        background: "transparent",
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 35 }}
        style={{ background: "transparent" }}
        gl={{
          alpha: true,
          antialias: true,
          preserveDrawingBuffer: true,
          toneMapping: THREE.LinearToneMapping,
          toneMappingExposure: Math.pow(2, 0.49), // ≈ 0.76
          outputColorSpace: THREE.SRGBColorSpace,
        }}
      >
        {/* Match glTF viewer lighting */}
        <ambientLight color={0xffffff} intensity={2} />
        <directionalLight
          position={[2, 2, 2]}
          color={0xffffff}
          intensity={0.7}
        />

        <Suspense fallback={null}>
          <CenteredModel rotation={rotation} dragging={dragging} />
        </Suspense>
      </Canvas>
    </div>
  );
}
