import { ConicalGradient } from "../../model/ConicalGradient";
import { RgbaColor } from "../../model/RgbaColor";
import { TWO_PI } from "../../shared";
import { DrawOptions } from "./FrameDesignModel";
import GradientFrameDesignModel from "./GradientFrameDesignModel";

export default class ChromeFrameDesign extends GradientFrameDesignModel {
  constructor() {
    super("chrome");
  }

  protected drawGradient(ctx: CanvasRenderingContext2D, { width, centerX, centerY }: Required<DrawOptions>): void {
    const fractions = [0, 0.09, 0.12, 0.16, 0.25, 0.29, 0.33, 0.38, 0.48, 0.52, 0.63, 0.68, 0.8, 0.83, 0.87, 0.97, 1];

    const colors = [
      new RgbaColor(255, 255, 255),
      new RgbaColor(255, 255, 255),
      new RgbaColor(136, 136, 138),
      new RgbaColor(164, 185, 190),
      new RgbaColor(158, 179, 182),
      new RgbaColor(112, 112, 112),
      new RgbaColor(221, 227, 227),
      new RgbaColor(155, 176, 179),
      new RgbaColor(156, 176, 177),
      new RgbaColor(254, 255, 255),
      new RgbaColor(255, 255, 255),
      new RgbaColor(156, 180, 180),
      new RgbaColor(198, 209, 211),
      new RgbaColor(246, 248, 247),
      new RgbaColor(204, 216, 216),
      new RgbaColor(164, 188, 190),
      new RgbaColor(255, 255, 255),
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
