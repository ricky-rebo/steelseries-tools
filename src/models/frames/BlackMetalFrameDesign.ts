import { ConicalGradient } from "../../model/ConicalGradient";
import { RgbaColor } from "../../model/RgbaColor";
import { TWO_PI } from "../../shared";
import { DrawOptions } from "./FrameDesignModel";
import GradientFrameDesignModel from "./GradientFrameDesignModel";

export default class BlackMetalFrameDesign extends GradientFrameDesignModel {
  constructor() {
    super("blackMetal");
  }

  protected drawGradient(ctx: CanvasRenderingContext2D, { width, centerX, centerY }: Required<DrawOptions>): void {
    const fractions = [0, 0.125, 0.347222, 0.5, 0.680555, 0.875, 1];

    const colors = [
      new RgbaColor(254, 254, 254),
      new RgbaColor(0, 0, 0),
      new RgbaColor(153, 153, 153),
      new RgbaColor(0, 0, 0),
      new RgbaColor(153, 153, 153),
      new RgbaColor(0, 0, 0),
      new RgbaColor(254, 254, 254),
    ];

    ctx.save();
    ctx.arc(centerX, centerY, (width * 0.990654) / 2, 0, TWO_PI, true);
    ctx.clip();

    const grad = new ConicalGradient(fractions, colors);
    grad.fillCircle(ctx, centerX, centerY, width * 0.42056, width * 0.495327);

    // fade outer edge
    ctx.strokeStyle = "#848484";
    ctx.strokeStyle = "rgba(132, 132, 132, 0.8)";
    ctx.lineWidth = width / 90;

    ctx.beginPath();
    ctx.arc(centerX, centerY, width / 2, 0, TWO_PI, true);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }
}
