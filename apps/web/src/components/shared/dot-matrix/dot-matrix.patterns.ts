import type {
  MatrixShape,
  MatrixColor,
  MatrixPoint,
  RGB,
} from "./dot-matrix.types";

export const GRID_SIZE = 15;

export const MATRIX_COLORS: Record<MatrixColor, RGB> = {
  green: [35, 255, 112],
  red: [255, 32, 65],
  purple: [164, 85, 255],
  blue: [30, 175, 255],
  amber: [255, 185, 35],
};

export const MATRIX_PATTERNS: Record<
  MatrixShape,
  {
    points: MatrixPoint[];
    closed: boolean;
  }
> = {
  heartbeat: {
    points: [
      [0, 7],
      [3, 7],
      [4, 6],
      [5, 7],
      [6, 9],
      [7, 2],
      [8, 12],
      [9, 7],
      [10, 6],
      [11, 7],
      [14, 7],
    ],
    closed: false,
  },

  heart: {
    points: [
      [7, 4],
      [5, 2],
      [3, 2],
      [1, 4],
      [1, 7],
      [7, 13],
      [13, 7],
      [13, 4],
      [11, 2],
      [9, 2],
    ],
    closed: true,
  },

  star: {
    points: [
      [7, 1],
      [9, 5],
      [14, 5],
      [10, 8],
      [12, 13],
      [7, 10],
      [2, 13],
      [4, 8],
      [0, 5],
      [5, 5],
    ],
    closed: true,
  },

  wave: {
    points: [
      [0, 7],
      [2, 3],
      [4, 2],
      [7, 7],
      [10, 12],
      [12, 11],
      [14, 7],
    ],
    closed: false,
  },
};