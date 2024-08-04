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
  side: THREE.Side;
  name: string;
}
const Planets: React.FC<props> = React.memo(
  ({
    textureUrl,
    position,
    args,
    snipingSpeed,
    rotationSpeed,
    distanceFromSun,
    side,
    name,
  }) => {
    const texture = useLoader(TextureLoader, textureUrl);
    const ref = useRef<THREE.Mesh | null>(null);

    useFrame(({ clock }) => {
      // rotate around iteself

      if (ref.current) {
        ref.current.rotation.y += snipingSpeed;
      }

      // rotate around the sun
      const elapsedTime = clock.getElapsedTime();
      const z = distanceFromSun * Math.cos(elapsedTime * rotationSpeed);
      const x = distanceFromSun * Math.sin(elapsedTime * rotationSpeed); // i used - to rotate countClock

      if (ref.current) {
        ref.current.position.set(x, 0, z);
      }
    });
    return (
      <mesh ref={ref} position={position}>
        <sphereGeometry args={args} />
        <meshStandardMaterial map={texture} side={side} />
        <Html position={[0, 0.1, 0]} center>
          <div
            style={{
              color: "#9e9e9e",
              fontSize: "10px",
              textAlign: "center",
            }}
          >
            {name}
          </div>
        </Html>
      </mesh>
    );
  }
);

export default Planets;
