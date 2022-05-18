type CanvasCtx = CanvasRenderingContext2D
type ColorStop = { offset: number, color: string }

export function createLinearGradient(ctx: CanvasCtx, x0: number, y0: number, x1: number, y1: number, colorStops: ColorStop[]) {
  const gradient = ctx.createLinearGradient(x0, y0, x1, y1)

  colorStops.forEach(({ offset, color }) => {
    gradient.addColorStop(offset, color)
  })

  return gradient
}
