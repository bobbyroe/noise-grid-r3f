// 0)
import { OrbitControls } from "@react-three/drei";
<OrbitControls />;

// 1)
import { useFrame } from "@react-three/fiber";

function IcoSphere() {
  const icoRef = React.useRef();

  useFrame(() => {
    icoRef.current.rotation.x += 0.01;
    icoRef.current.rotation.y += 0.01;
  });
  return (
    <mesh ref={icoRef}>
      <icosahedronGeometry />
      <meshStandardMaterial color={0xffff00} />
    </mesh>
  );
}

// 2)
import getLayer from "./getLayer";

const bgSprites = getLayer({
  numSprites: 8,
  radius: 10,
  z: -10.5,
  size: 24,
  opacity: 0.2,
  path: "./rad-grad.png",
});
<primitive object={bgSprites} />;

// 3) Basic Noise Grid
function NoiseGrid() {
  const planeGeo = new THREE.PlaneGeometry(6, 6, 48, 48);
  const coords = planeGeo.attributes.position;

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach={"attributes-position"}
          count={coords.count}
          array={coords.array}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial alphaTest={0.5} size={0.1} />
    </points>
  );
}
// 4)
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
    // let ns;
    colors = [];
    // for (let i = 0; i < coords.count; i += 1) {
    //   p.fromBufferAttribute(verts, i);
    //   ns = Noise.noise(p.x * nScale, p.y * nScale, elapsedTime);
    //   p.z = ns * zPosScale;
    //   verts.setXYZ(i, p.x, p.y, p.z);
    //   col.lerpColors(lowColor, highColor, ns * lightnessMult);
    //   let { r, g, b } = col;
    //   colors.push(r, g, b);
    // }
    geo.setAttribute("position", verts);
    geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    verts.needsUpdate = true;
  });
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

// sprite
import { useLoader } from "@react-three/fiber";
const sprite = useLoader(THREE.TextureLoader, "./circle.png");

// Noise
import { ImprovedNoise } from "./ImprovedNoise.js";

const Noise = new ImprovedNoise();

// p.fromBufferAttribute(verts, i);
ns = Noise.noise(p.x * nScale, p.y * nScale, elapsedTime);
// p.z = ns * zPosScale;
