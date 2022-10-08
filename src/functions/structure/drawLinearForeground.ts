import { createBuffer } from '../../helpers/common'
import { createLinearGradient } from '../../helpers/gradients'

const cache: CanvasCache = {}

interface Options {
  width?: number
  height?: number
  vertical?: boolean
}

// TODO docs
export function drawLinearForeground (ctx: CanvasCtx, options?: Options) {
  const width = options?.width ?? ctx.canvas.width;
  const height = options?.height ?? ctx.canvas.height;
  const vertical = options?.vertical ?? (height > width);

  const CACHE_KEY = `${width}${height}${vertical}`

  // check if we have already created and cached this buffer, if not create it
  if (!(CACHE_KEY in cache)) {
    const linFgBuffer = createBuffer(width, height)
    const linFgCtx = linFgBuffer.getContext('2d')

    if (!linFgCtx) {
      throw Error("Unable to get canvas context!")
    }

    const frameWidth = Math.min(
      Math.sqrt(width * width + height * height) * 0.04,
      (vertical ? width : height) * 0.1
    )
    const fgOffset = frameWidth * 1.3
    const fgOffset2 = fgOffset * 1.33

    linFgCtx.beginPath()
    linFgCtx.moveTo(fgOffset, height - fgOffset)
    linFgCtx.lineTo(width - fgOffset, height - fgOffset)
    linFgCtx.bezierCurveTo(width - fgOffset, height - fgOffset, width - fgOffset2, height * 0.7, width - fgOffset2, height * 0.5)
    linFgCtx.bezierCurveTo(width - fgOffset2, fgOffset2, width - fgOffset, fgOffset, width - frameWidth, fgOffset)
    linFgCtx.lineTo(fgOffset, fgOffset)
    linFgCtx.bezierCurveTo(fgOffset, fgOffset, fgOffset2, height * 0.285714, fgOffset2, height * 0.5)
    linFgCtx.bezierCurveTo(fgOffset2, height * 0.7, fgOffset, height - fgOffset, frameWidth, height - fgOffset)
    linFgCtx.closePath()

    linFgCtx.fillStyle = createLinearGradient(linFgCtx, 0, height - frameWidth, 0, frameWidth, [
      { color: 'rgba(255, 255, 255, 0)', offset: 0 },
      { color: 'rgba(255, 255, 255, 0)', offset: 0.06 },
      { color: 'rgba(255, 255, 255, 0)', offset: 0.07 },
      { color: 'rgba(255, 255, 255, 0)', offset: 0.12 },
      { color: 'rgba(255, 255, 255, 0.013546)', offset: 0.17 },
      { color: 'rgba(255, 255, 255, 0)', offset: 0.1701 },
      { color: 'rgba(255, 255, 255, 0)', offset: 0.79 },
      { color: 'rgba(255, 255, 255, 0)', offset: 0.8 },
      { color: 'rgba(255, 255, 255, 0.082217)', offset: 0.84 },
      { color: 'rgba(255, 255, 255, 0.288702)', offset: 0.93 },
      { color: 'rgba(255, 255, 255, 0.298039)', offset: 0.94 },
      { color: 'rgba(255, 255, 255, 0.119213)', offset: 0.96 },
      { color: 'rgba(255, 255, 255, 0)', offset: 0.97 },
      { color: 'rgba(255, 255, 255, 0)', offset: 1 },
    ])
    linFgCtx.fill()

    // cache the buffer
    cache[CACHE_KEY] = linFgBuffer
  }

  ctx.drawImage(cache[CACHE_KEY], 0, 0)
}
