import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three";
import { Html } from "@react-three/drei";

// Sun Component
interface SunProps {
  textureUrl: string;
}

const Sun: React.FC<SunProps> = ({ textureUrl }) => {
  const sunTexture = useLoader(TextureLoader, textureUrl);
  const sunRef = useRef<THREE.Mesh | null>(null);

  useFrame(() => {
    // Rotate around itself
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.003;
    }
  });

  return (
    <>
      <pointLight intensity={20} />

      <group>
        {/* Inner Sphere */}
        <mesh>
          <sphereGeometry args={[0.9, 32, 32]} />
          <meshStandardMaterial map={sunTexture} side={THREE.DoubleSide} />
        </mesh>

        {/* Outer Glowing Sphere */}

        <mesh ref={sunRef} scale={[1.2, 1.2, 1.2]}>
          <sphereGeometry args={[0.9, 32, 32]} />
          <meshStandardMaterial
            map={sunTexture}
            emissive={new THREE.Color("#FFFF00")}
            emissiveIntensity={3}
            emissiveMap={sunTexture}
            // side={THREE.DoubleSide}
          />
          <Html position={[0, 1.5, 0]} center>
            <div
              style={{
                color: "#9e9e9e",
                fontSize: "10px",
                textAlign: "center",
              }}
            >
              Sun
            </div>
          </Html>
        </mesh>
      </group>
    </>
  );
};
export default Sun;
