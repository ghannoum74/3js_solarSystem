import { useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { TextureLoader } from "three";

interface EarthProps {
  textureUrl: string;
}

const Earth: React.FC<EarthProps> = ({ textureUrl }) => {
  const texture = useLoader(TextureLoader, textureUrl);
  const earthRef = useRef<THREE.Mesh | null>(null);

  useFrame(({ clock }) => {
    //Rotate around itself
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.009;
    }
    const elapsedTime = clock.getElapsedTime();
    const x = 3 * Math.cos(-elapsedTime * 0.2);
    const z = 3 * Math.sin(-elapsedTime * 0.2);

    if (earthRef.current) {
      earthRef.current.position.set(x, 0, z);
    }
  });

  return (
    <mesh ref={earthRef} position={[3, 0, 0]}>
      <sphereGeometry args={[0.1, 64, 64]} />
      <meshStandardMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  );
};

export default Earth;
