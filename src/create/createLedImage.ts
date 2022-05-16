import { LedColorDef } from '../customization/color-defs'
import { hexToRgba } from '../utils/colors'
import { createBuffer } from '../utils/common'
import { TWO_PI } from '../utils/constants'

export function createLedImage (size: number, on: boolean, ledColor: LedColorDef) {
  const CACHE_KEY = size.toString() + on + JSON.stringify(ledColor)

  // check if we have already created and cached this buffer, if not create it
  if (!(CACHE_KEY in cache)) {
    const ledBuffer = createBuffer(size, size)
    const ledCtx = ledBuffer.getContext('2d')

    if (!ledCtx) {
      throw Error("Unable to get canvas context!")
    }

    if (on) {
      drawLed(ledCtx, size, ledColor.innerColor1_ON, ledColor.innerColor2_ON, ledColor.outerColor_ON)
      drawLedCorona(ledCtx, size, ledColor.coronaColor)
    } else {
      drawLed(ledCtx, size, ledColor.innerColor1_OFF, ledColor.innerColor2_OFF, ledColor.outerColor_OFF)
    }

    // cache the buffer
    cache[CACHE_KEY] = ledBuffer
  }
  return cache[CACHE_KEY]
}

const cache: { [key: string]: HTMLCanvasElement } = {}


type CanvasCtx = CanvasRenderingContext2D
function drawLed (ctx: CanvasCtx, size: number, innerColor1: string, innerColor2: string, outerColor: string) {
  const center = 2 * Math.round(size / 4)
  let grad

  grad = ctx.createRadialGradient(
    center,
    center,
    0,
    center,
    center,
    (size * 0.5) / 2
  )
  grad.addColorStop(0, innerColor1)
  grad.addColorStop(0.2, innerColor2)
  grad.addColorStop(1, outerColor)
  ctx.fillStyle = grad

  ctx.beginPath()
  ctx.arc(center, center, (size * 0.5) / 2, 0, TWO_PI, true)
  ctx.closePath()
  ctx.fill()

  // InnerShadow
  grad = ctx.createRadialGradient(
    center,
    center,
    0,
    center,
    center,
    (size * 0.5) / 2
  )
  grad.addColorStop(0, 'rgba(0, 0, 0, 0)')
  grad.addColorStop(0.8, 'rgba(0, 0, 0, 0)')
  grad.addColorStop(1, 'rgba(0, 0, 0, 0.4)')
  ctx.fillStyle = grad

  ctx.beginPath()
  ctx.arc(center, center, (size * 0.5) / 2, 0, TWO_PI, true)
  ctx.closePath()
  ctx.fill()

  // LightReflex
  grad = ctx.createLinearGradient(
    0,
    0.35 * size,
    0,
    0.35 * size + 0.15 * size
  )
  grad.addColorStop(0, 'rgba(255, 255, 255, 0.4)')
  grad.addColorStop(1, 'rgba(255, 255, 255, 0)')
  ctx.fillStyle = grad

  ctx.beginPath()
  ctx.arc(
    center,
    0.35 * size + (0.2 * size) / 2,
    size * 0.2,
    0,
    TWO_PI,
    true
  )
  ctx.closePath()
  ctx.fill()
}

function drawLedCorona (ctx: CanvasCtx, size: number, coronaColor: string) {
  const center = 2 * Math.round(size / 4)
  
  const grad = ctx.createRadialGradient(center, center, 0, center, center, size / 2)
  grad.addColorStop(0, hexToRgba(coronaColor, 0))
  grad.addColorStop(0.6, hexToRgba(coronaColor, 0.4))
  grad.addColorStop(0.7, hexToRgba(coronaColor, 0.25))
  grad.addColorStop(0.8, hexToRgba(coronaColor, 0.15))
  grad.addColorStop(0.85, hexToRgba(coronaColor, 0.05))
  grad.addColorStop(1, hexToRgba(coronaColor, 0))
  ctx.fillStyle = grad

  ctx.beginPath()
  ctx.arc(center, center, size / 2, 0, TWO_PI, true)
  ctx.closePath()
  ctx.fill()
}
