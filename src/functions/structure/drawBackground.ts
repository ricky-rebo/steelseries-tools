/* JS version | */ import { CarbonBuffer } from '../../textures/CarbonBuffer'
// import CarbonTexture from '../../textures/carbon-texture.svg'  // FIXME
/* JS version | */ import { PunchedSheetBuffer } from '../../textures/PunchedSheetBuffer'
// import PunchedSheetTexture from '../../textures/punchedsheet-texture.svg'  // FIXME

import { BrushedMetalTexture } from '../../textures/BrushedMetalTexture'
import { createBuffer, /* prepareTexture, */ rotateContext } from '../../helpers/common'
import { ConicalGradient } from '../../model/ConicalGradient'
import { RgbaColor } from '../../model/RgbaColor'
import { TWO_PI, RAD_FACTOR } from "../../shared"
import { BackgroundColorDef } from "../../model/BackgroundColorDef"
import { createLinearGradient, createRadialGradient } from '../../helpers/gradients'

interface Options {
  color: BackgroundColorDef
  width?: number 
  height?: number
  centerX?: number 
  centerY?: number
}

const cache: CanvasCache = {}

// TODO docs
export function drawBackground (ctx: CanvasRenderingContext2D, options: Options) {
  const width = options.width ?? ctx.canvas.width
  const height = options.height ?? ctx.canvas.height

  const CACHE_KEY = `${options.color.name}${width}${height}`

  // check if we have already created and cached this buffer, if not create it
  if (!(CACHE_KEY in cache)) {
    // Setup buffer
    const drawBuffer = createBuffer(width, height)
    const drawCtx = drawBuffer.getContext('2d')

    if (!drawCtx) {
      throw Error("Unable to get canvas context!")
    }

    const centerX = options.centerX ?? width / 2
    const centerY = options.centerY ?? height / 2
    const offsetX = (width * 0.831775) / 2

    // Background ellipse
    drawCtx.beginPath()
    drawCtx.arc(centerX, centerY, offsetX, 0, TWO_PI, true)
    drawCtx.closePath()

    switch (options.color.name) {
      case "CARBON":
      case "PUNCHED_SHEET":
      case "BRUSHED_METAL":
      case "BRUSHED_STAINLESS":
        drawTexture(drawCtx, options.color, width, height, centerX, centerY, offsetX)
        break
      
      case "STAINLESS":
        drawStainlessBackground(drawCtx, centerX, centerY, offsetX)
        break
      
      case "TURNED":
        drawStainlessBackground(drawCtx, centerX, centerY, offsetX)
        drawTurnedEffect(drawCtx, centerX, centerY, offsetX)
        break

      default:
        drawCtx.fillStyle = createLinearGradient(drawCtx, 0, width * 0.084112, 0, offsetX * 2, [
          { color: options.color.gradientStart.getRgbaColor(), offset: 0 },
          { color: options.color.gradientFraction.getRgbaColor(), offset: 0.4 },
          { color: options.color.gradientStop.getRgbaColor(), offset: 1 }
        ])
        drawCtx.fill()
    }

    // Inner shadow
    drawCtx.fillStyle = createRadialGradient(drawCtx, centerX, centerY, 0, offsetX, [
      { color: 'rgba(0, 0, 0, 0)', offset: 0 },
      { color: 'rgba(0, 0, 0, 0)', offset: 0.7 },
      { color: 'rgba(0, 0, 0, 0)', offset: 0.71 },
      { color: 'rgba(0, 0, 0, 0.03)', offset: 0.86 },
      { color: 'rgba(0, 0, 0, 0.07)', offset: 0.92 },
      { color: 'rgba(0, 0, 0, 0.15)', offset: 0.97 },
      { color: 'rgba(0, 0, 0, 0.3)', offset: 1 }
    ])

    drawCtx.beginPath()
    drawCtx.arc(centerX, centerY, offsetX, 0, TWO_PI, true)
    drawCtx.closePath()
    drawCtx.fill()

    // cache the buffer
    cache[CACHE_KEY] = drawBuffer
  }

  // Draw cached image
  ctx.drawImage(cache[CACHE_KEY], 0, 0)
}


/**
 * Draw texture background color: `CARBON`, `PUNCHED_SHEET`, `BRUSHED_METAL`, `BRUSHED_STAINLESS`
 * @param ctx Canvas context to draw on
 * @param color Background Color
 * @param width Canvas width
 * @param height Canvas height
 * @param centerX X axis center
 * @param centerY Y axis center
 * @param offsetX X axis offset
 */
function drawTexture (ctx: CanvasRenderingContext2D, color: BackgroundColorDef, width: number, height: number, centerX: number, centerY: number, offsetX: number) {
  if (color.name === 'CARBON') {
    ctx.fillStyle = (ctx.createPattern(CarbonBuffer, 'repeat') as CanvasPattern)
    // ctx.fillStyle = (ctx.createPattern(prepareTexture(CarbonTexture), 'repeat') as CanvasPattern) // FIXME
    ctx.fill()
  } else if (color.name === 'PUNCHED_SHEET') {
    ctx.fillStyle = (ctx.createPattern(PunchedSheetBuffer, 'repeat') as CanvasPattern)
    // ctx.fillStyle = (ctx.createPattern(prepareTexture(PunchedSheetTexture), 'repeat') as CanvasPattern) // FIXME
    ctx.fill()
  }

  // Add another inner shadow to make the look more realistic
  ctx.fillStyle = createLinearGradient(ctx, offsetX, 0, width - offsetX, 0, [
    { color: 'rgba(0, 0, 0, 0.25)', offset: 0 },
    { color: 'rgba(0, 0, 0, 0)', offset: 0.5 },
    { color: 'rgba(0, 0, 0, 0.25)', offset: 1 },
  ])
  ctx.beginPath()
  ctx.arc(centerX, centerY, offsetX, 0, TWO_PI, true)
  ctx.closePath()
  ctx.fill()

  if (color.name.startsWith("BRUSHED_")) {
    const mono = (color.name === 'BRUSHED_METAL')
    const texture = new BrushedMetalTexture(color.gradientStop, 5, 0.1, mono, 0.5)

    ctx.fillStyle = (ctx.createPattern(texture.fill(0, 0, width, height), 'no-repeat') as CanvasPattern)
    ctx.fill()
  }
}

/**
 * Draws STAINLESS background color
 * @param ctx Canvas context to draw on
 * @param centerX X axis center
 * @param centerY Y axis center
 * @param offsetX X axis offset
 */
function drawStainlessBackground (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, offsetX: number) {
  // Define the fractions of the conical gradient paint
  const fractions = [0, 0.03, 0.1, 0.14, 0.24, 0.33, 0.38, 0.5, 0.62, 0.67, 0.76, 0.81, 0.85, 0.97, 1]

  // Define the colors of the conical gradient paint
  const colors = [
    RgbaColor.fromHexString('#FDFDFD'),
    RgbaColor.fromHexString('#FDFDFD'),
    RgbaColor.fromHexString('#B2B2B4'),
    RgbaColor.fromHexString('#ACACAE'),
    RgbaColor.fromHexString('#FDFDFD'),
    RgbaColor.fromHexString('#8E8E8E'),
    RgbaColor.fromHexString('#8E8E8E'),
    RgbaColor.fromHexString('#FDFDFD'),
    RgbaColor.fromHexString('#8E8E8E'),
    RgbaColor.fromHexString('#8E8E8E'),
    RgbaColor.fromHexString('#FDFDFD'),
    RgbaColor.fromHexString('#ACACAE'),
    RgbaColor.fromHexString('#B2B2B4'),
    RgbaColor.fromHexString('#FDFDFD'),
    RgbaColor.fromHexString('#FDFDFD')
  ]

  const grad = new ConicalGradient(fractions, colors)
  grad.fillCircle(ctx, centerX, centerY, 0, offsetX)
}

/**
 * Draw 'turned' effect. Use on `STAINLESS` background color to obtain `TURNED` background color
 * @param ctx Canvas context to draw on 
 * @param centerX X axis center
 * @param centerY Y axis center
 * @param radius Effect radius
 */
function drawTurnedEffect (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number) {
  // Define the turning radius
  const turnRadius = radius * 0.55

  // Step size proporational to radius
  const stepSize = RAD_FACTOR * (500 / radius)

  const end = TWO_PI - stepSize * 0.3

  ctx.save()

  // restrict the turnings to the desired area
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius, 0, TWO_PI)
  ctx.closePath()
  ctx.clip()

  // set the style for the turnings
  ctx.lineWidth = 0.5

  // Step the engine round'n'round
  for (let i = 0; i < end; i += stepSize) {
    // draw a 'turn'
    ctx.strokeStyle = 'rgba(240, 240, 255, 0.25)'
    ctx.beginPath()
    ctx.arc(centerX + turnRadius, centerY, turnRadius, 0, TWO_PI)
    ctx.stroke()

    // rotate the 'piece' a fraction to draw 'shadow'
    rotateContext(ctx, stepSize * 0.3, centerX, centerY)

    // draw a 'turn'
    ctx.strokeStyle = 'rgba(25, 10, 10, 0.1)'
    ctx.beginPath()
    ctx.arc(centerX + turnRadius, centerY, turnRadius, 0, TWO_PI)
    ctx.stroke()

    // now rotate on to the next 'scribe' position minus the 'fraction'
    rotateContext(ctx, (stepSize - stepSize * 0.3), centerX, centerY)
  }

  ctx.restore()
}
