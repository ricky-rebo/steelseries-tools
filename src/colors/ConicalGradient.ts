import { getRawColorFromFraction } from "./misc"
import { drawToBuffer } from "../utils/common"
import { PI, TWO_PI } from "../utils/constants"
import { RgbaColor } from "./RgbaColor"

export class ConicalGradient {
  #fractions: number[]
  #colors: RgbaColor[]
  #limit: number

  constructor (fractions: number[], colors: RgbaColor[]) {
    this.#limit = fractions.length - 1
    this.#fractions = fractions.map((item) => (TWO_PI * item - PI))
    this.#colors = colors
  }

  fillCircle (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, innerX: number, outerX: number) {
    const radius = Math.ceil(outerX)
    const diameter = radius * 2

    // Create pixel array
    const pixels = ctx.createImageData(diameter, diameter)
    const alpha = 255

    let dx, dy, dy2
    let distance
    let angle
    let indx

    for (let y = 0; y < diameter; y++) {
      dy = radius - y
      dy2 = dy * dy

      for (let x = 0; x < diameter; x++) {
        dx = x - radius
        distance = Math.sqrt(dx * dx + dy2)

        if (distance <= radius && distance >= innerX) {
          // pixels are transparent by default, so only paint the ones we need
          let pixColor: number[] = []
          angle = Math.atan2(dx, dy)

          for (let i = 0; i < this.#limit; i++) {
            if (angle >= this.#fractions[i] && angle < this.#fractions[i+1]) {
              pixColor = getRawColorFromFraction(this.#colors[i], this.#colors[i+1], this.#fractions[i+1] - this.#fractions[i], angle - this.#fractions[i])
            }
          }

          if (pixColor.length > 0) {
            // The pixel array is addressed as 4 elements per pixel [r,g,b,a]
            // plot is 180 rotated from orginal method, so apply a simple invert (diameter - y)
            indx = (diameter - y) * diameter * 4 + x * 4

            pixels.data[indx] = pixColor[0]
            pixels.data[indx+1] = pixColor[1]
            pixels.data[indx+2] = pixColor[2]
            pixels.data[indx+3] = alpha
          }
        }
      }
    }

    // Create a new buffer to apply the raw data so we can rotate it
    // const buffer = createBuffer(diameter, diameter)
    // const bufferCtx = buffer.getContext('2d')
    // bufferCtx.putImageData(pixels, 0, 0)
    
    // Apply the image buffer
    const buffer = drawToBuffer(diameter, diameter, (_ctx) => { _ctx.putImageData(pixels, 0, 0) })
    ctx.drawImage(buffer, centerX - radius, centerY - radius)
  }

  fillRect (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, width: number, height: number, thicknessX: number, thicknessY: number) {
    width = Math.ceil(width)
    height = Math.ceil(height)
    thicknessX = Math.ceil(thicknessX)
    thicknessY = Math.ceil(thicknessY)

    const width2 = width / 2
    const height2 = height / 2

    // Create pixel array
    const pixels = ctx.createImageData(width, height)
    const alpha = 255

    let angle
    let dx, dy
    let indx

    for (let y = 0; y < height; y++) {
      dy = height2 - y

      for (let x = 0; x < width; x++) {
        if (y > thicknessY && y <= height - thicknessY) {
          // we are in the range where we only draw the sides
          if (x > thicknessX && x < width - thicknessX) {
            // we are in the empty 'middle', jump to the next edge
            x = width - thicknessX
          }
        }

        dx = x - width2
        angle = Math.atan2(dx, dy)

        let pixColor: number[] = []
        for (let i = 0; i < this.#limit; i++) {
          if (angle >= this.#fractions[i] && angle < this.#fractions[i+1]) {
            pixColor = getRawColorFromFraction(this.#colors[i], this.#colors[i+1], this.#fractions[i+1] - this.#fractions[i], angle - this.#fractions[i])
          }
        }

        if (pixColor.length > 0) {
          // The pixel array is addressed as 4 elements per pixel [r,g,b,a]
          // plot is 180 rotated from orginal method, so apply a simple invert (height - y)
          indx = (height - y) * width * 4 + x * 4
          pixels.data[indx] = pixColor[0]
          pixels.data[indx + 1] = pixColor[0]
          pixels.data[indx + 2] = pixColor[0]
          pixels.data[indx + 3] = alpha
        }

      }
    }
    // Create a new buffer to apply the raw data so we can clip it when drawing to canvas
    // const buffer = createBuffer(width, height)
    // const bufferCtx = buffer.getContext('2d')
    // bufferCtx.putImageData(pixels, 0, 0)

    // draw the buffer back to the canvas
    const buffer = drawToBuffer(width, height, (_ctx) => { _ctx.putImageData(pixels, 0, 0) })
    ctx.drawImage(buffer, centerX - width2, centerY - height2)
  }
}
