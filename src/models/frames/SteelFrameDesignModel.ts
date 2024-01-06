import { createLinearGradient } from "canvas-drawing-tools";
import { DrawOptions } from "./FrameDesignModel";
import GradientFrameDesignModel from "./GradientFrameDesignModel";

export default class SteelFrameDesignModel extends GradientFrameDesignModel {
  constructor() {
    super("steel");
  }

  protected drawGradient(ctx: CanvasRenderingContext2D, { width, height }: Required<DrawOptions>): void {
    ctx.fillStyle = createLinearGradient(ctx, 0, width * 0.004672, 0, height * 0.990654, [
      { color: "#e7eded", offset: 0 },
      { color: "#bdc7c6", offset: 0.05 },
      { color: "#c0c9c8", offset: 0.1 },
      { color: "#171f21", offset: 0.5 },
      { color: "#c4cdcc", offset: 0.9 },
      { color: "#c2cccb", offset: 0.95 },
      { color: "#bdc9c7", offset: 1 },
    ]);
    
    ctx.fill();
  }
}