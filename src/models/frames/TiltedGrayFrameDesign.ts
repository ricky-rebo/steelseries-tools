import { createLinearGradient } from "canvas-drawing-tools";
import { DrawOptions } from "./FrameDesignModel";
import GradientFrameDesignModel from "./GradientFrameDesignModel";

export default class TiltedGrayFrameDesign extends GradientFrameDesignModel {
  constructor() {
    super("tiltedgray");
  }

  protected drawGradient(ctx: CanvasRenderingContext2D, { width, height }: Required<DrawOptions>): void {
    ctx.fillStyle = createLinearGradient(ctx, 0.233644 * width, 0.084112 * height, 0.81258 * width, 0.910919 * height, [
      { color: "#ffffff", offset: 0 },
      { color: "#d2d2d2", offset: 0.07 },
      { color: "#b3b3b3", offset: 0.16 },
      { color: "#ffffff", offset: 0.33 },
      { color: "#c5c5c5", offset: 0.55 },
      { color: "#ffffff", offset: 0.79 },
      { color: "#666666", offset: 1 },
    ]);

    ctx.fill();
  }
}
