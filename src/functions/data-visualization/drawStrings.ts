import { STD_FONT_NAME } from "../../shared";
import { RgbaColor } from "../../model/RgbaColor";

interface Options {
  width?: number;
  height?: number;
  title: string;
  unit: string;
  labelColor: RgbaColor;
}

// TODO docs
export function drawStrings(ctx: CanvasCtx, options: Options) {
  const width = options.width ?? ctx.canvas.width;
  const height = options.height ?? ctx.canvas.height;

  ctx.save();

  ctx.font = `${0.046728 * width}px ${STD_FONT_NAME}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.strokeStyle = options.labelColor.getRgbaColor();
  ctx.fillStyle = options.labelColor.getRgbaColor();

  ctx.fillText(options.title, width / 2, height * 0.3, width * 0.3);
  ctx.fillText(options.unit, width / 2, height * 0.38, width * 0.3);

  ctx.restore();
}
