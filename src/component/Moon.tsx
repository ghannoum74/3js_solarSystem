import { useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { TextureLoader } from "three";

interface MonProps {
  textureUrl: string;
}

const Moon: React.FC<MonProps> = ({ textureUrl }) => {
  const moonRef = useRef<THREE.Mesh | null>(null);
  const moonTexture = useLoader(TextureLoader, textureUrl);

  useFrame(() => {
    // rotate around itself
    if (moonRef.current) {
      moonRef.current.rotation.y += 0.005;
    }
  });
  return (
    <>
      {/* <ambientLight /> */}
      <mesh ref={moonRef} position={[2, 0, 0]}>
        <sphereGeometry args={[0.08, 64, 64]} />
        <meshStandardMaterial map={moonTexture} side={THREE.DoubleSide} />
      </mesh>
    </>
  );
};

export default Moon;
