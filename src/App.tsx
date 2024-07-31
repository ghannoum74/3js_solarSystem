import { Canvas } from "@react-three/fiber";
import "./css/App.css";
import { OrbitControls } from "@react-three/drei";
import Earth from "./component/Earth.js";

const App = () => {
  return (
    <div>
      <Canvas>
        <ambientLight />
        <Earth textureUrl="earth_color_10K.png" />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default App;
