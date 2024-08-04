import { Canvas, useThree } from "@react-three/fiber";
import "./css/App.css";
import {
  CameraControls,
  OrbitControls,
  PerspectiveCamera,
  Stars,
} from "@react-three/drei";
import Sun from "./component/Sun.js";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import Planets_data from "./utilities/Planets_data.js";
import Planets from "./component/planets.js";
import Navbar from "./component/Navbar.js";
import { Suspense, useEffect, useRef } from "react";
import gsap from "gsap";
import Loading from "./utilities/Loading.js";
import { BufferGeometry, Material, Points } from "three";

const CameraZoomPanRotate = () => {
  const { camera } = useThree();
  const starRef = useRef<Points<BufferGeometry, Material>>(null);
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power1.out" } });

    // Initial zoom in
    tl.fromTo(
      camera,
      { fov: 125 },
      {
        fov: 25,
        duration: 2,
        onUpdate: () => camera.updateProjectionMatrix(),
      }
    );

    // Pan across the scene
    tl.to(camera.position, {
      x: 10,
      y: 5,
      duration: 2,
      delay: 0.5,
    });

    // Rotate to give a panoramic view
    tl.to(camera.rotation, {
      y: Math.PI / 4,
      duration: 2,
    });

    // Fade in stars during the pan and rotation
    // tl.fromTo(
    //   starRef.current,
    //   { opacity: 0 },
    //   {
    //     opacity: 1,
    //     duration: 2,
    //     onUpdate: () =>
    //       (starRef.current.material.opacity = starRef.current.opacity),
    //   },
    //   "-=4" // start this animation 4 seconds before the previous one ends
    // );
  }, [camera]);

  return (
    <>
      <PerspectiveCamera position={[0, 7, 20]} makeDefault />
      <Stars
        ref={starRef}
        radius={150}
        depth={100}
        count={5000}
        factor={3}
        saturation={0}
        fade
        // opacity={0}
      />
    </>
  );
};

const App = () => {
  return (
    <div>
      <Navbar />
      <Suspense fallback={<Loading />}>
        <Canvas>
          <CameraZoomPanRotate />
          <OrbitControls zoomSpeed={2} />

          <CameraControls
            enabled={true}
            minDistance={2}
            maxDistance={300}
            minPolarAngle={0}
            maxPolarAngle={Math.PI}
            minZoom={100}
          />

          <group rotation={[0, 0, 0.3]}>
            <Sun textureUrl="euvi_aia304_2012_carrington-min.png" />
            {Planets_data.map((item) => (
              <group key={item.id}>
                <Planets
                  textureUrl={item.textureUrl}
                  position={item.position}
                  args={item.args}
                  snipingSpeed={item.snipingSpeed}
                  rotationSpeed={item.rotationSpeed}
                  distanceFromSun={item.distanceFromSun}
                  side={item.side}
                  name={item.name}
                />

                <mesh position={[0, 0, 0]} rotation={[1.57, 0, 0]}>
                  {/* Set this rotation to be land on the floor */}
                  <torusGeometry args={[item.distanceFromSun, 0.001]} />
                  <meshBasicMaterial opacity={0.1} transparent />
                </mesh>
              </group>
            ))}
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
        </Canvas>
      </Suspense>
    </div>
  );
};

export default App;
