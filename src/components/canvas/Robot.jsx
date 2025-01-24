import React, { Suspense, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, useAnimations } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Computers = () => {
  const { scene, animations } = useGLTF("./mech_drone/scene.gltf");
  const { actions } = useAnimations(animations, scene);
  const [rotation, setRotation] = useState([0, 0, 0]);

  useEffect(() => {
    if (actions) {
      actions["Take 001"]?.play();
    }
    scene.traverse((object) => {
      if (object.isMesh) {
        object.material.color.set("#FF8C00");
        object.material.metalness = 0.5;
        object.material.roughness = 0.5;
      }
    });
  }, [actions, scene]);

  useFrame(() => {
    setRotation(([x, y, z]) => [x, y + 0.01, z]);
  });

  return (
    <mesh rotation={rotation}>
      <hemisphereLight intensity={5} groundColor='black' />
      <primitive
        object={scene}
        scale={12}
        position={[0,-2,0]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '40vh' }}>
      <Canvas
        camera={{ position: [20, 3, 5], fov: 25 }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          <Computers isMobile={isMobile} />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default ComputersCanvas;
