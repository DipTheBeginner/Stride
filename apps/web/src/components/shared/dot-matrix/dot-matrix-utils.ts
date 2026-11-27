import type {
  MatrixPoint,
  RGB,
} from "./dot-matrix.types";

export function createMatrixPath(
  points: MatrixPoint[],
  closed: boolean,
): MatrixPoint[] {
  const path: MatrixPoint[] = [];

  const segments = closed
    ? points.length
    : points.length - 1;

  for (let i = 0; i < segments; i++) {
    const start = points[i];
    const end = points[(i + 1) % points.length];

    const steps = Math.max(
      Math.abs(start[0] - end[0]),
      Math.abs(start[1] - end[1]),
    );

    for (let j = 0; j < steps; j++) {
      path.push([
        Math.round(
          start[0] + ((end[0] - start[0]) * j) / steps,
        ),
        Math.round(
          start[1] + ((end[1] - start[1]) * j) / steps,
        ),
      ]);
    }
  }

  if (!closed && points.length > 0) {
    path.push(points[points.length - 1]);
  }

  return path;
}

export function getDotColor(
  color: RGB,
  intensity: number,
  whiteness: number,
): string {
  const rgb = color.map((value) => {
    const base = 8 + value * 0.13;

    const bright =
      base + (value - base) * intensity;

    return Math.round(
      bright + (255 - bright) * whiteness,
    );
  });

  return `rgb(${rgb.join(",")})`;
}