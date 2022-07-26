import { createBuffer, rotateContext } from "../../helpers/common"
import { HALF_PI, PI } from "../../shared"

const cache: CanvasCache = {}

// TODO docs
export function createMeasuredValuePointerImage (size: number, indicatorColor: string, linear = false, vertical = false) {
  const CACHE_KEY = size.toString() + indicatorColor + linear + vertical

  // check if we have already created and cached this buffer, if so return it and exit
  if (!(CACHE_KEY in cache)) {
    const indicatorBuffer = createBuffer(size)
    const indicatorCtx = indicatorBuffer.getContext('2d')

    if (!indicatorCtx) {
      throw Error("Unable to get canvas context!")
    }

    if (linear && vertical) {
      rotateContext(indicatorCtx, -HALF_PI)
    } else if (linear) {
      rotateContext(indicatorCtx, PI)
    }

    indicatorCtx.fillStyle = indicatorColor
    indicatorCtx.fill(createIndicatorPath(size))
    
    // cache the buffer
    cache[CACHE_KEY] = indicatorBuffer
  }
  
  return cache[CACHE_KEY]
}

function createIndicatorPath(size: number) {
  const path = new Path2D()

  path.moveTo(size * 0.5, size)
  path.lineTo(0, 0)
  path.lineTo(size, 0)
  path.closePath()

  return path
}
