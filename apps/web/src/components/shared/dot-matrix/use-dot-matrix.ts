"use client";

import { useEffect, useRef } from "react";

import {
  GRID_SIZE,
  MATRIX_COLORS,
  MATRIX_PATTERNS,
} from "./dot-matrix.patterns";

import {
  createMatrixPath,
  getDotColor,
} from "./dot-matrix-utils";

import type {
  MatrixShape,
  MatrixColor,
} from "./dot-matrix.types";

interface UseDotMatrixOptions {
  shape: MatrixShape;
  color: MatrixColor;
  speed: number;
  trailLength: number;
  trailWidth: number;
}

export function useDotMatrix({
  shape,
  color,
  speed,
  trailLength,
  trailWidth,
}: UseDotMatrixOptions) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const pattern = MATRIX_PATTERNS[shape];
    const rgb = MATRIX_COLORS[color];

    const path = createMatrixPath(
      pattern.points,
      pattern.closed,
    );

    const stepDuration = Math.max(1, speed);
    const tailLength = Math.max(1, trailLength);
    const width = Math.max(0, Math.floor(trailWidth));

    const resolution = 195;
    const spacing = 12.5;
    const padding = 10;
    const dotRadius = 3.6;

    const totalDots = GRID_SIZE ** 2;

    const intensity = new Float32Array(totalDots);
    const whiteness = new Float32Array(totalDots);

    canvas.width = resolution;
    canvas.height = resolution;

    let animationId: number;
    const startTime = performance.now();

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    function draw(now: number) {
      if (!ctx) return;

      ctx.clearRect(0, 0, resolution, resolution);

      intensity.fill(0);
      whiteness.fill(0);

      const head = reducedMotion
        ? 12 % path.length
        : ((now - startTime) / stepDuration) %
          path.length;

      for (let i = 0; i < path.length; i++) {
        const distance =
          (head - i + path.length) % path.length;

        const brightLength = tailLength * (9 / 21);

        const brightness =
          distance < brightLength
            ? 1
            : distance < tailLength
              ? Math.pow(
                  1 -
                    (distance - brightLength) /
                      (tailLength - brightLength),
                  1.1,
                )
              : 0;

        const white =
          distance < 2.5
            ? 1
            : distance < 5
              ? (5 - distance) / 2.5
              : 0;

        const [px, py] = path[i];

        for (let dy = -width; dy <= width; dy++) {
          for (let dx = -width; dx <= width; dx++) {
            if (
              Math.abs(dx) + Math.abs(dy) >
              width
            ) {
              continue;
            }

            const x = px + dx;
            const y = py + dy;

            if (
              x < 0 ||
              x >= GRID_SIZE ||
              y < 0 ||
              y >= GRID_SIZE
            ) {
              continue;
            }

            const index = y * GRID_SIZE + x;

            const isCenter = dx === 0 && dy === 0;

            const dotIntensity =
              brightness * (isCenter ? 1 : 0.65);

            const dotWhite =
              white * (isCenter ? 1 : 0.35);

            intensity[index] = Math.max(
              intensity[index],
              dotIntensity,
            );

            whiteness[index] = Math.max(
              whiteness[index],
              dotWhite,
            );
          }
        }
      }

      for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
          const index = y * GRID_SIZE + x;

          ctx.beginPath();

          ctx.arc(
            padding + x * spacing,
            padding + y * spacing,
            dotRadius,
            0,
            Math.PI * 2,
          );

          ctx.fillStyle = getDotColor(
            rgb,
            intensity[index],
            whiteness[index],
          );

          ctx.fill();
        }
      }

      if (!reducedMotion) {
        animationId = requestAnimationFrame(draw);
      }
    }

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [shape, color, speed, trailLength, trailWidth]);

  return canvasRef;
}