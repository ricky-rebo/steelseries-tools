// import { createKnobImage } from "../create/createKnobImage"
// import { GaugeType, Orientation } from "../customization/types"
import { ForegroundTypeDef/* , GaugeTypeDef, KnobStyleDef, KnobTypeDef, OrientationDef */ } from "../customization/type-descriptors"
import { createBuffer } from "../utils/common"
import { createLinearGradient, createRadialGradient } from "../utils/gradients"

const cache: CanvasCache = {}

export const drawForeground = function(ctx: CanvasCtx, foreground: ForegroundTypeDef, width = ctx.canvas.width, height = ctx.canvas.height) {
  const CACHE_KEY = `${width}${height}${foreground.type}`
  // ${withCenterKnob}${knob?.type ?? "-"}${style?.style ?? "-"}${orientation?.type ?? "-"}

  // check if we have already created and cached this buffer, if so return it and exit
  if (!(CACHE_KEY in cache)) {
    // Setup buffer
    const radFgBuffer = createBuffer(width, height)
    const radFgCtx = radFgBuffer.getContext("2d")

    if (!radFgCtx) {
      throw Error("Unable to get canvas context!")
    }

    let grad

    // highlight
    switch (foreground.type) {
      case "type2":
        grad = createLinearGradient(radFgCtx, 0.313084 * width, 0.135514 * height, 0.495528 * width, 0.493582 * height, [
          { color: 'rgba(255, 255, 255, 0.275)', offset: 0 },
          { color: 'rgba(255, 255, 255, 0.015)', offset: 1 }
        ])
        radFgCtx.beginPath()
        radFgCtx.moveTo(width * 0.135514, height * 0.696261)
        radFgCtx.bezierCurveTo(width * 0.214953, height * 0.588785, width * 0.317757, height * 0.5, width * 0.462616, height * 0.425233)
        radFgCtx.bezierCurveTo(width * 0.612149, height * 0.345794, width * 0.733644, height * 0.317757, width * 0.873831, height * 0.322429)
        radFgCtx.bezierCurveTo(width * 0.766355, height * 0.112149, width * 0.528037, height * 0.023364, width * 0.313084, height * 0.130841)
        radFgCtx.bezierCurveTo(width * 0.09813, height * 0.238317, width * 0.028037, height * 0.485981, width * 0.135514, height * 0.696261)
        radFgCtx.closePath()
        break

      case "type3":
        grad = createLinearGradient(radFgCtx, 0, 0.093457 * height, 0, 0.556073 * height, [
          { color: 'rgba(255, 255, 255, 0.275)', offset: 0 },
          { color: 'rgba(255, 255, 255, 0.015)', offset: 1 }
        ])
        radFgCtx.beginPath()
        radFgCtx.moveTo(width * 0.084112, height * 0.509345)
        radFgCtx.bezierCurveTo(width * 0.21028, height * 0.556074, width * 0.462616, height * 0.560747, width * 0.5, height * 0.560747)
        radFgCtx.bezierCurveTo(width * 0.537383, height * 0.560747, width * 0.794392, height * 0.560747, width * 0.915887, height * 0.509345)
        radFgCtx.bezierCurveTo(width * 0.915887, height * 0.2757, width * 0.738317, height * 0.084112, width * 0.5, height * 0.084112)
        radFgCtx.bezierCurveTo(width * 0.261682, height * 0.084112, width * 0.084112, height * 0.2757, width * 0.084112, height * 0.509345)
        radFgCtx.closePath()
        break

      case "type4":
        radFgCtx.save()
        radFgCtx.fillStyle = createLinearGradient(radFgCtx, 0.130841 * width, 0.369158 * height, 0.273839 * width, 0.412877 * height, [
          { color: 'rgba(255, 255, 255, 0.275)', offset: 0 },
          { color: 'rgba(255, 255, 255, 0.015)', offset: 1 }
        ])
        radFgCtx.beginPath()
        radFgCtx.moveTo(width * 0.261682, height * 0.224299)
        radFgCtx.bezierCurveTo(width * 0.285046, height * 0.238317, width * 0.252336, height * 0.285046, width * 0.24299, height * 0.317757)
        radFgCtx.bezierCurveTo(width * 0.24299, height * 0.350467, width * 0.271028, height * 0.383177, width * 0.271028, height * 0.397196)
        radFgCtx.bezierCurveTo(width * 0.2757, height * 0.415887, width * 0.261682, height * 0.457943, width * 0.238317, height * 0.509345)
        radFgCtx.bezierCurveTo(width * 0.224299, height * 0.542056, width * 0.17757, height * 0.612149, width * 0.158878, height * 0.612149)
        radFgCtx.bezierCurveTo(width * 0.144859, height * 0.612149, width * 0.088785, height * 0.546728, width * 0.135841, height * 0.369158) // x changed from 0.130841 to 0.135841
        radFgCtx.bezierCurveTo(width * 0.140186, height * 0.336448, width * 0.214953, height * 0.200934, width * 0.261682, height * 0.224299)
        radFgCtx.closePath()
        radFgCtx.fill()
        radFgCtx.restore()
        
        grad = createRadialGradient(radFgCtx, 0.5 * width, 0.5 * height, 0, 0.38785 * width, [
          { color: 'rgba(255, 255, 255, 0)', offset: 0 },
          { color: 'rgba(255, 255, 255, 0)', offset: 0.82 },
          { color: 'rgba(255, 255, 255, 0)', offset: 0.83 },
          { color: 'rgba(255, 255, 255, 0.15)', offset: 1 },
        ])
        radFgCtx.beginPath()
        radFgCtx.moveTo(width * 0.67757, height * 0.24299)
        radFgCtx.bezierCurveTo(width * 0.771028, height * 0.308411, width * 0.822429, height * 0.411214, width * 0.813084, height * 0.528037)
        radFgCtx.bezierCurveTo(width * 0.799065, height * 0.654205, width * 0.719626, height * 0.757009, width * 0.593457, height * 0.799065)
        radFgCtx.bezierCurveTo(width * 0.485981, height * 0.831775, width * 0.369158, height * 0.808411, width * 0.285046, height * 0.728971)
        radFgCtx.bezierCurveTo(width * 0.2757, height * 0.719626, width * 0.252336, height * 0.714953, width * 0.233644, height * 0.728971)
        radFgCtx.bezierCurveTo(width * 0.214953, height * 0.747663, width * 0.219626, height * 0.771028, width * 0.228971, height * 0.7757)
        radFgCtx.bezierCurveTo(width * 0.331775, height * 0.878504, width * 0.476635, height * 0.915887, width * 0.616822, height * 0.869158)
        radFgCtx.bezierCurveTo(width * 0.771028, height * 0.822429, width * 0.873831, height * 0.691588, width * 0.88785, height * 0.53271)
        radFgCtx.bezierCurveTo(width * 0.897196, height * 0.38785, width * 0.836448, height * 0.257009, width * 0.719626, height * 0.182242)
        radFgCtx.bezierCurveTo(width * 0.705607, height * 0.172897, width * 0.682242, height * 0.163551, width * 0.663551, height * 0.186915)
        radFgCtx.bezierCurveTo(width * 0.654205, height * 0.205607, width * 0.668224, height * 0.238317, width * 0.67757, height * 0.24299)
        radFgCtx.closePath()
        break

      case "type5":
        grad = createLinearGradient(radFgCtx, 0, 0.084112 * height, 0, 0.644859 * height, [
          { color: 'rgba(255, 255, 255, 0.275)', offset: 0 },
          { color: 'rgba(255, 255, 255, 0.015)', offset: 1 }
        ])
        radFgCtx.beginPath()
        radFgCtx.moveTo(width * 0.084112, height * 0.5)
        radFgCtx.bezierCurveTo(width * 0.084112, height * 0.271028, width * 0.271028, height * 0.084112, width * 0.5, height * 0.084112)
        radFgCtx.bezierCurveTo(width * 0.700934, height * 0.084112, width * 0.864485, height * 0.224299, width * 0.906542, height * 0.411214)
        radFgCtx.bezierCurveTo(width * 0.911214, height * 0.439252, width * 0.911214, height * 0.518691, width * 0.845794, height * 0.537383)
        radFgCtx.bezierCurveTo(width * 0.794392, height * 0.546728, width * 0.551401, height * 0.411214, width * 0.392523, height * 0.457943)
        radFgCtx.bezierCurveTo(width * 0.168224, height * 0.509345, width * 0.135514, height * 0.7757, width * 0.093457, height * 0.593457)
        radFgCtx.bezierCurveTo(width * 0.088785, height * 0.560747, width * 0.084112, height * 0.53271, width * 0.084112, height * 0.5)
        radFgCtx.closePath()
        break

      case "type1":
      default:
        grad = createLinearGradient(radFgCtx, 0, 0.088785 * height, 0, 0.490654 * height, [
          { color: 'rgba(255, 255, 255, 0.275)', offset: 0 },
          { color: 'rgba(255, 255, 255, 0.015)', offset: 1 }
        ])
        radFgCtx.beginPath()
        radFgCtx.moveTo(width * 0.084112, height * 0.509345)
        radFgCtx.bezierCurveTo(width * 0.205607, height * 0.448598, width * 0.336448, height * 0.415887, width * 0.5, height * 0.415887)
        radFgCtx.bezierCurveTo(width * 0.672897, height * 0.415887, width * 0.789719, height * 0.443925, width * 0.915887, height * 0.509345)
        radFgCtx.bezierCurveTo(width * 0.915887, height * 0.2757, width * 0.738317, height * 0.084112, width * 0.5, height * 0.084112)
        radFgCtx.bezierCurveTo(width * 0.261682, height * 0.084112, width * 0.084112, height * 0.2757, width * 0.084112, height * 0.509345)
        radFgCtx.closePath()
        break
    }

    radFgCtx.fillStyle = grad
    radFgCtx.fill()

    // cache the buffer
    cache[CACHE_KEY] = radFgBuffer
  }

  ctx.drawImage(cache[CACHE_KEY], 0, 0)
}

function createForegroundGradient (ctx: CanvasCtx, foreground: ForegroundTypeDef, width: number, height: number) {

}

function createForegroundPath (ctx: CanvasCtx, foreground: ForegroundTypeDef, width: number, height: number) {

}
