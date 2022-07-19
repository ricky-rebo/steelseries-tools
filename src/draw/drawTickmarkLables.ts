import { BackgroundColorDef } from "../customization/color-defs"
import { GaugeTypeDef, LabelNumberFormatDef, TickLabelOrientationDef } from "../customization/type-descriptors"
import { calcNiceNumber } from "../utils/common"
import { HALF_PI, PI, STD_FONT_NAME } from "../utils/constants"
import { MAX_MAJOR_TICKS_COUNT, MAX_MINOR_TICKS_COUNT } from "./drawTickmarks"

interface LabelParams {
  format: LabelNumberFormatDef
  orientation: TickLabelOrientationDef
  scaleDecimals: number
  altPos?: boolean
}

// TODO docs
export function drawTickmarkLables (
  ctx: CanvasCtx, 
  canvasSize: number, 
  gaugeType: GaugeTypeDef, 
  { labelColor }: BackgroundColorDef,
  minValue: number,
  maxValue: number,
  niceValues: boolean,
  { format, orientation, scaleDecimals, altPos = false }: LabelParams,
) {
  const center = canvasSize / 2

  const range = niceValues ? calcNiceNumber(maxValue - minValue, false) : maxValue - minValue
  const majorTickSpacing = calcNiceNumber(range / (MAX_MAJOR_TICKS_COUNT - 1), true)
  const minorTickSpacing = calcNiceNumber(majorTickSpacing / (MAX_MINOR_TICKS_COUNT - 1), true)

  const textTranslateX = altPos ? canvasSize * 0.28 : canvasSize * 0.3
  const textMaxWidth = (['type1', 'type2'].includes(gaugeType.type))
    ? (altPos ? canvasSize * 0.0375 : canvasSize * 0.04)
    : canvasSize * 0.1

  const maxValueRounded = parseFloat(maxValue.toFixed(2))

  const angleStep = gaugeType.angleRange / range
  const rotationStep = angleStep * minorTickSpacing

  let alpha = gaugeType.rotationOffset // Tracks total rotation
  let labelCounter = minValue
  let majorTickCounter = MAX_MINOR_TICKS_COUNT - 1

  labelColor.setAlpha(1)

  ctx.save()

  // Init context
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.font = `${Math.ceil(canvasSize * 0.04)}px ${STD_FONT_NAME}`
  ctx.strokeStyle = labelColor.getRgbaColor()
  ctx.fillStyle = labelColor.getRgbaColor()

  ctx.translate(center, center)
  ctx.rotate(gaugeType.rotationOffset)

  for (let i = minValue; parseFloat(i.toFixed(2)) <= maxValueRounded; i += minorTickSpacing) {
    majorTickCounter++

    // Draw major tickmarks
    if (majorTickCounter === MAX_MINOR_TICKS_COUNT) {
      ctx.save()

      ctx.translate(textTranslateX, 0)
      ctx.rotate(getLabelRotationAngle(orientation, alpha))
      ctx.fillText(getLabelString(format, labelCounter, scaleDecimals), 0, 0, textMaxWidth)

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