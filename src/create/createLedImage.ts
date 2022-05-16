import { LedColorDef } from '../customization/color-defs'
import { drawLed, drawLedCorona } from '../draw/led'
import { createBuffer } from '../utils/common'

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
