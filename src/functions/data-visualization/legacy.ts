import { GaugeType } from "../../enums/types/GaugeType"
import { BackgroundColorDef } from "../../model/BackgroundColorDef"
import { GaugeTypeDef } from "../../model/GaugeTypeDef"
import { LabelNumberFormatDef } from "../../model/LabelNumberFormatDef"
import { TickLabelOrientationDef } from "../../model/TickLabelOrientationDef"
import { drawLinearStrings } from "./drawLinearStrings"
import { drawLinearTickmarks } from "./drawLinearTickmarks"
import { drawStrings } from "./drawStrings"
import { drawTickmarkLables } from "./drawTickmarkLables"
import { drawTickmarks } from "./drawTickmarks"

export function drawTitleImage (
  ctx: CanvasCtx,
  width: number,
  height: number,
  title: string,
  unit: string,
  backgroundColor: BackgroundColorDef,
  vertical: boolean,
  radial: boolean,
  altPos: boolean,
  gaugeType: GaugeTypeDef = GaugeType.TYPE1
) {
  if (radial) {
    console.warn("[DEPRECATED] OLD__drawTitleImage() function is deprecated! Use drawStrings() instead, for radial gauges")

    drawStrings(ctx, { width, height, title, unit, labelColor: backgroundColor.labelColor })
  } else {
    console.warn("[DEPRECATED] OLD__drawTitleImage() function is deprecated! Use drawLinearStrings() instead, for linear gauges")

    drawLinearStrings(ctx, { width, height, title, unit, labelColor: backgroundColor.labelColor, vertical, lcdVisible: altPos, gaugeType })
  }
}

export function drawLinearTickmarksImage (
  ctx: CanvasCtx,
  width: number,
  height: number, 
  gaugeType: GaugeTypeDef,
  color: BackgroundColorDef,
  labelFormat: LabelNumberFormatDef,
  minValue: number,
  maxValue: number,
  niceScale: boolean,
  vertical: boolean
) {
  console.warn("[DEPRECATED] OLD__drawLinearTickmarksImage() is deprecated! Use drawLinearTickmarksImage(ctx, options) instead")
  drawLinearTickmarks(ctx, { width, height, gaugeType, backgroundColor: color, labelFormat, minValue, maxValue, niceScale, vertical })
}

export function drawRadialTickmarksImage (
  ctx: CanvasCtx,
  size: number,
  gaugeType: GaugeTypeDef,
  minValue: number,
  maxValue: number,
  niceValues: boolean,
  backgroundColor: BackgroundColorDef,
  labelOrientation: TickLabelOrientationDef,
  numberFormat: LabelNumberFormatDef,
  fractionalScaleDecimals: number,
  labelAltPos: boolean,
  labelsOnly: boolean
) {
  console.warn("[DEPRECATED] OLD__drawRadialTickmarksImage is deprecated! Use drawTickmarkLabels(ctx, options) instead for tickmark labels!");
  drawTickmarkLables(ctx, {
    size,
    gaugeType,
    backgroundColor,
    minValue,
    maxValue,
    niceValues,
    labelOptions: {
      format: numberFormat,
      orientation: labelOrientation,
      scaleDecimals: fractionalScaleDecimals,
      altPos: labelAltPos
    }
  })

  if (!labelsOnly) {
    console.warn("[DEPRECATED] OLD__drawRadialTickmarksImage is deprecated! Use drawTickmarks(ctx, options) instead for tickmarks!");
    drawTickmarks(ctx, { size, gaugeType, backgroundColor, minValue, maxValue, niceValues })
  }
}
