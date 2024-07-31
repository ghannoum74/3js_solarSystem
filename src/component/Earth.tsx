import { useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { TextureLoader } from "three";

interface EarthProps {
  textureUrl: string;
}

const Earth: React.FC<EarthProps> = ({ textureUrl }) => {
  const texture = useLoader(TextureLoader, textureUrl);
  const earthRef = useRef<THREE.Mesh | null>(null); // Specify type for earthRef

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={earthRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  );
};

export default Earth;
