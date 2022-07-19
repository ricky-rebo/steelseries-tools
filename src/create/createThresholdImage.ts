import { createBuffer, rotateContext } from '../utils/common'
import { HALF_PI, PI } from '../utils/constants'
import { createLinearGradient } from '../utils/gradients'

const cache: CanvasCache = {}

// TODO docs
export function createThresholdImage (width: number, height: number, linear = false, vertical = false) {
  const CACHE_KEY = width.toString() + height.toString() + linear + vertical

  if (!(CACHE_KEY in cache)) {
    const buffer = createBuffer(width, height)
    const ctx = buffer.getContext('2d')

    if (!ctx) {
      throw Error("Unable to get canvas context!")
    }

    ctx.save()

    const gradient = createLinearGradient(ctx, 0, 0.1, 0, height * 0.9, [
      { color: '#520000', offset: 0 },
      { color: '#fc1d00', offset: 0.3 },
      { color: '#fc1d00', offset: 0.59 },
      { color: '#520000', offset: 1 }
    ])
    
    if (linear && vertical) { // Linear Vertical Gauge case
      rotateContext(ctx, -HALF_PI)
    } else if (linear) { // Linear Horizontal Gauge case
      rotateContext(ctx, PI)
    }

    ctx.fillStyle = gradient
    ctx.fill(createIndicatorPath(width, height))

    ctx.strokeStyle = '#FFFFFF'
    ctx.stroke()

    ctx.restore()

    // cache the buffer
    cache[CACHE_KEY] = buffer
  }

  return cache[CACHE_KEY]
}


function createIndicatorPath (width: number, height: number) {
  const path = new Path2D()
  
  // Radial Threshold Indicator path 
  path.moveTo(width * 0.5, 0.1)
  path.lineTo(width * 0.9, height * 0.9)
  path.lineTo(width * 0.1, height * 0.9)
  path.lineTo(width * 0.5, 0.1)
  path.closePath()

  return path
}
