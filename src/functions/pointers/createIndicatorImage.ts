import { createBuffer, rotateContext } from "../../helpers/common";
import { ColorStop, createLinearGradient } from "../../helpers/gradients";

const cache: CanvasCache = {};

type Options = {
  angle?: number,
  border?: string,
} & (
  { background: 'mono', color: any } 
  | 
  { background: 'gradient', colorStops: ColorStop[] }
)

export function createIndicatorImage(width: number, height: number, options: Options) {
  const CACHE_KEY = `${width}${height}${JSON.stringify(options)}`;

  if (!(CACHE_KEY in cache)) {
    const buffer = createBuffer(width, height)
    const ctx = buffer.getContext('2d')

    if (!ctx) {
      throw Error("Unable to get canvas context!")
    }

    ctx.save()

    // Set fill style
    if (options.background === 'gradient') {
      ctx.fillStyle = createLinearGradient(ctx, 0, 0, 0, height, options.colorStops);
    } else {
      ctx.fillStyle = options.color;
    }

    if ('angle' in options && options.angle && options.angle !== 0) {
      rotateContext(ctx, options.angle);
    }

    const path = createIndicatorPath(width, height);
    ctx.fill(path);

    // Set stroke style (if needed)
    if ('border' in options && options.border) {
      console.log('stroke')
      ctx.strokeStyle = options.border;
      ctx.stroke(path);
    }

    ctx.restore()

    // cache the buffer
    cache[CACHE_KEY] = buffer

  }

  return cache[CACHE_KEY];
}

function createIndicatorPath (width: number, height: number) {
  const path = new Path2D()
  
  path.moveTo(width * 0.5, 0)
  path.lineTo(width, height)
  path.lineTo(0, height)
  path.lineTo(width * 0.5, 0)
  path.closePath()

  return path
}