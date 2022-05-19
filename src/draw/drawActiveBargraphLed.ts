import { ColorDef } from "../customization/color-defs"
import { createRadialGradient } from "../utils/gradients"

type CanvasCtx = CanvasRenderingContext2D

export function drawActiveBargraphLed (ctx: CanvasCtx, color: ColorDef, mainCtx:  CanvasCtx, vertical: boolean) {
  const centerX = ctx.canvas.width / 2
  const centerY = ctx.canvas.height / 2

  ctx.save()

  ctx.fillStyle = createRadialGradient(
    mainCtx,
    { x: centerX, y: centerY, r: 0 },
    { x: centerX, y: centerY, r: (vertical) ? centerX : centerY },
    [
      { offset: 0, color: color.light.getRgbaColor() },
      { offset: 1, color: color.dark.getRgbaColor() }
    ]
  )

  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  // ctx.fill()

  ctx.restore()
}
