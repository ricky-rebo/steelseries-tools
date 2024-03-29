import { BackgroundColorDef } from "../../model/BackgroundColorDef"
import { TickLabelOrientationDef } from "../../model/TickLabelOrientationDef"
import { LabelNumberFormatDef } from "../../model/LabelNumberFormatDef"
import { GaugeTypeDef } from "../../model/GaugeTypeDef"
import { calcNiceNumber } from "../../helpers/common"
import { HALF_PI, PI, STD_FONT_NAME } from "../../shared"
import { MAX_MAJOR_TICKS_COUNT, MAX_MINOR_TICKS_COUNT } from "./drawTickmarks"
import { GaugeType } from "../../enums/types/GaugeType"

interface Options {
  size?: number
  gaugeType: GaugeTypeDef
  backgroundColor: BackgroundColorDef
  minValue: number
  maxValue: number
  niceValues?: boolean
  labelOptions: {
    format: LabelNumberFormatDef
    orientation: TickLabelOrientationDef
    scaleDecimals: number
    altPos?: boolean
  }
}

// TODO docs
export function drawTickmarkLables (ctx: CanvasCtx, options: Options) {
  const canvasSize = options.size ?? Math.min(ctx.canvas.width, ctx.canvas.height)
  
  const center = canvasSize / 2

  const range = options.niceValues
    ? calcNiceNumber(options.maxValue - options.minValue, false)
    : options. maxValue - options.minValue
  const majorTickSpacing = calcNiceNumber(range / (MAX_MAJOR_TICKS_COUNT - 1), true)
  const minorTickSpacing = calcNiceNumber(majorTickSpacing / (MAX_MINOR_TICKS_COUNT - 1), true)

  const textTranslateX = options.labelOptions.altPos ? canvasSize * 0.28 : canvasSize * 0.3
  const textMaxWidth = ([GaugeType.TYPE1.type, GaugeType.TYPE2.type].includes(options.gaugeType.type))
    ? (options.labelOptions.altPos
        ? canvasSize * 0.0375
        : canvasSize * 0.04)
    : canvasSize * 0.1

  const maxValueRounded = parseFloat(options.maxValue.toFixed(2))

  const angleStep = options.gaugeType.angleRange / range
  const rotationStep = angleStep * minorTickSpacing

  let alpha = options.gaugeType.rotationOffset // Tracks total rotation
  let labelCounter = options.minValue
  let majorTickCounter = MAX_MINOR_TICKS_COUNT - 1

  const labelColor = options.backgroundColor.labelColor;
  labelColor.setAlpha(1)

  ctx.save()

  // Init context
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.font = `${Math.ceil(canvasSize * 0.04)}px ${STD_FONT_NAME}`
  ctx.strokeStyle = labelColor.getRgbaColor()
  ctx.fillStyle = labelColor.getRgbaColor()

  ctx.translate(center, center)
  ctx.rotate(options.gaugeType.rotationOffset)

  // TODO Optimize -> increment rotation step to match labels count
  for (let i = options.minValue; parseFloat(i.toFixed(2)) <= maxValueRounded; i += minorTickSpacing) {
    majorTickCounter++

    if (majorTickCounter === MAX_MINOR_TICKS_COUNT) {
      ctx.save()

      ctx.translate(textTranslateX, 0)
      ctx.rotate(getLabelRotationAngle(options.labelOptions.orientation, alpha))
      ctx.fillText(getLabelString(options.labelOptions.format, labelCounter, options.labelOptions.scaleDecimals), 0, 0, textMaxWidth)

      ctx.restore()

      labelCounter += majorTickSpacing
      majorTickCounter = 0
      ctx.rotate(rotationStep)
      alpha += rotationStep

      continue
    }

    ctx.rotate(rotationStep)
    alpha += rotationStep
  }

  ctx.restore()
}

function getLabelString (numberFormat: LabelNumberFormatDef, label: number, fractionalScaleDecimals: number) {
  switch (numberFormat.format) {
    case 'fractional': return label.toFixed(fractionalScaleDecimals)
    case 'scientific': return label.toPrecision(2)
    case 'standard':
    default: return label.toFixed(0)
  }
}

function getLabelRotationAngle (labelOrientation: TickLabelOrientationDef, angle: number) {
  switch (labelOrientation.type) {
    case 'horizontal': return -angle
    case 'tangent': return angle <= HALF_PI + PI ? PI : 0
    case 'normal':
    default: return HALF_PI
  }
}