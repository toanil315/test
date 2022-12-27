/** @format */

import { PerspectiveCamera } from '@react-three/drei';
import { type CommonCanvasProps } from './types';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei/core';

const CommonCanvas = ({ cameraPosition = [0, 0, 15], children }: CommonCanvasProps) => {
  return (
    <Canvas>
      <PerspectiveCamera
        position={cameraPosition}
        makeDefault
      />
      <OrbitControls />
      {children}
    </Canvas>
  );
};

export default CommonCanvas;
