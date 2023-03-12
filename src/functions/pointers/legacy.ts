import { ColorDef } from "../../model/ColorDef";
import { GaugeTypeDef } from "../../model/GaugeTypeDef";
import { PointerTypeDef } from "../../model/PointerTypeDef";
import { RgbaColor } from "../../model/RgbaColor";
import { HALF_PI, PI } from "../../shared";
import { createIndicatorImage } from "./createIndicatorImage";
import { drawLinearIndicator as NEW__drawLinearIndicator } from "./drawLinearIndicator";
import { drawPointerImage as NEW__drawPointerImage } from "./drawPointerImage";

export function createMeasuredValueImage (size: number, indicatorColor: string, radial: boolean, vertical: boolean) {
  console.warn("[DEPRECATED] OLD__createMeasuredValueImage() is deprecated! use createMeasuredValuePointerImage(size, indicatorColor, linear?, vertical?) instead!");

  return createIndicatorImage(size, size, {
    background: "mono",
    color: indicatorColor,
    angle: (radial) ? PI : (vertical ? HALF_PI : 0),
  });
}

export function createThresholdImage (width: number, height: number, radial: boolean, vertical: boolean) {
  console.warn("[DEPRECATE] OLD__createThresholdImage() is deprecated! Use createThresholdPointerImage(width, height, linear?, vertical?");

  return createIndicatorImage(width, height, {
    background: "gradient",
    colorStops: [
      { color: '#520000', offset: 0 },
      { color: '#fc1d00', offset: 0.3 },
      { color: '#fc1d00', offset: 0.59 },
      { color: '#520000', offset: 1 }
    ],
    border: "#FFFFFF",
    angle: (radial) ? 0 : (vertical ? -HALF_PI : PI),
  })
}

export function drawLinearIndicator (
  ctx: CanvasCtx,
  indicator: HTMLCanvasElement,
  value: number,
  minValue: number,
  maxValue: number,
  gaugeType: GaugeTypeDef,
  vertical: boolean,
  altPos: boolean
) {
  console.warn("[DEPRECATED] OLD__drawLinearIndicator() is deprecated! Use drawLinearIndicator(ctx, indicator, options) instead!");
  NEW__drawLinearIndicator(ctx, indicator, { value, minValue, maxValue, gaugeType, vertical, altPos });
}

export function drawPointerImage (ctx: CanvasCtx, size: number, ptrType: PointerTypeDef, ptrColor: ColorDef, lblColor: RgbaColor) {
  console.warn("[DEPRECATED] OLD__drawPointerImage() is deprecated! Use drawPointerImage(ctx, options) instead!");
  NEW__drawPointerImage(ctx, { size, pointerType: ptrType, pointerColor: ptrColor, labelColor: lblColor });
}