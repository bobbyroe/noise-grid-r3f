import * as THREE from "three";
import React from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { ImprovedNoise } from "./ImprovedNoise.js";
const Noise = new ImprovedNoise();
function NoiseGrid() {
  const ref = React.useRef();

  const planeGeo = new THREE.PlaneGeometry(6, 6, 48, 48);
  const coords = planeGeo.attributes.position;
  let colors = [];
  let col = new THREE.Color();
  const p = new THREE.Vector3();
  const nScale = 0.75;
  const zPosScale = 1.0;
  const lowColor = new THREE.Color(0.0, 0.3, 0.6);
  const highColor = new THREE.Color(1.0, 1.0, 1.0);
  let lightnessMult = 3.0;
  let elapsedTime = 0;
  useFrame((_, t) => {
    elapsedTime += t * 0.5;
    const geo = ref.current.geometry;
    const verts = geo.attributes.position;
    let ns;
    colors = [];
    for (let i = 0; i < coords.count; i += 1) {
      p.fromBufferAttribute(verts, i);
      ns = Noise.noise(p.x * nScale, p.y * nScale, elapsedTime);
      p.z = ns * zPosScale;
      verts.setXYZ(i, p.x, p.y, p.z);
      col.lerpColors(lowColor, highColor, ns * lightnessMult);
      let { r, g, b } = col;
      colors.push(r, g, b);
    }
    geo.setAttribute("position", verts);
    geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    verts.needsUpdate = true;
  });
  const sprite = useLoader(THREE.TextureLoader, "./circle.png");
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach={"attributes-position"}
          count={coords.count}
          array={coords.array}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial alphaTest={0.5} vertexColors size={0.1} map={sprite} />
    </points>
  );
}

function App() {
  return (
    <Canvas gl={{ toneMapping: THREE.NoToneMapping }}>
      <NoiseGrid />
      <OrbitControls />
    </Canvas>
  );
}

export default App;
