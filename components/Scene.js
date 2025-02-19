"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { 
  OrbitControls, 
  Sphere, 
  Float, 
  Environment 
} from "@react-three/drei"
import { useSpring, animated } from "@react-spring/three"

function AnimatedSphere({ position, color, speed, distort, size }) {
  const sphereRef = useRef()
  const [hovered, setHovered] = useState(false)
  
  const { scale, distortValue } = useSpring({
    scale: hovered ? 1.2 : 1,
    distortValue: hovered ? distort * 1.5 : distort,
    config: {
      mass: 1,
      tension: 170,
      friction: 26
    }
  })

  useFrame((state) => {
    const time = state.clock.getElapsedTime() * speed
    if (sphereRef.current) {
      sphereRef.current.rotation.x = time * 0.1
      sphereRef.current.rotation.y = time * 0.15
      sphereRef.current.position.y = position[1] + Math.sin(time) * 0.1
    }
  })

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={0.5}
    >
      <animated.mesh
        ref={sphereRef}
        position={position}
        scale={scale}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <Sphere args={[size, 100, 200]}>
          <animated.meshPhysicalMaterial
            color={color}
            clearcoat={0.5}
            clearcoatRoughness={0.4}
            metalness={0.5}
            roughness={0.2}
            transmission={0.2}
            thickness={2}
            distort={distortValue}
          />
        </Sphere>
      </animated.mesh>
    </Float>
  )
}

function Background() {
  const spheres = [
    { position: [-2, 0, -5], color: "#ff6b6b", speed: 1, distort: 0.3, size: 1.2 },
    { position: [2, -1, -3], color: "#4ecdc4", speed: 0.8, distort: 0.4, size: 0.8 },
    { position: [-1, 2, -4], color: "#45b7d1", speed: 1.2, distort: 0.5, size: 1 },
    { position: [3, 1, -6], color: "#96ceb4", speed: 0.9, distort: 0.3, size: 1.5 },
    { position: [0, -2, -5], color: "#4d648d", speed: 1.1, distort: 0.4, size: 0.9 }
  ]

  return (
    <group>
      {spheres.map((sphere, index) => (
        <AnimatedSphere key={index} {...sphere} />
      ))}
    </group>
  )
}

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{ 
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "auto",
        background: "radial-gradient(circle at center, #1a1a1a 0%, #000000 100%)"
      }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <spotLight position={[-10, -10, -5]} intensity={0.5} />
      
      <Background />
      
      <Environment preset="city" />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />

      <fog attach="fog" args={['#000000', 5, 15]} />
    </Canvas>
  )
}