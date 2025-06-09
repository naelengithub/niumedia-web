"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useRef, Suspense, useEffect, useState } from "react";
import * as THREE from "three";

function CenteredModel({
  targetRotation,
}: {
  targetRotation: React.MutableRefObject<{ x: number; y: number }>;
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

    modelGroup.current.rotation.y +=
      (targetRotation.current.y - modelGroup.current.rotation.y) * 0.05;
    modelGroup.current.rotation.x +=
      (targetRotation.current.x - modelGroup.current.rotation.x) * 0.05;
  });

  return (
    <group ref={modelGroup}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/models/sph01.glb");

export default function SoftOrbit() {
  const targetRotation = useRef({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    // Map cursor position to rotation range
    targetRotation.current.y = (x - 0.5) * 0.6; // horizontal sway
    targetRotation.current.x = (y - 0.5) * 0.3; // vertical tilt
  };

  return (
    <div
      style={{
        width: "100%",
        height: "400px",
        touchAction: "none",
        background: "transparent",
      }}
      onPointerMove={handlePointerMove}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 35 }}
        style={{ background: "transparent" }}
        gl={{
          alpha: true,
          antialias: true,
          preserveDrawingBuffer: true,
          toneMapping: THREE.LinearToneMapping,
          toneMappingExposure: Math.pow(2, 0.49),
          outputColorSpace: THREE.SRGBColorSpace,
        }}
      >
        <ambientLight color={0xffffff} intensity={2} />
        <directionalLight
          position={[2, 2, 2]}
          color={0xffffff}
          intensity={0.7}
        />

        <Suspense fallback={null}>
          <CenteredModel targetRotation={targetRotation} />
        </Suspense>
      </Canvas>
    </div>
  );
}
