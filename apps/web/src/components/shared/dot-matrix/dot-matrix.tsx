"use client";

import { cn } from "@/lib/utils";

import { useDotMatrix } from "./use-dot-matrix";

import type { DotMatrixProps } from "./dot-matrix.types";

export function DotMatrix({
  shape = "heartbeat",
  color = "green",
  size = 35,
  speed = 35,
  trailLength = 21,
  trailWidth = 1,
  className,
}: DotMatrixProps) {
  const canvasRef = useDotMatrix({
    shape,
    color,
    speed,
    trailLength,
    trailWidth,
  });

  return (
    <div
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-md border border-border bg-card p-[5px]",
        className,
      )}
    >
      <canvas
        ref={canvasRef}
        className="block"
        style={{
          width: size,
          height: size,
        }}
      />
    </div>
  );
}