import { createBuffer } from "../utils/common"

export function createMeasuredValueImage (size: number, indicatorColor: string, radial: boolean, vertical: boolean) {
  const CACHE_KEY = size.toString() + indicatorColor + radial + vertical

  // check if we have already created and cached this buffer, if so return it and exit
  if (!(CACHE_KEY in cache)) {
    const indicatorBuffer = createBuffer(size)
    const indicatorCtx = indicatorBuffer.getContext('2d')

    if (!indicatorCtx) {
      throw Error("Unable to get canvas context!")
    }

    indicatorCtx.fillStyle = indicatorColor
    indicatorCtx.fill(createIndicatorPath(size, radial, vertical))

    // cache the buffer
    cache[CACHE_KEY] = indicatorBuffer
  }
  
  return cache[CACHE_KEY]
}
const cache: { [key: string]: HTMLCanvasElement } = {}


function createIndicatorPath(size: number, radial: boolean, vertical: boolean) {
  const path = new Path2D()

  if (radial) {
    path.moveTo(size * 0.5, size)
    path.lineTo(0, 0)
    path.lineTo(size, 0)
    path.closePath()
  } else {
    if (vertical) {
      path.moveTo(size, size * 0.5)
      path.lineTo(0, 0)
      path.lineTo(0, size)
      path.closePath()
    } else {
      path.moveTo(size * 0.5, 0)
      path.lineTo(size, size)
      path.lineTo(0, size)
      path.closePath()
    }
  }

  return path
}
