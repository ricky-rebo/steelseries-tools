import { createLinearGradient } from "canvas-drawing-tools";
import { DrawOptions } from "./FrameDesignModel";
import GradientFrameDesignModel from "./GradientFrameDesignModel";

export default class AnthraciteFrameDesign extends GradientFrameDesignModel {
  constructor() {
    super("anthracite");
  }

  protected drawGradient(ctx: CanvasRenderingContext2D, { height }: Required<DrawOptions>): void {
    ctx.fillStyle = createLinearGradient(ctx, 0, 0.004672 * height, 0, 0.995326 * height, [
      { color: "#767587", offset: 0 },
      { color: "#4a4a52", offset: 0.06 },
      { color: "#323236", offset: 0.12 },
      { color: "#4f4f57", offset: 1 },
    ]);

    ctx.fill();
  }
}
