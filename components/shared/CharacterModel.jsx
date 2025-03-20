import { useRef, useEffect } from "react"
import { Box, Cylinder, Sphere } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { CHARACTER_DIMENSIONS, CHARACTER_COLORS, MATERIAL_PROPERTIES } from "../../constants/character"

export function CharacterModel({ 
  colors = CHARACTER_COLORS.PLAYER, 
  dimensions = CHARACTER_DIMENSIONS,
  materials = MATERIAL_PROPERTIES,
  isMoving = false
}) {
  const leftArmRef = useRef()
  const rightArmRef = useRef()
  const leftLegRef = useRef()
  const rightLegRef = useRef()
  const clock = useRef(new THREE.Clock())

  // Create enhanced procedural textures
  const skinTexture = new THREE.DataTexture(
    (() => {
      const size = 128; // Increased resolution
      const data = new Uint8Array(size * size * 3);
      for (let i = 0; i < size * size; i++) {
        const x = i % size;
        const y = Math.floor(i / size);
        const stride = i * 3;
        
        // Create more sophisticated skin pattern with pores and variation
        const largeNoise = Math.sin(x * 0.1) * Math.cos(y * 0.1) * 15;
        const mediumNoise = Math.sin(x * 0.3) * Math.cos(y * 0.3) * 10;
        const smallNoise = Math.random() * 5;
        
        const noise = largeNoise + mediumNoise + smallNoise;
        const r = Math.min(255, Math.max(0, 235 + noise));
        const g = Math.min(255, Math.max(0, 200 + noise));
        const b = Math.min(255, Math.max(0, 180 + noise));
        
        data[stride] = r;
        data[stride + 1] = g;
        data[stride + 2] = b;
      }
      return data;
    })(),
    128,
    128,
    THREE.RGBFormat
  );
  skinTexture.wrapS = skinTexture.wrapT = THREE.RepeatWrapping;
  skinTexture.repeat.set(2, 2);
  skinTexture.needsUpdate = true;

  const clothesTexture = new THREE.DataTexture(
    (() => {
      const size = 128;
      const data = new Uint8Array(size * size * 3);
      for (let i = 0; i < size * size; i++) {
        const x = i % size;
        const y = Math.floor(i / size);
        const stride = i * 3;
        
        // Create sophisticated fabric pattern with weave and variation
        const weaveX = Math.sin(x * 0.5) * 20;
        const weaveY = Math.cos(y * 0.5) * 20;
        const smallPattern = ((x + y) % 4) * 15;
        const noise = Math.random() * 10;
        
        const pattern = Math.abs(weaveX + weaveY + smallPattern + noise);
        data[stride] = pattern;
        data[stride + 1] = pattern;
        data[stride + 2] = pattern;
      }
      return data;
    })(),
    128,
    128,
    THREE.RGBFormat
  );
  clothesTexture.wrapS = clothesTexture.wrapT = THREE.RepeatWrapping;
  clothesTexture.repeat.set(8, 8);
  clothesTexture.needsUpdate = true;

  const shoesTexture = new THREE.DataTexture(
    (() => {
      const size = 128;
      const data = new Uint8Array(size * size * 3);
      for (let i = 0; i < size * size; i++) {
        const x = i % size;
        const y = Math.floor(i / size);
        const stride = i * 3;
        
        // Create leather-like pattern with grain and scuffs
        const grain = Math.sin(x * 0.2) * Math.cos(y * 0.2) * 20;
        const scuffs = Math.random() > 0.95 ? Math.random() * 40 : 0;
        const baseNoise = Math.random() * 15;
        
        const pattern = Math.abs(grain + scuffs + baseNoise);
        data[stride] = pattern;
        data[stride + 1] = pattern;
        data[stride + 2] = pattern;
      }
      return data;
    })(),
    128,
    128,
    THREE.RGBFormat
  );
  shoesTexture.wrapS = shoesTexture.wrapT = THREE.RepeatWrapping;
  shoesTexture.repeat.set(2, 2);
  shoesTexture.needsUpdate = true;

  // Create normal maps for added detail
  const normalIntensity = 5.0;
  const normalMap = new THREE.DataTexture(
    (() => {
      const size = 128;
      const data = new Uint8Array(size * size * 3);
      for (let i = 0; i < size * size; i++) {
        const x = i % size;
        const y = Math.floor(i / size);
        const stride = i * 3;
        
        const nx = Math.sin(x * 0.3) * Math.cos(y * 0.3) * normalIntensity;
        const ny = Math.cos(x * 0.3) * Math.sin(y * 0.3) * normalIntensity;
        const nz = 1.0;
        
        data[stride] = (nx * 0.5 + 0.5) * 255;
        data[stride + 1] = (ny * 0.5 + 0.5) * 255;
        data[stride + 2] = nz * 255;
      }
      return data;
    })(),
    128,
    128,
    THREE.RGBFormat
  );
  normalMap.needsUpdate = true;

  useFrame(() => {
    if (isMoving) {
      const t = clock.current.getElapsedTime()
      
      // Enhanced animation curves for more natural movement
      if (leftArmRef.current && rightArmRef.current) {
        // Arm swing with slight curve
        leftArmRef.current.rotation.x = Math.sin(t * 4) * 0.4 + Math.sin(t * 2) * 0.1
        rightArmRef.current.rotation.x = -Math.sin(t * 4) * 0.4 - Math.sin(t * 2) * 0.1
        // Natural side swing
        leftArmRef.current.rotation.z = Math.cos(t * 2) * 0.1 + Math.cos(t) * 0.05
        rightArmRef.current.rotation.z = -Math.cos(t * 2) * 0.1 - Math.cos(t) * 0.05
      }
      
      if (leftLegRef.current && rightLegRef.current) {
        // Leg movement with natural gait
        leftLegRef.current.rotation.x = -Math.sin(t * 4) * 0.4 - Math.sin(t * 2) * 0.1
        rightLegRef.current.rotation.x = Math.sin(t * 4) * 0.4 + Math.sin(t * 2) * 0.1
        // Slight outward rotation during walk
        leftLegRef.current.rotation.y = Math.cos(t * 4) * 0.05
        rightLegRef.current.rotation.y = -Math.cos(t * 4) * 0.05
      }
    } else {
      // Smooth idle animation
      const parts = [leftArmRef, rightArmRef, leftLegRef, rightLegRef]
      parts.forEach(part => {
        if (part.current) {
          part.current.rotation.x *= 0.95
          part.current.rotation.y *= 0.95
          part.current.rotation.z *= 0.95
        }
      })
    }
  })

  return (
    <group>
      {/* Torso */}
      <Cylinder
        castShadow
        args={[0.4, 0.35, 1.2, 12]}
        position={[0, 0.9, 0]}
      >
        <meshStandardMaterial
          map={clothesTexture}
          normalMap={normalMap}
          normalScale={[0.5, 0.5]}
          color={colors.BODY}
          roughness={0.4}
          metalness={0.2}
          envMapIntensity={1.2}
          receiveShadow
          castShadow
        />
      </Cylinder>

      {/* Head */}
      <group position={[0, 1.85, 0]}>
        <Sphere castShadow args={[0.35, 32, 32]}>
          <meshStandardMaterial
            map={skinTexture}
            normalMap={normalMap}
            normalScale={[0.3, 0.3]}
            color={colors.HEAD}
            roughness={0.2}
            metalness={0.1}
            envMapIntensity={1.2}
            receiveShadow
            castShadow
          />
        </Sphere>

        {/* Eyes with depth */}
        <group position={[0.15, 0, 0.25]}>
          <Sphere args={[0.05, 16, 16]}>
            <meshStandardMaterial 
              color={colors.EYES} 
              roughness={0.1} 
              metalness={0.9}
              envMapIntensity={2}
              receiveShadow
              castShadow
            />
          </Sphere>
          <Sphere args={[0.025, 12, 12]} position={[0, 0, 0.03]}>
            <meshStandardMaterial color="#000000" />
          </Sphere>
        </group>
        <group position={[-0.15, 0, 0.25]}>
          <Sphere args={[0.05, 16, 16]}>
            <meshStandardMaterial 
              color={colors.EYES} 
              roughness={0.1} 
              metalness={0.9}
              envMapIntensity={2}
              receiveShadow
              castShadow
            />
          </Sphere>
          <Sphere args={[0.025, 12, 12]} position={[0, 0, 0.03]}>
            <meshStandardMaterial color="#000000" />
          </Sphere>
        </group>

        {/* Mouth with better shape */}
        <Cylinder
          args={[0.15, 0.15, 0.05, 32]}
          position={[0, -0.15, 0.25]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshStandardMaterial 
            color={colors.MOUTH} 
            roughness={0.4}
            metalness={0.1}
            envMapIntensity={1}
            receiveShadow
            castShadow
          />
        </Cylinder>
      </group>

      {/* Arms with better joint connection */}
      <group position={[0.45, 1.4, 0]} ref={rightArmRef}>
        <Cylinder
          castShadow
          args={[0.12, 0.1, 0.8, 12]}
          position={[0, -0.4, 0]}
          rotation={[0, 0, 0.1]}
        >
          <meshStandardMaterial
            map={clothesTexture}
            normalMap={normalMap}
            normalScale={[0.5, 0.5]}
            color={colors.BODY}
            roughness={0.6}
            metalness={0.1}
            envMapIntensity={1}
            receiveShadow
            castShadow
          />
        </Cylinder>
      </group>

      <group position={[-0.45, 1.4, 0]} ref={leftArmRef}>
        <Cylinder
          castShadow
          args={[0.12, 0.1, 0.8, 12]}
          position={[0, -0.4, 0]}
          rotation={[0, 0, -0.1]}
        >
          <meshStandardMaterial
            map={clothesTexture}
            normalMap={normalMap}
            normalScale={[0.5, 0.5]}
            color={colors.BODY}
            roughness={0.6}
            metalness={0.1}
            envMapIntensity={1}
            receiveShadow
            castShadow
          />
        </Cylinder>
      </group>

      {/* Legs with better proportions */}
      <group position={[0.2, 0.5, 0]} ref={rightLegRef}>
        <Cylinder
          castShadow
          args={[0.15, 0.12, 0.8, 12]}
          position={[0, -0.4, 0]}
        >
          <meshStandardMaterial
            map={clothesTexture}
            normalMap={normalMap}
            normalScale={[0.5, 0.5]}
            color={colors.LEGS}
            roughness={0.6}
            metalness={0.1}
            envMapIntensity={1}
            receiveShadow
            castShadow
          />
        </Cylinder>
        {/* Enhanced foot shape */}
        <group position={[0, -0.8, 0.05]}>
          <Box
            castShadow
            args={[0.2, 0.1, 0.3]}
          >
            <meshStandardMaterial
              map={shoesTexture}
              normalMap={normalMap}
              normalScale={[1, 1]}
              color={colors.LEGS}
              roughness={0.8}
              metalness={0.2}
              envMapIntensity={1}
              receiveShadow
              castShadow
            />
          </Box>
        </group>
      </group>

      <group position={[-0.2, 0.5, 0]} ref={leftLegRef}>
        <Cylinder
          castShadow
          args={[0.15, 0.12, 0.8, 12]}
          position={[0, -0.4, 0]}
        >
          <meshStandardMaterial
            map={clothesTexture}
            normalMap={normalMap}
            normalScale={[0.5, 0.5]}
            color={colors.LEGS}
            roughness={0.6}
            metalness={0.1}
            envMapIntensity={1}
            receiveShadow
            castShadow
          />
        </Cylinder>
        {/* Enhanced foot shape */}
        <group position={[0, -0.8, 0.05]}>
          <Box
            castShadow
            args={[0.2, 0.1, 0.3]}
          >
            <meshStandardMaterial
              map={shoesTexture}
              normalMap={normalMap}
              normalScale={[1, 1]}
              color={colors.LEGS}
              roughness={0.8}
              metalness={0.2}
              envMapIntensity={1}
              receiveShadow
              castShadow
            />
          </Box>
        </group>
      </group>
    </group>
  )
} 