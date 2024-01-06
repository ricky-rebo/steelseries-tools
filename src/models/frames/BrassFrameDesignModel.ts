import { createLinearGradient } from "canvas-drawing-tools";
import { DrawOptions } from "./FrameDesignModel";
import GradientFrameDesignModel from "./GradientFrameDesignModel";

export default class BrassFrameDesignModel extends GradientFrameDesignModel {
  constructor() {
    super('brass');
  }

  protected drawGradient(ctx: CanvasRenderingContext2D, { width, height }: Required<DrawOptions>): void {
    ctx.fillStyle = createLinearGradient(ctx, 0, width * 0.004672, 0, height * 0.990654, [
      { color: "#f9f39b", offset: 0 },
      { color: "#f6e265", offset: 0.05 },
      { color: "#f0e184", offset: 0.1 },
      { color: "#5a3916", offset: 0.5 },
      { color: "#f9ed8b", offset: 0.9 },
      { color: "#f3e26c", offset: 0.95 },
      { color: "#cab671", offset: 1 },
    ]);

    ctx.fill();
  }
}