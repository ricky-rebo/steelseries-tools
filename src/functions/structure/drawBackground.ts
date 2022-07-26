// import { CarbonBuffer } from '../textures/CarbonBuffer'
// import { PunchedSheetBuffer } from '../textures/PunchedSheetBuffer'

import CarbonTexture from '../../textures/carbon-texture.svg'
import PunchedSheetTexture from '../../textures/punchedsheet-texture.svg'

import { BrushedMetalTexture } from '../../textures/BrushedMetalTexture'
import { createBuffer, prepareTexture, rotateContext } from '../../helpers/common'
import { ConicalGradient } from '../../model/ConicalGradient'
import { RgbaColor } from '../../model/RgbaColor'
import { TWO_PI, RAD_FACTOR } from "../../shared"
import { BackgroundColorDef } from "../../model/BackgroundColorDef"
import { createLinearGradient, createRadialGradient } from '../../helpers/gradients'

const cache: CanvasCache = {}

// TODO docs
export function drawBackground (ctx: CanvasRenderingContext2D, color: BackgroundColorDef, centerX: number, centerY: number, width: number, height: number) {
  const CACHE_KEY = `${color.name}${width}${height}`

  // check if we have already created and cached this buffer, if not create it
  if (!(CACHE_KEY in cache)) {
    // Setup buffer
    const radBBuffer = createBuffer(width, height)
    const radBCtx = radBBuffer.getContext('2d')

    if (!radBCtx) {
      throw Error("Unable to get canvas context!")
    }

    const offsetX = (width * 0.831775) / 2

    // Background ellipse
    radBCtx.beginPath()
    radBCtx.arc(centerX, centerY, offsetX, 0, TWO_PI, true)
    radBCtx.closePath()

    switch (color.name) {
      case "CARBON":
      case "PUNCHED_SHEET":
      case "BRUSHED_METAL":
      case "BRUSHED_STAINLESS":
        drawTexture (radBCtx, color, width, height, centerX, centerY, offsetX)
        break
      
      case "STAINLESS":
        drawStainlessBackground(radBCtx, centerX, centerY, offsetX)
        break
      
      case "TURNED":
        drawStainlessBackground(radBCtx, centerX, centerY, offsetX)
        drawTurnedEffect(radBCtx, centerX, centerY, offsetX)
        break

      default:
        radBCtx.fillStyle = createLinearGradient(radBCtx, 0, width * 0.084112, 0, offsetX * 2, [
          { color: color.gradientStart.getRgbaColor(), offset: 0 },
          { color: color.gradientFraction.getRgbaColor(), offset: 0.4 },
          { color: color.gradientStop.getRgbaColor(), offset: 1 }
        ])
        radBCtx.fill()
    }

    // Inner shadow
    radBCtx.fillStyle = createRadialGradient(radBCtx, centerX, centerY, 0, offsetX, [
      { color: 'rgba(0, 0, 0, 0)', offset: 0 },
      { color: 'rgba(0, 0, 0, 0)', offset: 0.7 },
      { color: 'rgba(0, 0, 0, 0)', offset: 0.71 },
      { color: 'rgba(0, 0, 0, 0.03)', offset: 0.86 },
      { color: 'rgba(0, 0, 0, 0.07)', offset: 0.92 },
      { color: 'rgba(0, 0, 0, 0.15)', offset: 0.97 },
      { color: 'rgba(0, 0, 0, 0.3)', offset: 1 }
    ])

    radBCtx.beginPath()
    radBCtx.arc(centerX, centerY, offsetX, 0, TWO_PI, true)
    radBCtx.closePath()
    radBCtx.fill()

    // cache the buffer
    cache[CACHE_KEY] = radBBuffer
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
    // ctx.fillStyle = (ctx.createPattern(CarbonBuffer, 'repeat') as CanvasPattern)
    ctx.fillStyle = (ctx.createPattern(prepareTexture(CarbonTexture), 'repeat') as CanvasPattern)
    ctx.fill()
  } else if (color.name === 'PUNCHED_SHEET') {
    // ctx.fillStyle = (ctx.createPattern(PunchedSheetBuffer, 'repeat') as CanvasPattern)
    ctx.fillStyle = (ctx.createPattern(prepareTexture(PunchedSheetTexture), 'repeat') as CanvasPattern)
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
