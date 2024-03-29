import { calcNiceNumber } from '../../helpers/common'
import { STD_FONT_NAME } from '../../shared' 
import { GaugeTypeDef } from "../../model/GaugeTypeDef"
import { BackgroundColorDef } from "../../model/BackgroundColorDef"

const MAX_MINOR_TICKS_COUNT = 10
const MAX_MAJOR_TICKS_COUNT = 10

const MAJOR_TICK_LINE_WIDTH = 1.5
const MEDIUM_TICK_LINE_WIDTH = 1
const MINOR_TICK_LINE_WIDTH = 0.5

interface Options {
  size?: number,
  gaugeType: GaugeTypeDef,
  backgroundColor: BackgroundColorDef
  minValue: number
  maxValue: number
  niceValues?: boolean
}

// TODO docs
function drawTickmarks (ctx: CanvasCtx, options: Options) {
  const canvasSize = options.size ?? Math.min(ctx.canvas.width, ctx.canvas.height)
  const center = canvasSize / 2

  const range = options.niceValues
    ? calcNiceNumber(options.maxValue - options.minValue, false) 
    : options.maxValue - options.minValue
  const majorTickSpacing = calcNiceNumber(range / (MAX_MAJOR_TICKS_COUNT - 1), true)
  const minorTickSpacing = calcNiceNumber(majorTickSpacing / (MAX_MINOR_TICKS_COUNT - 1), true)

  const tickOuterPoint = canvasSize * 0.38
  const majorTickInnerPoint = canvasSize * 0.35
  const mediumTickInnerPoint = canvasSize * 0.355
  const minorTickInnerPoint = canvasSize * 0.36

  const maxValueRounded = parseFloat(options.maxValue.toFixed(2))

  const { angleRange, rotationOffset } = options.gaugeType
  const angleStep = angleRange / range
  const rotationStep = angleStep * minorTickSpacing

  const { labelColor } = options.backgroundColor
  labelColor.setAlpha(1)

  ctx.save()

  // Init context
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.font = `${Math.ceil(canvasSize * 0.04)}px ${STD_FONT_NAME}`
  ctx.strokeStyle = labelColor.getRgbaColor()
  ctx.fillStyle = labelColor.getRgbaColor()
  ctx.translate(center, center)
  ctx.rotate(rotationOffset)

  let majorTickCounter = MAX_MINOR_TICKS_COUNT - 1
  for (let i = options.minValue; parseFloat(i.toFixed(2)) <= maxValueRounded; i += minorTickSpacing) {
      majorTickCounter++

    // Draw major tickmarks
    if (majorTickCounter === MAX_MINOR_TICKS_COUNT) {
      drawTickmark(ctx, MAJOR_TICK_LINE_WIDTH, tickOuterPoint, majorTickInnerPoint)

      majorTickCounter = 0
    } else {
      // Draw tickmark every minor tickmark spacing
      if (MAX_MINOR_TICKS_COUNT % 2 === 0 && majorTickCounter === (MAX_MINOR_TICKS_COUNT / 2)) {
        drawTickmark(ctx, MEDIUM_TICK_LINE_WIDTH, tickOuterPoint, mediumTickInnerPoint)
      } else {
        drawTickmark(ctx, MINOR_TICK_LINE_WIDTH, tickOuterPoint, minorTickInnerPoint)
      }
    }

    ctx.rotate(rotationStep)
  }

  ctx.restore()
}

/** Draws a tickmark */
function drawTickmark (ctx: CanvasCtx, lineWidth: number, outerPoint: number, innerPoint: number) {
  ctx.save()

  ctx.lineWidth = lineWidth
  ctx.beginPath()
  ctx.moveTo(outerPoint, 0)
  ctx.lineTo(innerPoint, 0)
  ctx.closePath()
  ctx.stroke()

  ctx.restore()
}

export {
  drawTickmarks,
  MAX_MAJOR_TICKS_COUNT,
  MAX_MINOR_TICKS_COUNT
}
