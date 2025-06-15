
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Html } from '@react-three/drei';
import './HomeBackground.css'; // We'll create this CSS file next

const HomeBackground = () => {
  return (
    <div className="home-background">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        {/* Ambient Light */}
        <ambientLight intensity={0.5} />
        {/* Directional Light */}
        <directionalLight position={[5, 5, 5]} intensity={1} />
        {/* Stars for a cosmic vibe */}
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
        />
        {/* Suspense for lazy loading */}
        <Suspense fallback={<Html center>Loading...</Html>}>
          <RotatingCube />
        </Suspense>
        {/* Optional: Orbit Controls for interactivity */}
        {/* <OrbitControls enableZoom={false} /> */}
      </Canvas>
    </div>
  );
};

const RotatingCube = () => {
  return (
    <mesh rotation={[0.4, 0.2, 0]}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial color="#ff77a9" wireframe={false} />
    </mesh>
  );
};

export default HomeBackground;