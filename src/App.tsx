import { Canvas, useFrame, useThree } from "@react-three/fiber";
import "./css/App.css";
import { CameraControls, PerspectiveCamera, Stars } from "@react-three/drei";
import Sun from "./component/Sun.js";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import Planets_data from "./utilities/Planets_data.js";
import Planets from "./component/planets.js";
import Navbar from "./component/Navbar.js";
import BodyInfoPanel from "./component/BodyInfoPanel.js";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Loading from "./utilities/Loading.js";
import { BufferGeometry, Material, Mesh, Points, Vector3 } from "three";
import type { CameraControls as CameraControlsType } from "@react-three/drei";
import Seo from "./component/Seo.js";

const bodyFromHash = () => {
  const hash = window.location.hash.slice(1).toLowerCase();
  if (hash === "pluto") return "Pluton";

  return (
    ["Sun", ...Planets_data.map((planet) => planet.name)].find(
      (name) => name.toLowerCase() === hash,
    ) ?? null
  );
};

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
      },
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

interface CameraFocusProps {
  selectedBody: string | null;
  bodyRefs: React.MutableRefObject<Record<string, Mesh | null>>;
}

const CameraFocus = ({ selectedBody, bodyRefs }: CameraFocusProps) => {
  const controlsRef = useRef<CameraControlsType>(null);
  const { camera } = useThree();
  const target = useRef(new Vector3());

  useEffect(() => {
    if (!selectedBody) return;

    gsap.killTweensOf(camera);
    gsap.killTweensOf(camera.position);
    gsap.killTweensOf(camera.rotation);
  }, [camera, selectedBody]);

  useFrame(() => {
    if (!selectedBody || !controlsRef.current) return;

    const body = bodyRefs.current[selectedBody];
    if (!body) return;

    body.updateWorldMatrix(true, false);
    body.getWorldPosition(target.current);

    const radius =
      selectedBody === "Sun"
        ? 0.9
        : (Planets_data.find((planet) => planet.name === selectedBody)
            ?.args[0] ?? 0.1);
    const distance = Math.max(radius * 7, 1.5);

    controlsRef.current.setLookAt(
      target.current.x + distance,
      target.current.y + distance * 0.45,
      target.current.z + distance,
      target.current.x,
      target.current.y,
      target.current.z,
      true,
    );
  });

  return (
    <CameraControls
      ref={controlsRef}
      smoothTime={0.25}
      minDistance={0.5}
      maxDistance={300}
      minPolarAngle={0}
      maxPolarAngle={Math.PI}
    />
  );
};

const App = () => {
  const [selectedBody, setSelectedBody] = useState<string | null>(bodyFromHash);
  const bodyRefs = useRef<Record<string, Mesh | null>>({});

  const selectBody = useCallback((name: string) => {
    setSelectedBody(name);
    const slug = name === "Pluton" ? "pluto" : name.toLowerCase();
    if (window.location.hash !== `#${slug}`) {
      window.history.pushState(null, "", `#${slug}`);
    }
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedBody(null);
    window.history.pushState(
      null,
      "",
      `${window.location.pathname}${window.location.search}`,
    );
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        clearSelection();
      }
    };
    const handleHashChange = () => setSelectedBody(bodyFromHash());

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [clearSelection]);

  return (
    <div>
      <Seo selectedBody={selectedBody} />

      <Navbar selectedBody={selectedBody} onSelectBody={selectBody} />
      <BodyInfoPanel selectedBody={selectedBody} onFreeView={clearSelection} />
      <Suspense fallback={<Loading />}>
        <Canvas
          onPointerMissed={() => {
            document.body.style.cursor = "default";
          }}
        >
          <CameraZoomPanRotate />
          <CameraFocus selectedBody={selectedBody} bodyRefs={bodyRefs} />

          <group rotation={[0, 0, 0.3]}>
            <Sun
              ref={(mesh) => {
                bodyRefs.current.Sun = mesh;
              }}
              textureUrl="euvi_aia304_2012_carrington-min.png"
              isSelected={selectedBody === "Sun"}
              onSelect={selectBody}
            />
            {Planets_data.map((item) => (
              <group key={item.id}>
                <Planets
                  ref={(mesh) => {
                    bodyRefs.current[item.name] = mesh;
                  }}
                  textureUrl={item.textureUrl}
                  position={item.position}
                  args={item.args}
                  snipingSpeed={item.snipingSpeed}
                  rotationSpeed={item.rotationSpeed}
                  distanceFromSun={item.distanceFromSun}
                  name={item.name}
                  hasTexture={item.hasTexture}
                  color={item.color}
                  onSelect={selectBody}
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
