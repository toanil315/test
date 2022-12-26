/** @format */

import React, { useEffect, useRef } from 'react';
import { extend } from '@react-three/fiber';
import { Mesh, BoxGeometry, MeshStandardMaterial } from 'three';
import { type CubeProps } from './types';

extend({ Mesh, BoxGeometry, MeshStandardMaterial });

const Cube = ({
  color,
  size = [1, 1, 1],
  position = [0, 0, 0],
  initialRotate = false,
}: CubeProps) => {
  const ref = useRef<Mesh>(null!);

  useEffect(() => {
    if (initialRotate) {
      ref.current.rotateZ(Math.PI / 4);
      ref.current.rotateX(Math.PI / 6);
    }
  }, [initialRotate]);

  useEffect(() => {
    if (position) {
      ref.current.position.set(...position);
    }
  }, [position]);

  return (
    <mesh ref={ref}>
      <boxGeometry args={size} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
};

export default Cube;
