type CanvasCtx = CanvasRenderingContext2D

type Point = { x: number, y: number }
type RadialPoint = Point & { r: number }

type ColorStop = { offset: number, color: string }

// TODO internal docs
export function createLinearGradient(ctx: CanvasCtx, x0: number, y0: number, x1: number, y1: number, colorStops: ColorStop[]) {
  const gradient = ctx.createLinearGradient(x0, y0, x1, y1)

  colorStops.forEach(({ offset, color }) => {
    gradient.addColorStop(offset, color)
  })

  return gradient
}

// TODO internal docs
export function createRadialGradient (ctx: CanvasCtx, from: RadialPoint, to: RadialPoint, colorStops: ColorStop[]) {
  const gradient = ctx.createRadialGradient(from.x, from.y, from.r, to.x, to.y, to.r)

  colorStops.forEach(({ offset, color }) => {
    gradient.addColorStop(offset, color)
  })

  return gradient
}
