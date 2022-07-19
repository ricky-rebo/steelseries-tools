import { KnobTypeDef, KnobStyleDef } from '../customization/type-descriptors'
import { createBuffer } from '../utils/common'
import { drawMetalKnobImage, drawStandardKnobImage } from '../draw/knob'

const cache: CanvasCache = {}

// TODO docs
export function createKnobImage (size: number, knobType: KnobTypeDef, knobStyle: KnobStyleDef) {
  const CACHE_KEY = size.toString() + knobType.type + knobStyle.style

  // check if we have already created and cached this buffer, if not create it
  if (!(CACHE_KEY in cache)) {
    const knobBuffer = createBuffer(size * 1.18889, size * 1.18889)
    const knobCtx = knobBuffer.getContext('2d')

    if (!knobCtx) {
      throw Error("Unable to get canvas context!")
    }

    switch (knobType.type) {
      case 'metalKnob':
        drawMetalKnobImage(knobCtx, size, knobStyle)
        break

      case 'standardKnob':
        drawStandardKnobImage(knobCtx, size, knobStyle)
        break
    }

    // cache the buffer
    cache[CACHE_KEY] = knobBuffer
  }

  return cache[CACHE_KEY]
}
