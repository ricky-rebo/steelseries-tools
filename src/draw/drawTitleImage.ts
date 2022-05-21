import { STD_FONT_NAME } from '../utils/constants'
import { RgbaColor } from '../utils/RgbaColor'

// TODO docs
export function drawStrings (ctx: CanvasRenderingContext2D, title: string, unit: string, labelColor: RgbaColor) {
  const width = ctx.canvas.width
  const height = ctx.canvas.height

  ctx.save()

  ctx.font = `${0.046728 * width}px ${STD_FONT_NAME}`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.strokeStyle = labelColor.getRgbaColor()
  ctx.fillStyle = labelColor.getRgbaColor()

  ctx.fillText(title, width / 2, height * 0.3, width * 0.3)
  ctx.fillText(unit, width / 2, height * 0.38, width * 0.3)

  ctx.restore()
}
