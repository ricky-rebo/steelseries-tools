import { ColorDef } from "../../model/ColorDef";
import { GaugeTypeDef } from "../../model/GaugeTypeDef";
import { PointerTypeDef } from "../../model/PointerTypeDef";
import { RgbaColor } from "../../model/RgbaColor";
import { createMeasuredValuePointerImage } from "./createMeasuredValuePointerImage";
import { createThresholdPointerImage } from "./createThresholdPointerImage";
import { drawLinearIndicator } from "./drawLinearIndicator";
import { drawPointerImage } from "./drawPointerImage";

export function OLD__createMeasuredValueImage (size: number, indicatorColor: string, radial: boolean, vertical: boolean) {
  console.warn("[DEPRECATED] OLD__createMeasuredValueImage() is deprecated! use createMeasuredValuePointerImage(size, indicatorColor, linear?, vertical?) instead!");
  createMeasuredValuePointerImage(size, indicatorColor, !radial, vertical);
}

export function OLD__createThresholdImage (width: number, height: number, radial: boolean, vertical: boolean) {
  console.warn("[DEPRECATE] OLD__createThresholdImage() is deprecated! Use createThresholdPointerImage(width, height, linear?, vertical?");
  createThresholdPointerImage(width, height, !radial, vertical);
}

export function OLD__drawLinearIndicator (
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
  drawLinearIndicator(ctx, indicator, { value, minValue, maxValue, gaugeType, vertical, altPos });
}

export function OLD__drawPointerImage (ctx: CanvasCtx, size: number, ptrType: PointerTypeDef, ptrColor: ColorDef, lblColor: RgbaColor) {
  console.warn("[DEPRECATED] OLD__drawPointerImage() is deprecated! Use drawPointerImage(ctx, options) instead!");
  drawPointerImage(ctx, { size, pointerType: ptrType, pointerColor: ptrColor, labelColor: lblColor });
}