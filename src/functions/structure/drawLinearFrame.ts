import { RgbaColor } from '../../model/RgbaColor'
import { ConicalGradient } from '../../model/ConicalGradient'
import { FrameDesignDef } from "../../model/FrameDesignDef"
import { createBuffer } from '../../helpers/common'
import { createLinearGradient } from '../../helpers/gradients'
import { drawRoundedRectangle } from '../../helpers/misc'

const cache: CanvasCache = {}

// TODO doocs
export const drawLinearFrame = function (ctx: CanvasCtx, frame: FrameDesignDef, width: number, height: number, vertical: boolean) {
  const CACHE_KEY = `${frame.design}${width}${height}${vertical}`
  
  let grad
  let fractions = []
  let colors = []
  
  // check if we have already created and cached this buffer, if not create it
  if (!(CACHE_KEY in cache)) {
    // Setup buffer
    const linFBuffer = createBuffer(width, height)
    const linFCtx = linFBuffer.getContext('2d')

    if (!linFCtx) {
      throw Error("Unable to get canvas context!")
    }

    const frameWidth = Math.ceil(
      Math.min(
        Math.sqrt(width * width + height * height) * 0.04,
        (vertical ? width : height) * 0.1
      )
    )

    // Calculate corner radii
    const outerCornerRadius = Math.ceil((vertical ? width : height) * 0.05)
    const innerCornerRadius = Math.floor((vertical ? width : height) * 0.028571)
    const mainCornerRadius = outerCornerRadius - 1

    // Outer Border
    linFCtx.fillStyle = '#838383'
    drawRoundedRectangle(linFCtx, 0, 0, width, height, outerCornerRadius)
    linFCtx.fill()

    // Main Gradient
    drawRoundedRectangle(linFCtx, 1, 1, width-2, height-2, mainCornerRadius)

    switch (frame.design) {
      case 'metal':
        linFCtx.fillStyle = createLinearGradient(linFCtx, 0, width * 0.004672, 0, height * 0.990654, [
          { color: '#fefefe', offset: 0 },
          { color: '#d2d2d2', offset: 0.07 },
          { color: '#b3b3b3', offset: 0.12 },
          { color: '#d5d5d5', offset: 1 }
        ])
        linFCtx.fill()
        break

      case 'brass':
        linFCtx.fillStyle = createLinearGradient(linFCtx, 0, width * 0.004672, 0, height * 0.990654, [
          { color: '#f9f39b', offset: 0 },
          { color: '#f6e265', offset: 0.05 },
          { color: '#f0e184', offset: 0.1 },
          { color: '#5a3916', offset: 0.5 },
          { color: '#f9ed8b', offset: 0.9 },
          { color: '#f3e26c', offset: 0.95 },
          { color: '#cab671', offset: 1 },
        ])
        linFCtx.fill()
        break

      case 'steel':
        linFCtx.fillStyle = createLinearGradient(linFCtx, 0, width * 0.004672, 0, height * 0.990654, [
          { color: '#e7eded', offset: 0 },
          { color: '#bdc7c6', offset: 0.05 },
          { color: '#c0c9c8', offset: 0.1 },
          { color: '#171f21', offset: 0.5 },
          { color: '#c4cdcc', offset: 0.9 },
          { color: '#c2cccb', offset: 0.95 },
          { color: '#bdc9c7', offset: 1 },
        ])
        linFCtx.fill()
        break

      case 'gold':
        linFCtx.fillStyle = createLinearGradient(linFCtx, 0, width * 0.004672, 0, height * 0.990654, [
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
        linFCtx.fill()
        break

      case 'anthracite':
        linFCtx.fillStyle = createLinearGradient(linFCtx, 0, 0.004672 * height, 0, 0.995326 * height, [
          { color: '#767587', offset: 0 },
          { color: '#4a4a52', offset: 0.06 },
          { color: '#323236', offset: 0.12 },
          { color: '#4f4f57', offset: 1 }
        ])
        linFCtx.fill()
        break

      case 'tiltedGray':
        linFCtx.fillStyle = createLinearGradient(linFCtx, 0.233644 * width, 0.084112 * height, 0.81258 * width, 0.910919 * height, [
          { color: '#ffffff', offset: 0 },
          { color: '#d2d2d2', offset: 0.07 },
          { color: '#b3b3b3', offset: 0.16 },
          { color: '#ffffff', offset: 0.33 },
          { color: '#c5c5c5', offset: 0.55 },
          { color: '#ffffff', offset: 0.79 },
          { color: '#666666', offset: 1 },
        ])
        linFCtx.fill()
        break

      case 'tiltedBlack':
        linFCtx.fillStyle = createLinearGradient(linFCtx, 0.228971 * width, 0.079439 * height, 0.802547 * width, 0.898591 * height, [
          { color: '#666666', offset: 0 },
          { color: '#000000', offset: 0.21 },
          { color: '#666666', offset: 0.47 },
          { color: '#000000', offset: 0.99 },
          { color: '#000000', offset: 1 },
        ])
        linFCtx.fill()
        break

      case 'glossyMetal':
        drawRoundedRectangle(linFCtx, 1, 1, width - 2, height - 2, outerCornerRadius)
        linFCtx.clip()

        // Modified fractions from the radial gauge - looks better imho
        linFCtx.fillStyle = createLinearGradient(linFCtx, 0, 1, 0, height - 2, [
          { color: '#f9f9f9', offset: 0 },
          { color: '#c8c3bf', offset: 0.2 },
          { color: '#ffffff', offset: 0.3 },
          { color: '#1d1d1d', offset: 0.6 },
          { color: '#c8c2c0', offset: 0.8 },
          { color: '#d1d1d1', offset: 1 }
        ])
        linFCtx.fill()

        // Inner frame bright
        drawRoundedRectangle(linFCtx, frameWidth-2, frameWidth-2, width - (frameWidth-2)*2, height - (frameWidth-2) * 2, innerCornerRadius)
        linFCtx.clip()
        linFCtx.fillStyle = "#f6f6f6"
        linFCtx.fill()

        // Inner frame dark
        drawRoundedRectangle(linFCtx, frameWidth-1, frameWidth-1, width - (frameWidth-1) * 2, height - (frameWidth-1) * 2, innerCornerRadius)
        linFCtx.clip()
        linFCtx.fillStyle = "#333333"
        //                linFCtx.fill();
        break

      case "blackMetal":
        fractions = [0, 0.125, 0.347222, 0.5, 0.680555, 0.875, 1]

        colors = [
          RgbaColor.fromHexString("#FFFFFF"),
          RgbaColor.fromHexString("#000000"),
          RgbaColor.fromHexString("#999999"),
          RgbaColor.fromHexString("#000000"),
          RgbaColor.fromHexString("#999999"),
          RgbaColor.fromHexString("#000000"),
          RgbaColor.fromHexString("#FFFFFF"),
        ]

        // Set the clip
        linFCtx.beginPath()
        drawRoundedRectangle(linFCtx, 1, 1, width - 2, height - 2, outerCornerRadius)
        linFCtx.closePath()
        linFCtx.clip()

        grad = new ConicalGradient(fractions, colors)
        grad.fillRect(linFCtx, width/2, height/2, width, height, frameWidth, frameWidth)
        break

      case "shinyMetal":
        fractions = [0, 0.125, 0.25, 0.347222, 0.5, 0.652777, 0.75, 0.875, 1]

        colors = [
          RgbaColor.fromHexString("#FFFFFF"),
          RgbaColor.fromHexString("#D2D2D2"),
          RgbaColor.fromHexString("#B3B3B3"),
          RgbaColor.fromHexString("#EEEEEE"),
          RgbaColor.fromHexString("#A0A0A0"),
          RgbaColor.fromHexString("#EEEEEE"),
          RgbaColor.fromHexString("#B3B3B3"),
          RgbaColor.fromHexString("#D2D2D2"),
          RgbaColor.fromHexString("#FFFFFF"),
        ]
        
        // Set the clip
        linFCtx.beginPath()
        drawRoundedRectangle(linFCtx, 1, 1, width - 2, height - 2, outerCornerRadius)
        linFCtx.closePath()
        linFCtx.clip()

        grad = new ConicalGradient(fractions, colors)
        grad.fillRect(linFCtx, width / 2, height / 2, width, height, frameWidth, frameWidth)
        break

      case "chrome":
        fractions = [0, 0.09, 0.12, 0.16, 0.25, 0.29, 0.33, 0.38, 0.48, 0.52, 0.63, 0.68, 0.8, 0.83, 0.87, 0.97, 1]

        colors = [
          RgbaColor.fromHexString("#FFFFFF"),
          RgbaColor.fromHexString("#FFFFFF"),
          RgbaColor.fromHexString("#888890"),
          RgbaColor.fromHexString("#A4B9BE"),
          RgbaColor.fromHexString("#9EB3B6"),
          RgbaColor.fromHexString("#707070"),
          RgbaColor.fromHexString("#DDE3E3"),
          RgbaColor.fromHexString("#9BB0B3"),
          RgbaColor.fromHexString("#9CB0B1"),
          RgbaColor.fromHexString("#FEFFFF"),
          RgbaColor.fromHexString("#FFFFFF"),
          RgbaColor.fromHexString("#9CB4B4"),
          RgbaColor.fromHexString("#C6D1D3"),
          RgbaColor.fromHexString("#F6F8F7"),
          RgbaColor.fromHexString("#CCD8D8"),
          RgbaColor.fromHexString("#A4BCBE"),
          RgbaColor.fromHexString("#FFFFFF"),
        ]
        // Set the clip
        linFCtx.beginPath()
        drawRoundedRectangle(linFCtx, 1, 1, width - 2, height - 2, outerCornerRadius)
        linFCtx.closePath()
        linFCtx.clip()

        grad = new ConicalGradient(fractions, colors)
        grad.fillRect(linFCtx, width / 2, height / 2, width, height, frameWidth, frameWidth)
        break
    }

    drawRoundedRectangle(linFCtx, frameWidth, frameWidth, width - frameWidth * 2, height - frameWidth * 2, innerCornerRadius)
    linFCtx.fillStyle = 'rgb(192, 192, 192)'

    // clip out the center of the frame for transparent backgrounds
    linFCtx.globalCompositeOperation = 'destination-out'
    drawRoundedRectangle(linFCtx, frameWidth, frameWidth, width - frameWidth * 2, height - frameWidth * 2, innerCornerRadius)
    linFCtx.fill()

    // cache the buffer
    cache[CACHE_KEY] = linFBuffer
  }

  ctx.drawImage(cache[CACHE_KEY], 0, 0)
}
