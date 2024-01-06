import { GaugeTypeDef } from "../../model/GaugeTypeDef";
import { STD_FONT_NAME } from "../../shared";
import { RgbaColor } from "../../model/RgbaColor";

// TODO docs
interface Options {
  width?: number;
  height?: number;
  title: string;
  unit: string;
  labelColor: RgbaColor;
  vertical: boolean;
  lcdVisible: boolean;
  gaugeType: GaugeTypeDef;
}

// TODO docs
export function drawLinearStrings(ctx: CanvasCtx, options: Options) {
  const width = options.width ?? ctx.canvas.width;
  const height = options.height ?? ctx.canvas.height;

  const gaugeType2 = options.gaugeType.type === "type2";

  ctx.save();

  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.strokeStyle = options.labelColor.getRgbaColor();
  ctx.fillStyle = options.labelColor.getRgbaColor();

  if (options.vertical) {
    // Title
    ctx.font = `${0.1 * width}px ${STD_FONT_NAME}`;

    ctx.save();
    ctx.translate(0.671428 * width, 0.1375 * height);
    ctx.rotate(1.570796);
    ctx.fillText(options.title, 0, 0);
    ctx.restore();

    // Unit
    ctx.font = 0.071428 * width + "px " + STD_FONT_NAME;

    if (options.lcdVisible) {
      if (gaugeType2) {
        ctx.textAlign = "right";
        ctx.fillText(options.unit, 0.36 * width, height * 0.79, width * 0.25);
      } else {
        ctx.fillText(options.unit, 0.63 * width, height * 0.85, width * 0.2);
      }
    } else {
      ctx.textAlign = "center";
      ctx.fillText(options.unit, width / 2, height * (gaugeType2 ? 0.92 : 0.89), width * 0.2);
    }
  } else {
    // Title
    ctx.font = `${0.035 * width}px ${STD_FONT_NAME}`;
    ctx.fillText(options.title, width * 0.15, height * 0.25, width * 0.3);

    // Unit
    ctx.font = `${0.025 * width}px ${STD_FONT_NAME}`;
    ctx.fillText(options.unit, width * 0.0625, height * 0.7, width * 0.07);
  }

  ctx.restore();
}
