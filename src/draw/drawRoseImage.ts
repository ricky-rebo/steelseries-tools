import { TWO_PI, RAD_FACTOR } from '../utils/constants'
import { createLinearGradient } from '../utils/gradients'
import { RgbaColor } from '../colors/RgbaColor'

// TODO docs
export function drawRoseImage (ctx: CanvasCtx, symbolColor: RgbaColor) {
  const width = ctx.canvas.width
  const height = ctx.canvas.height
  const centerX = width / 2
  const centerY = height / 2

  ctx.save()

  ctx.lineWidth = 1
  ctx.fillStyle = symbolColor.toRgbaString()
  ctx.strokeStyle = symbolColor.toRgbaString()
  
  // broken ring
  ctx.translate(centerX, centerY)

  let fill = true
  for (let i = 0; i < 360; i += 15) {
    fill = !fill

    ctx.beginPath()
    ctx.arc(0, 0, width * 0.26, i * RAD_FACTOR, (i + 15) * RAD_FACTOR, false)
    ctx.arc(0, 0, width * 0.23, (i + 15) * RAD_FACTOR, i * RAD_FACTOR, true)
    ctx.closePath()

    if (fill) {
      ctx.fill()
    }

    ctx.stroke()
  }

  ctx.translate(-centerX, -centerY)

  // Pointers
  for (let i = 0; i <= 360; i += 90) {
    // Small pointers
    ctx.beginPath()
    ctx.moveTo(width * 0.560747, height * 0.584112)
    ctx.lineTo(width * 0.640186, height * 0.644859)
    ctx.lineTo(width * 0.584112, height * 0.560747)
    ctx.lineTo(width * 0.560747, height * 0.584112)
    ctx.closePath()

    ctx.fill()
    ctx.stroke()

    // Large pointers
    ctx.fillStyle = createLinearGradient(ctx, 0.476635 * width, 0, 0.518691 * width, 0, [
      { color: 'rgb(222, 223, 218)', offset: 0 },
      { color: 'rgb(222, 223, 218)', offset: 0.48 },
      { color: symbolColor.toRgbaString(), offset: 0.49 },
      { color: symbolColor.toRgbaString(), offset: 1 },
    ])

    ctx.beginPath()
    ctx.moveTo(width * 0.523364, height * 0.397196)
    ctx.lineTo(width * 0.5, height * 0.196261)
    ctx.lineTo(width * 0.471962, height * 0.397196)
    ctx.lineTo(width * 0.523364, height * 0.397196)
    ctx.closePath()
    
    ctx.fill()
    ctx.stroke()

    // Position update
    ctx.translate(centerX, centerY)
    ctx.rotate(i * RAD_FACTOR)
    ctx.translate(-centerX, -centerY)
  }

  // Central ring
  ctx.beginPath()
  ctx.translate(centerX, centerY)
  ctx.arc(0, 0, width * 0.1, 0, TWO_PI, false)
  ctx.lineWidth = width * 0.022
  ctx.stroke()
  ctx.translate(-centerX, -centerY)

  ctx.restore()
}
