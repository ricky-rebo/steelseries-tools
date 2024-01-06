import { createLinearGradient, createRadialGradient } from "canvas-drawing-tools";
import { DrawOptions } from "./FrameDesignModel";
import GradientFrameDesignModel from "./GradientFrameDesignModel";
import { TWO_PI } from "../../shared";

export default class GlossyMetalFrameDesign extends GradientFrameDesignModel {
  constructor() {
    super("glossyMetal");
  }

  protected drawGradient(ctx: CanvasRenderingContext2D, { width, height }: Required<DrawOptions>): void {
    ctx.fillStyle = createRadialGradient(ctx, 0.5 * width, 0.5 * height, 0, 0.5 * width, [
      { color: "#cfcfcf", offset: 0 },
      { color: "#cdcccd", offset: 0.96 },
      { color: "#f4f4f4", offset: 1 },
    ]);
    ctx.fill();

    // Central horizontal gloss
    ctx.fillStyle = createLinearGradient(ctx, 0, height - 0.971962 * height, 0, 0.971962 * height, [
      { color: "#f9f9f9", offset: 0 },
      { color: "#c8c3bf", offset: 0.23 },
      { color: "#ffffff", offset: 0.36 },
      { color: "#1d1d1d", offset: 0.59 },
      { color: "#c8c2c0", offset: 0.76 },
      { color: "#d1d1d1", offset: 1 },
    ]);
    ctx.beginPath();
    ctx.arc(0.5 * width, 0.5 * height, (0.973962 * width) / 2, 0, TWO_PI);
    ctx.closePath();
    ctx.fill();

    // Inner circles
    ctx.fillStyle = "#f6f6f6";
    ctx.beginPath();
    ctx.arc(0.5 * width, 0.5 * height, (0.869158 * width) / 2, 0, TWO_PI);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#333333";
    ctx.beginPath();
    ctx.arc(0.5 * width, 0.5 * height, (0.85 * width) / 2, 0, TWO_PI);
    ctx.closePath();
    ctx.fill();
  }
}
