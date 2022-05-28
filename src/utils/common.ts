export function range (value: number, limit: number) {
  return value < 0 ? 0 : value > limit ? limit : value
}

export function createBuffer (width: number, height = width, id?: string) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  canvas.id = id ? id : ''

  return canvas
}

type DrawFunction = (ctx: CanvasRenderingContext2D) => void
export function drawToBuffer (width: number, height: number, drawFunction: DrawFunction) {
  const buffer = createBuffer(width, height)
  const ctx = buffer.getContext('2d')

  if (!ctx) {
    throw Error("Unable to get canvas context!")
  }

  drawFunction(ctx)

  return buffer
}

export function rotateContext (ctx: CanvasRenderingContext2D, angle: number, centerX = ctx.canvas.width/2, centerY = ctx.canvas.height/2) {
  // const centerX = ctx.canvas.width / 2
  // const centerY = ctx.canvas.height / 2

  ctx.translate(centerX, centerY)
  ctx.rotate(angle)
  ctx.translate(-centerX, -centerY)
}
