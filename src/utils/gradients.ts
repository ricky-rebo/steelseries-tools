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
export function createRadialGradient (ctx: CanvasCtx, x: number, y: number, r0: number, r1: number, colorStops: ColorStop[]) {
  const gradient = ctx.createRadialGradient(x, y, r0, x, y, r1)

  colorStops.forEach(({ offset, color }) => {
    gradient.addColorStop(offset, color)
  })

  return gradient
}
