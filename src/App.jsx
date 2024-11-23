import * as THREE from "three";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function IcoSphere() {
  const ref = useRef();
  let currentTime = 0;
  useFrame((_, deltaTime) => {
    currentTime += deltaTime * 0.33;
    ref.current.rotation.y = currentTime;
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color={0xffff00} flatShading />
    </mesh>
  );
}

function App() {
  return (
    <Canvas gl={{ toneMapping: THREE.NoToneMapping }}>
      <IcoSphere />
      <hemisphereLight args={[0xffffff, 0x000000, 2.0]} />
      <OrbitControls />
    </Canvas>
  );
}

export default App;
