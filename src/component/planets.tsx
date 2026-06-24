import { Html } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import React, { useRef } from "react";
import { TextureLoader } from "three";
import * as THREE from "three";
interface props {
  textureUrl: string;
  position: THREE.Vector3;
  args: [number, number, number, number?, number?, number?, number?];
  snipingSpeed: number;
  rotationSpeed: number;
  distanceFromSun: number;
  name: string;
  hasTexture: boolean;
  color: string;
  onSelect: (name: string) => void;
}
const Planets = React.memo(
  React.forwardRef<THREE.Mesh, props>(function Planets(
    {
    textureUrl,
    position,
    args,
    snipingSpeed,
    rotationSpeed,
    distanceFromSun,
    name,
    hasTexture,
    color,
    onSelect,
    },
    forwardedRef
  ) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const texture = hasTexture ? useLoader(TextureLoader, textureUrl) : null;
    const localRef = useRef<THREE.Mesh | null>(null);

    const setRef = (mesh: THREE.Mesh | null) => {
      localRef.current = mesh;
      if (typeof forwardedRef === "function") {
        forwardedRef(mesh);
      } else if (forwardedRef) {
        forwardedRef.current = mesh;
      }
    };

    const handlePointerOver = () => {
      document.body.style.cursor = "pointer";
    };

    const handlePointerOut = () => {
      document.body.style.cursor = "default";
    };

    useFrame(({ clock }) => {
      // rotate around iteself

      if (localRef.current) {
        localRef.current.rotation.y += snipingSpeed;
      }

      // rotate around the sun
      const elapsedTime = clock.getElapsedTime();
      const z = distanceFromSun * Math.cos(elapsedTime * rotationSpeed);
      const x = distanceFromSun * Math.sin(elapsedTime * rotationSpeed);

      if (localRef.current) {
        localRef.current.position.set(x, 0, z);
      }
    });
    return (
      <mesh
        ref={setRef}
        position={position}
        onClick={(event) => {
          event.stopPropagation();
          onSelect(name);
        }}
        onPointerOver={(event) => {
          event.stopPropagation();
          handlePointerOver();
        }}
        onPointerOut={handlePointerOut}
      >
        <sphereGeometry args={args} />
        {hasTexture ? (
          <meshStandardMaterial map={texture} />
        ) : (
          <meshStandardMaterial color={color} />
        )}
        <mesh>
          <sphereGeometry args={[Math.max(args[0] * 1.25, 0.18), 12, 12]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
        <Html position={[0, Math.max(args[0] + 0.08, 0.1), 0]} center>
          <div
            style={{
              color: "#9e9e9e",
              fontSize: "10px",
              textAlign: "center",
              pointerEvents: "none",
            }}
          >
            {name}
          </div>
        </Html>
      </mesh>
    );
  })
);

export default Planets;
