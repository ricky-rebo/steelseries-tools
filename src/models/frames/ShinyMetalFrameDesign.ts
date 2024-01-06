import { ConicalGradient } from "../../model/ConicalGradient";
import { RgbaColor } from "../../model/RgbaColor";
import { TWO_PI } from "../../shared";
import { DrawOptions } from "./FrameDesignModel";
import GradientFrameDesignModel from "./GradientFrameDesignModel";

export default class ShinyMetalFrameDesign extends GradientFrameDesignModel {
  constructor() {
    super("shinyMetal");
  }

  protected drawGradient(ctx: CanvasRenderingContext2D, { width, centerX, centerY }: Required<DrawOptions>): void {
    const fractions = [0, 0.125, 0.25, 0.347222, 0.5, 0.652777, 0.75, 0.875, 1];

    const colors = [
      new RgbaColor(254, 254, 254),
      new RgbaColor(210, 210, 210),
      new RgbaColor(179, 179, 179),
      new RgbaColor(238, 238, 238),
      new RgbaColor(160, 160, 160),
      new RgbaColor(238, 238, 238),
      new RgbaColor(179, 179, 179),
      new RgbaColor(210, 210, 210),
      new RgbaColor(254, 254, 254),
    ];

    ctx.save();
    ctx.arc(centerX, centerY, (width * 0.990654) / 2, 0, TWO_PI, true);
    ctx.clip();

    const grad = new ConicalGradient(fractions, colors);
    grad.fillCircle(ctx, centerX, centerY, width * 0.42056, width * 0.495327);

    // fade outer edge
    ctx.strokeStyle = "rgba(132, 132, 132, 0.8)";
    ctx.lineWidth = width / 90;

    ctx.beginPath();
    ctx.arc(centerX, centerY, width / 2, 0, TWO_PI, true);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }
}
