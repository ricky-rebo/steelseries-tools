export function range (value: number, limit: number) {
  return value < 0 ? 0 : value > limit ? limit : value
}

export function calcNiceNumber (_range: number, round: boolean) {
  const exponent = Math.floor(Math.log10(_range)) // exponent of range
  const fraction = _range / Math.pow(10, exponent) // fractional part of range
  let niceFraction // nice, rounded fraction

  if (round) {
    if (fraction < 1.5) {
      niceFraction = 1
    } else if (fraction < 3) {
      niceFraction = 2
    } else if (fraction < 7) {
      niceFraction = 5
    } else {
      niceFraction = 10
    }
  } else {
    if (fraction <= 1) {
      niceFraction = 1
    } else if (fraction <= 2) {
      niceFraction = 2
    } else if (fraction <= 5) {
      niceFraction = 5
    } else {
      niceFraction = 10
    }
  }
  return niceFraction * Math.pow(10, exponent)
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

export function prepareTexture (svg: string) {
  const texture = new Image()
  texture.src = `data:image/svg+xml;base64,${window.btoa(svg)}`
  return texture
}
