import { GaugeTypeDef } from '../../customization/type-descriptors'
import { STD_FONT_NAME } from '../../utils/constants'
import { RgbaColor } from '../../colors/RgbaColor'

type CanvasCtx = CanvasRenderingContext2D

export function drawLinearStrings (ctx: CanvasCtx, title: string, unit: string, labelColor: RgbaColor, vertical: boolean, lcdVisible: boolean, gaugeType: GaugeTypeDef) {
  const width = ctx.canvas.width
  const height = ctx.canvas.height

  ctx.save()

  ctx.textAlign = 'left'
  ctx.textBaseline = 'middle'
  ctx.strokeStyle = labelColor.getRgbaColor()
  ctx.fillStyle = labelColor.getRgbaColor()

  if (vertical) {
    // Title
    ctx.font = `${0.1 * width}px ${STD_FONT_NAME}`
    ctx.save()
    ctx.translate(0.671428 * width, 0.1375 * height)
    ctx.rotate(1.570796)
    ctx.fillText(title, 0, 0)
    // ctx.translate(-0.671428 * width, -0.1375 * height)
    ctx.restore()

    // Unit
    ctx.font = 0.071428 * width + 'px ' + STD_FONT_NAME
    
    if (lcdVisible) {
      if (gaugeType.type === 'type2') {
        ctx.textAlign = 'right'
        ctx.fillText(unit, 0.36 * width, height * 0.79, width * 0.25)
      } else {
        ctx.fillText(unit, 0.63 * width, height * 0.85, width * 0.2)
      }
    } else {
      ctx.textAlign = 'center'
      const unitYfactor = (gaugeType.type === 'type2') ? 0.92 : 0.89
      ctx.fillText(unit, width / 2, height * unitYfactor, width * 0.2)
    }
  } else {
    // Title
    ctx.font = `${0.035 * width}px ${STD_FONT_NAME}`
    ctx.fillText(title, width * 0.15, height * 0.25, width * 0.3)

    // Unit
    ctx.font = `${0.025 * width}px ${STD_FONT_NAME}`
    ctx.fillText(unit, width * 0.0625, height * 0.7, width * 0.07)
  }

  ctx.restore()
}
