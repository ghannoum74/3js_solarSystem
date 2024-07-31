import { useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import { TextureLoader } from "three";
import * as THREE from "three";
interface sunProps {
  textureUrl: string;
}
const Sun: React.FC<sunProps> = ({ textureUrl }) => {
  const sunTexture = useLoader(TextureLoader, textureUrl);
  const sunRef = useRef<THREE.Mesh | null>(null);
  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={sunRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial map={sunTexture} side={THREE.DoubleSide} />
    </mesh>
  );
};
export default Sun;
