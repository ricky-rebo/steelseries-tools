import { createLinearGradient } from "canvas-drawing-tools";
import { DrawOptions } from "./FrameDesignModel";
import GradientFrameDesignModel from "./GradientFrameDesignModel";

export default class TiltedBlackFrameDesign extends GradientFrameDesignModel {
  constructor() {
    super("tiltedBlack");
  }

  protected drawGradient(ctx: CanvasRenderingContext2D, { width, height }: Required<DrawOptions>): void {
    ctx.fillStyle = createLinearGradient(
      ctx,
      0.228971 * width,
      0.079439 * height,
      0.802547 * width,
      0.898591 * height,
      [
        { color: "#666666", offset: 0 },
        { color: "#000000", offset: 0.21 },
        { color: "#666666", offset: 0.47 },
        { color: "#000000", offset: 0.99 },
        { color: "#000000", offset: 1 },
      ]
    );

    ctx.fill();
  }
}
