import { LedColorDef } from "../model/LedColorDef"
import { drawLed, drawLedCorona } from './led'
import { createBuffer } from '../helpers/common'

const cache: CanvasCache = {}

// TODO docs
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
