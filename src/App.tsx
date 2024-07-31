import { Canvas } from "@react-three/fiber";
import "./css/App.css";
import { OrbitControls } from "@react-three/drei";
import Earth from "./component/Earth.js";
import Sun from "./component/Sun.js";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

const App = () => {
  return (
    <div>
      <Canvas>
        <ambientLight />
        <OrbitControls />
        <group>
          <Earth textureUrl="earth_color_10K.png" />
          <Sun textureUrl="euvi_aia304_2012_carrington.png" />
        </group>
        <EffectComposer>
          <Bloom
            intensity={1.5}
            width={256}
            height={256}
            kernelSize={4}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.1}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default App;
