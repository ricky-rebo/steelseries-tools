import { RgbaColor as rgbaColor } from '../../colors/RgbaColor'
import { ConicalGradient } from '../../colors/ConicalGradient'
import { FrameDesignDef } from '../../customization/type-descriptors'
import { createBuffer, drawRoundedRectangle } from '../../utils/common'
import { createLinearGradient } from '../../utils/gradients'

const drawLinearFrameImage = function (ctx: CanvasCtx, frame: FrameDesignDef, width: number, height: number, vertical: boolean) {
  const CACHE_KEY = width.toString() + height + frame.design + vertical
  
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
    drawRoundedRectangle(linFCtx, 0, 0, width, height, outerCornerRadius)
    linFCtx.fillStyle = '#838383'
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
        grad = linFCtx.createLinearGradient(0, width * 0.004672, 0, height * 0.990654)
        grad.addColorStop(0, 'rgb(255, 255, 207)')
        grad.addColorStop(0.15, 'rgb(255, 237, 96)')
        grad.addColorStop(0.22, 'rgb(254, 199, 57)')
        grad.addColorStop(0.3, 'rgb(255, 249, 203)')
        grad.addColorStop(0.38, 'rgb(255, 199, 64)')
        grad.addColorStop(0.44, 'rgb(252, 194, 60)')
        grad.addColorStop(0.51, 'rgb(255, 204, 59)')
        grad.addColorStop(0.6, 'rgb(213, 134, 29)')
        grad.addColorStop(0.68, 'rgb(255, 201, 56)')
        grad.addColorStop(0.75, 'rgb(212, 135, 29)')
        grad.addColorStop(1, 'rgb(247, 238, 101)')
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
        grad = linFCtx.createLinearGradient(0.228971 * width, 0.079439 * height, 0.802547 * width, 0.898591 * height)
        grad.addColorStop(0, '#666666')
        grad.addColorStop(0.21, '#000000')
        grad.addColorStop(0.47, '#666666')
        grad.addColorStop(0.99, '#000000')
        grad.addColorStop(1, '#000000')
        linFCtx.fillStyle = grad
        linFCtx.fill()
        break

      case 'glossyMetal':
        drawRoundedRectangle(linFCtx, 1, 1, width - 2, height - 2, outerCornerRadius)
        linFCtx.clip()

        grad = linFCtx.createLinearGradient(0, 1, 0, height - 2)
        // Modified fractions from the radial gauge - looks better imho
        grad.addColorStop(0, "rgb(249, 249, 249)")
        grad.addColorStop(0.2, "rgb(200, 195, 191)")
        grad.addColorStop(0.3, "#ffffff")
        grad.addColorStop(0.6, "rgb(29, 29, 29)")
        grad.addColorStop(0.8, "rgb(200, 194, 192)")
        grad.addColorStop(1, "rgb(209, 209, 209)")
        linFCtx.fillStyle = grad
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
          new rgbaColor("#FFFFFF"),
          new rgbaColor("#000000"),
          new rgbaColor("#999999"),
          new rgbaColor("#000000"),
          new rgbaColor("#999999"),
          new rgbaColor("#000000"),
          new rgbaColor("#FFFFFF"),
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
          new rgbaColor("#FFFFFF"),
          new rgbaColor("#D2D2D2"),
          new rgbaColor("#B3B3B3"),
          new rgbaColor("#EEEEEE"),
          new rgbaColor("#A0A0A0"),
          new rgbaColor("#EEEEEE"),
          new rgbaColor("#B3B3B3"),
          new rgbaColor("#D2D2D2"),
          new rgbaColor("#FFFFFF"),
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
          new rgbaColor("#FFFFFF"),
          new rgbaColor("#FFFFFF"),
          new rgbaColor("#888890"),
          new rgbaColor("#A4B9BE"),
          new rgbaColor("#9EB3B6"),
          new rgbaColor("#707070"),
          new rgbaColor("#DDE3E3"),
          new rgbaColor("#9BB0B3"),
          new rgbaColor("#9CB0B1"),
          new rgbaColor("#FEFFFF"),
          new rgbaColor("#FFFFFF"),
          new rgbaColor("#9CB4B4"),
          new rgbaColor("#C6D1D3"),
          new rgbaColor("#F6F8F7"),
          new rgbaColor("#CCD8D8"),
          new rgbaColor("#A4BCBE"),
          new rgbaColor("#FFFFFF"),
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
const cache: CanvasCache = {}

export default drawLinearFrameImage
