import { FrameDesignDef } from "../../model/FrameDesignDef"
import { ConicalGradient } from '../../model/ConicalGradient'
import { RgbaColor } from '../../model/RgbaColor'
import { createBuffer } from '../../helpers/common'
import { TWO_PI } from "../../shared"
import { createLinearGradient, createRadialGradient } from '../../helpers/gradients'

const cache: CanvasCache = {}

// TODO docs
export function drawFrame (ctx: CanvasCtx, frame: FrameDesignDef, centerX: number, centerY: number, width: number, height: number) {
  const CACHE_KEY = `${frame.design}${width}${height}`

  // check if we have already created and cached this buffer, if not create it
  if (!(CACHE_KEY in cache)) {
    const radFBuffer = createBuffer(width, height)
    const radFCtx = radFBuffer.getContext('2d')

    if (!radFCtx) {
      throw Error("Unable to get canvas context!")
    }

    // outer gray frame
    radFCtx.fillStyle = '#848484'
    radFCtx.strokeStyle = 'rgba(132, 132, 132, 0.5)'
    radFCtx.beginPath()
    radFCtx.arc(centerX, centerY, width / 2, 0, TWO_PI, true)
    radFCtx.closePath()
    radFCtx.fill()
    radFCtx.stroke()

    radFCtx.beginPath()
    radFCtx.arc(centerX, centerY, (width * 0.990654) / 2, 0, TWO_PI, true)
    radFCtx.closePath()

    // main gradient frame
    let grad, fractions, colors
    switch (frame.design) {
      case 'metal':
        radFCtx.fillStyle = createLinearGradient(radFCtx, 0, width * 0.004672, 0, height * 0.990654, [
          { color: '#fefefe', offset: 0 },
          { color: '#d2d2d2', offset: 0.07 },
          { color: '#b3b3b3', offset: 0.12 },
          { color: '#d5d5d5', offset: 1 },
        ])
        radFCtx.fill()
        break

      case 'brass':
        radFCtx.fillStyle = createLinearGradient(radFCtx, 0, width * 0.004672, 0, height * 0.990654, [
          { color: '#f9f39b', offset: 0 },
          { color: '#f6e265', offset: 0.05 },
          { color: '#f0e184', offset: 0.1 },
          { color: '#5a3916', offset: 0.5 },
          { color: '#f9ed8b', offset: 0.9 },
          { color: '#f3e26c', offset: 0.95 },
          { color: '#cab671', offset: 1 }
        ])
        radFCtx.fill()
        break

      case 'steel':
        radFCtx.fillStyle = createLinearGradient(radFCtx, 0, width * 0.004672, 0, height * 0.990654, [
          { color: '#e7eded', offset: 0 },
          { color: '#bdc7c6', offset: 0.05 },
          { color: '#c0c9c8', offset: 0.1 },
          { color: '#171f21', offset: 0.5 },
          { color: '#c4cdcc', offset: 0.9 },
          { color: '#c2cccb', offset: 0.95 },
          { color: '#bdc9c7', offset: 1 }
        ])
        radFCtx.fill()
        break

      case 'gold':
        radFCtx.fillStyle = createLinearGradient(radFCtx, 0, width * 0.004672, 0, height * 0.990654, [
          { color: '#ffffcf', offset: 0 },
          { color: '#ffed60', offset: 0.15 },
          { color: '#fec739', offset: 0.22 },
          { color: '#fff9cb', offset: 0.3 },
          { color: '#ffc740', offset: 0.38 },
          { color: '#fcc23c', offset: 0.44 },
          { color: '#ffcc3b', offset: 0.51 },
          { color: '#d5861d', offset: 0.6 },
          { color: '#ffc938', offset: 0.68 },
          { color: '#d4871d', offset: 0.75 },
          { color: '#f7ee65', offset: 1 },
        ])
        radFCtx.fill()
        break

      case 'anthracite':
        radFCtx.fillStyle = createLinearGradient(radFCtx, 0, 0.004672 * height, 0, 0.995326 * height, [
          { color: '#767587', offset: 0 },
          { color: '#4a4a52', offset: 0.06 },
          { color: '#323236', offset: 0.12 },
          { color: '#4f4f57', offset: 1 }
        ])
        radFCtx.fill()
        break

      case 'tiltedGray':
        radFCtx.fillStyle = createLinearGradient(radFCtx, 0.233644 * width, 0.084112 * height, 0.81258 * width, 0.910919 * height, [
          { color: '#ffffff', offset: 0 },
          { color: '#d2d2d2', offset: 0.07 },
          { color: '#b3b3b3', offset: 0.16 },
          { color: '#ffffff', offset: 0.33 },
          { color: '#c5c5c5', offset: 0.55 },
          { color: '#ffffff', offset: 0.79 },
          { color: '#666666', offset: 1 },
        ])
        radFCtx.fill()
        break

      case 'tiltedBlack':
        radFCtx.fillStyle = createLinearGradient(radFCtx, 0.228971 * width, 0.079439 * height, 0.802547 * width, 0.898591 * height, [
          { color: '#666666', offset: 0 },
          { color: '#000000', offset: 0.21 },
          { color: '#666666', offset: 0.47 },
          { color: '#000000', offset: 0.99 },
          { color: '#000000', offset: 1 },
        ])
        radFCtx.fill()
        break

      case 'glossyMetal':
        radFCtx.fillStyle = createRadialGradient(radFCtx, 0.5 * width, 0.5 * height, 0, 0.5 * width, [
          { color: '#cfcfcf', offset: 0 },
          { color: '#cdcccd', offset: 0.96 },
          { color: '#f4f4f4', offset: 1 },
        ])
        radFCtx.fill()

        // Central horizontal gloss
        radFCtx.fillStyle = createLinearGradient(radFCtx, 0, height - 0.971962 * height, 0, 0.971962 * height, [
          { color: '#f9f9f9', offset: 0 },
          { color: '#c8c3bf', offset: 0.23 },
          { color: '#ffffff', offset: 0.36 },
          { color: '#1d1d1d', offset: 0.59 },
          { color: '#c8c2c0', offset: 0.76 },
          { color: '#d1d1d1', offset: 1 },
        ])
        radFCtx.beginPath()
        radFCtx.arc(0.5 * width, 0.5 * height, (0.973962 * width) / 2, 0, TWO_PI)
        radFCtx.closePath()
        radFCtx.fill()

        // Inner circles
        radFCtx.fillStyle = '#f6f6f6'
        radFCtx.beginPath()
        radFCtx.arc(0.5 * width, 0.5 * height, (0.869158 * width) / 2, 0, TWO_PI)
        radFCtx.closePath()
        radFCtx.fill()

        radFCtx.fillStyle = '#333333'
        radFCtx.beginPath()
        radFCtx.arc(0.5 * width, 0.5 * height, (0.85 * width) / 2, 0, TWO_PI)
        radFCtx.closePath()
        radFCtx.fill()
        break

      case 'blackMetal':
        fractions = [0, 0.125, 0.347222, 0.5, 0.680555, 0.875, 1]

        colors = [
          new RgbaColor(254, 254, 254, 1),
          new RgbaColor(0, 0, 0, 1),
          new RgbaColor(153, 153, 153, 1),
          new RgbaColor(0, 0, 0, 1),
          new RgbaColor(153, 153, 153, 1),
          new RgbaColor(0, 0, 0, 1),
          new RgbaColor(254, 254, 254, 1)
        ]

        radFCtx.save()
        radFCtx.arc(centerX, centerY, (width * 0.990654) / 2, 0, TWO_PI, true)
        radFCtx.clip()

        grad = new ConicalGradient(fractions, colors)
        grad.fillCircle(radFCtx, centerX, centerY, width * 0.42056, width * 0.495327)

        // fade outer edge
        radFCtx.strokeStyle = '#848484'
        radFCtx.strokeStyle = 'rgba(132, 132, 132, 0.8)'
        radFCtx.lineWidth = width / 90

        radFCtx.beginPath()
        radFCtx.arc(centerX, centerY, width / 2, 0, TWO_PI, true)
        radFCtx.closePath()
        radFCtx.stroke()
        radFCtx.restore()
        break

      case 'shinyMetal':
        fractions = [0, 0.125, 0.25, 0.347222, 0.5, 0.652777, 0.75, 0.875, 1]

        colors = [
          new RgbaColor(254, 254, 254, 1),
          new RgbaColor(210, 210, 210, 1),
          new RgbaColor(179, 179, 179, 1),
          new RgbaColor(238, 238, 238, 1),
          new RgbaColor(160, 160, 160, 1),
          new RgbaColor(238, 238, 238, 1),
          new RgbaColor(179, 179, 179, 1),
          new RgbaColor(210, 210, 210, 1),
          new RgbaColor(254, 254, 254, 1)
        ]

        radFCtx.save()
        radFCtx.arc(centerX, centerY, (width * 0.990654) / 2, 0, TWO_PI, true)
        radFCtx.clip()

        grad = new ConicalGradient(fractions, colors)
        grad.fillCircle(radFCtx, centerX, centerY, width * 0.42056, width * 0.495327)

        // fade outer edge
        radFCtx.strokeStyle = 'rgba(132, 132, 132, 0.8)'
        radFCtx.lineWidth = width / 90
        
        radFCtx.beginPath()
        radFCtx.arc(centerX, centerY, width / 2, 0, TWO_PI, true)
        radFCtx.closePath()
        radFCtx.stroke()
        radFCtx.restore()
        break

      case 'chrome':
        fractions = [0, 0.09, 0.12, 0.16, 0.25, 0.29, 0.33, 0.38, 0.48, 0.52, 0.63, 0.68, 0.8, 0.83, 0.87, 0.97, 1]

        colors = [
          new RgbaColor(255, 255, 255, 1),
          new RgbaColor(255, 255, 255, 1),
          new RgbaColor(136, 136, 138, 1),
          new RgbaColor(164, 185, 190, 1),
          new RgbaColor(158, 179, 182, 1),
          new RgbaColor(112, 112, 112, 1),
          new RgbaColor(221, 227, 227, 1),
          new RgbaColor(155, 176, 179, 1),
          new RgbaColor(156, 176, 177, 1),
          new RgbaColor(254, 255, 255, 1),
          new RgbaColor(255, 255, 255, 1),
          new RgbaColor(156, 180, 180, 1),
          new RgbaColor(198, 209, 211, 1),
          new RgbaColor(246, 248, 247, 1),
          new RgbaColor(204, 216, 216, 1),
          new RgbaColor(164, 188, 190, 1),
          new RgbaColor(255, 255, 255, 1)
        ]

        radFCtx.save()
        radFCtx.arc(centerX, centerY, (width * 0.990654) / 2, 0, TWO_PI, true)
        radFCtx.clip()

        grad = new ConicalGradient(fractions, colors)
        grad.fillCircle(radFCtx, centerX, centerY, width * 0.42056, width * 0.495327)

        // fade outer edge
        radFCtx.strokeStyle = '#848484'
        radFCtx.strokeStyle = 'rgba(132, 132, 132, 0.8)'
        radFCtx.lineWidth = width / 90

        radFCtx.beginPath()
        radFCtx.arc(centerX, centerY, width / 2, 0, TWO_PI, true)
        radFCtx.closePath()
        radFCtx.stroke()
        radFCtx.restore()

        break
    }

    // inner bright frame
    radFCtx.fillStyle = 'rgb(191, 191, 191)'
    radFCtx.beginPath()
    radFCtx.arc(centerX, centerY, (width * 0.841121) / 2, 0, TWO_PI, true)
    radFCtx.closePath()
    radFCtx.fill()

    // clip out center so it is transparent if the background is not visible
    radFCtx.globalCompositeOperation = 'destination-out'

    // Background ellipse
    radFCtx.beginPath()
    radFCtx.arc(centerX, centerY, (width * 0.83) / 2, 0, TWO_PI, true)
    radFCtx.closePath()
    radFCtx.fill()

    // cache the buffer
    cache[CACHE_KEY] = radFBuffer
  }
  ctx.drawImage(cache[CACHE_KEY], 0, 0)
}
