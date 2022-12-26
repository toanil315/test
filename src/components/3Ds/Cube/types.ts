/** @format */

import { type CoordinateVector } from '@interfaces/3D';

export type CubeProps = {
  size?: CoordinateVector;
  color?: string;
  initialRotate?: boolean;
  position?: CoordinateVector;
};
