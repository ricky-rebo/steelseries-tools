import { createLinearGradient } from "canvas-drawing-tools";

import GradientFrameDesignModel from "./GradientFrameDesignModel";
import { DrawOptions } from "./FrameDesignModel";

export default class MetalFrameDesign extends GradientFrameDesignModel {
  constructor() {
    super("metal");
  }

  protected drawGradient(ctx: CanvasRenderingContext2D, { width, height }: Required<DrawOptions>): void {
    ctx.fillStyle = createLinearGradient(ctx, 0, width * 0.004672, 0, height * 0.990654, [
      { color: "#fefefe", offset: 0 },
      { color: "#d2d2d2", offset: 0.07 },
      { color: "#b3b3b3", offset: 0.12 },
      { color: "#d5d5d5", offset: 1 },
    ]);

    ctx.fill();
  }
}
