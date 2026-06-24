import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three";
import { Html } from "@react-three/drei";

// Sun Component
interface SunProps {
  textureUrl: string;
  isSelected: boolean;
  onSelect: (name: string) => void;
}

const Sun = React.forwardRef<THREE.Mesh, SunProps>(function Sun(
  { textureUrl, isSelected, onSelect },
  forwardedRef
) {
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

        <mesh
          ref={(mesh) => {
            sunRef.current = mesh;
            if (typeof forwardedRef === "function") {
              forwardedRef(mesh);
            } else if (forwardedRef) {
              forwardedRef.current = mesh;
            }
          }}
          scale={[1.2, 1.2, 1.2]}
          onClick={(event) => {
            event.stopPropagation();
            onSelect("Sun");
          }}
          onPointerOver={(event) => {
            event.stopPropagation();
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            document.body.style.cursor = "default";
          }}
        >
          <sphereGeometry args={[0.9, 32, 32]} />
          <meshStandardMaterial
            map={sunTexture}
            emissive={new THREE.Color("#FFFF00")}
            emissiveIntensity={isSelected ? 4.5 : 3}
            emissiveMap={sunTexture}
            // side={THREE.DoubleSide}
          />
          <Html position={[0, 1.5, 0]} center>
            <div
              style={{
                color: "#9e9e9e",
                fontSize: "10px",
                textAlign: "center",
                pointerEvents: "none",
              }}
            >
              Sun
            </div>
          </Html>
        </mesh>
      </group>
    </>
  );
});
export default Sun;
