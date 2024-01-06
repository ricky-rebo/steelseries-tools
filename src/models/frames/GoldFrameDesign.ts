import { createLinearGradient } from "canvas-drawing-tools";
import { DrawOptions } from "./FrameDesignModel";
import GradientFrameDesignModel from "./GradientFrameDesignModel";

export default class GoldFrameDesign extends GradientFrameDesignModel {
  constructor() {
    super("gold");
  }

  protected drawGradient(ctx: CanvasRenderingContext2D, { width, height }: Required<DrawOptions>): void {
    ctx.fillStyle = createLinearGradient(ctx, 0, width * 0.004672, 0, height * 0.990654, [
      { color: "#ffffcf", offset: 0 },
      { color: "#ffed60", offset: 0.15 },
      { color: "#fec739", offset: 0.22 },
      { color: "#fff9cb", offset: 0.3 },
      { color: "#ffc740", offset: 0.38 },
      { color: "#fcc23c", offset: 0.44 },
      { color: "#ffcc3b", offset: 0.51 },
      { color: "#d5861d", offset: 0.6 },
      { color: "#ffc938", offset: 0.68 },
      { color: "#d4871d", offset: 0.75 },
      { color: "#f7ee65", offset: 1 },
    ]);

    ctx.fill();
  }
}
