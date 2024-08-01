import { Canvas } from "@react-three/fiber";
import "./css/App.css";
import { OrbitControls } from "@react-three/drei";
import Sun from "./component/Sun.js";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import Planets_data from "./utilities/Planets_data.js";
import Planets from "./component/planets.js";

const App = () => {
  return (
    <div>
      <Canvas camera={{ position: [0, 7, 10] }}>
        {/* <ambientLight intensity={10} /> */}
        <OrbitControls />
        <group>
          <Sun textureUrl="euvi_aia304_2012_carrington.png" />
          {Planets_data.map((item) => {
            return (
              <group key={item.id}>
                <Planets
                  textureUrl={item.textureUrl}
                  position={item.position}
                  args={item.args}
                  snipingSpeed={item.snipingSpeed}
                  rotationSpeed={item.rotationSpeed}
                  distanceFromSun={item.distanceFromSun}
                  side={item.side}
                />
                <mesh position={[0, 0, 0]} rotation={[1.57, 0, 0]}>
                  {/* //set this rotation to be land on the floor */}

                  <torusGeometry args={[item.distanceFromSun, 0.001]} />
                  <meshBasicMaterial opacity={0.1} transparent />
                </mesh>
              </group>
            );
          })}
        </group>
        <EffectComposer>
          <Bloom
            intensity={2}
            width={256}
            height={256}
            kernelSize={3}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.1}
          />
        </EffectComposer>
        {/* <axesHelper args={[5]} />
        <gridHelper args={[10, 10]} /> */}
      </Canvas>
    </div>
  );
};

export default App;
