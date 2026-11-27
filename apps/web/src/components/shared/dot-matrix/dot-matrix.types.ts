export type MatrixPoint = [number, number];

export type RGB = [number, number, number];

export type MatrixShape =
  | "heartbeat"
  | "heart"
  | "star"
  | "wave";

export type MatrixColor =
  | "green"
  | "red"
  | "purple"
  | "blue"
  | "amber";

export interface DotMatrixProps {
  shape?: MatrixShape;
  color?: MatrixColor;
  size?: number;
  speed?: number;
  trailLength?: number;
  trailWidth?: number;
  className?: string;
}