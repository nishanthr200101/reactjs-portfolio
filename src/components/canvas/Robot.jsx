import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, useAnimations } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Robot = () => {
  const { scene, animations } = useGLTF("./mech_drone/scene.gltf");
  const { actions } = useAnimations(animations, scene);
  const meshRef = useRef();

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

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.6;
    }
  });

  return (
    <mesh ref={meshRef}>
      <hemisphereLight intensity={5} groundColor='black' />
      <primitive
        object={scene}
        scale={12}
        position={[0, -2, 0]}
      />
    </mesh>
  );
};

const isWebGLAvailable = () => {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
};

const RobotCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [webGL, setWebGL] = useState(true);

  useEffect(() => {
    setWebGL(isWebGLAvailable());
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);
    const handleMediaQueryChange = (event) => setIsMobile(event.matches);
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => mediaQuery.removeEventListener("change", handleMediaQueryChange);
  }, []);

  if (!webGL) return null;

  return (
    <div style={{ width: "100%", height: "40vh", position: "relative" }}>
      <Canvas
        frameloop='always'
        camera={{ position: [20, 3, 5], fov: 25 }}
        dpr={[1, 1.5]}
        gl={{ preserveDrawingBuffer: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          <Robot isMobile={isMobile} />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default RobotCanvas;
