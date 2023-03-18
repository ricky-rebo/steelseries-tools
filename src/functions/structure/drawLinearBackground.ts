import { createCanvas, createLinearGradient } from 'canvas-drawing-tools'

import { CarbonBuffer } from '../../textures/CarbonBuffer'
import { PunchedSheetBuffer } from '../../textures/PunchedSheetBuffer'

// import CarbonTexture from '../../textures/carbon-texture.svg'
// import PunchedSheetTexture from '../../textures/punchedsheet-texture.svg'
// import { prepareTexture } from '../../helpers/common'

import { BrushedMetalTexture } from '../../textures/BrushedMetalTexture'
import { RgbaColor } from '../../model/RgbaColor'
import { ConicalGradient } from '../../model/ConicalGradient'
import { TWO_PI } from '../../shared'
import { BackgroundColorDef } from "../../model/BackgroundColorDef"
import { drawRoundedRectangle } from '../../helpers/misc'


const cache: CanvasCache = {}

interface Options {
  color: BackgroundColorDef
  width?: number
  height?: number
  vertical?: boolean
}

// TODO docs
export function drawLinearBackground (ctx: CanvasCtx, options: Options) {
  const width = options.width ?? ctx.canvas.width;
  const height = options.height ?? ctx.canvas.height;
  const vertical = options.vertical ?? (height > width);

  const CACHE_KEY = `${options.color.name}${width}${height}${vertical}`

  // check if we have already created and cached this buffer, if not create it
  if (!(CACHE_KEY in cache)) {
    
    // Setup buffer
    const buffer = createCanvas(width, height)
    const bufferCtx = buffer.getContext('2d')

    if (!bufferCtx) {
      throw Error("Unable to get canvas context!")
    }

    const frameWidth = Math.ceil(
      Math.min(
        Math.sqrt(width * width + height * height) * 0.04, 
        (vertical ? width : height) * 0.1
      )
    ) - 1

    const cornerRadius = Math.floor((vertical ? width : height) * 0.028571)

    bufferCtx.lineWidth = 0

    // 
    drawRoundedRectangle(bufferCtx, frameWidth, frameWidth, width - frameWidth * 2, height - frameWidth * 2, cornerRadius)

    // If the backgroundColor is a texture fill it with the texture instead of the gradient
    switch (options.color.name) {
      case "CARBON":
      case "PUNCHED_SHEET":
      case "BRUSHED_METAL":
      case "BRUSHED_STAINLESS":
        drawTextureBackground(bufferCtx, options.color, width, height, frameWidth, cornerRadius)
        break
      
      case "STAINLESS":
        drawStainlessBackground(bufferCtx, width, height, frameWidth)
        
        // Add an additional inner shadow to make the look more realistic
        bufferCtx.fillStyle = createLinearGradient(bufferCtx, frameWidth, frameWidth, width - frameWidth * 2, height - frameWidth * 2, [
          { color: 'rgba(0, 0, 0, 0.25)', offset: 0 },
          { color: 'rgba(0, 0, 0, 0)', offset: 0.5 },
          { color: 'rgba(0, 0, 0, 0.25)', offset: 1 },
        ])

        drawRoundedRectangle(
          bufferCtx,
          frameWidth,
          frameWidth,
          width - frameWidth * 2,
          height - frameWidth * 2,
          cornerRadius
        )
        bufferCtx.fill()
        break
      
      case "TURNED":
        drawStainlessBackground(bufferCtx, width, height, frameWidth)
        drawTurnedEffect(bufferCtx, width, height, frameWidth, cornerRadius)
        
        // Add an additional inner shadow to make the look more realistic
        bufferCtx.fillStyle = createLinearGradient(bufferCtx, frameWidth, frameWidth, width - frameWidth * 2, height - frameWidth * 2, [
          { color: 'rgba(0, 0, 0, 0.25)', offset: 0 },
          { color: 'rgba(0, 0, 0, 0)', offset: 0.5 },
          { color: 'rgba(0, 0, 0, 0.25)', offset: 1 },
        ])

        drawRoundedRectangle(
          bufferCtx,
          frameWidth,
          frameWidth,
          width - frameWidth * 2,
          height - frameWidth * 2,
          cornerRadius
        )
        bufferCtx.fill()
        break

      default:
        bufferCtx.fillStyle = createLinearGradient(bufferCtx, 0, frameWidth, 0, height - frameWidth * 2, [
          { color: options.color.gradientStart.toRgbaString(), offset: 0 },
          { color: options.color.gradientFraction.toRgbaString(), offset: 0.4 },
          { color: options.color.gradientStop.toRgbaString(), offset: 1 },
        ])
        bufferCtx.fill()
    }

    // Add a simple inner shadow
    drawInnerShadow(bufferCtx, width, height, frameWidth, cornerRadius)

    // cache the buffer
    cache[CACHE_KEY] = buffer
  }

  ctx.drawImage(cache[CACHE_KEY], 0, 0)
}

// Helpers

function drawTextureBackground (ctx: CanvasCtx, color: BackgroundColorDef, width: number, height: number, offset: number, cornerRadius: number) {
  if (color.name === 'CARBON') {
    ctx.fillStyle = (ctx.createPattern(CarbonBuffer, 'repeat') as CanvasPattern)
    // ctx.fillStyle = (ctx.createPattern(prepareTexture(CarbonTexture), 'repeat') as CanvasPattern)
    ctx.fill()
  }

   else if (color.name === 'PUNCHED_SHEET') {
    ctx.fillStyle = (ctx.createPattern(PunchedSheetBuffer, 'repeat') as CanvasPattern)
    // ctx.fillStyle = (ctx.createPattern(prepareTexture(PunchedSheetTexture), 'repeat') as CanvasPattern)
    ctx.fill()
  }

  // Add an additional inner shadow to make the look more realistic
  ctx.fillStyle = createLinearGradient(ctx, offset, offset, width - offset * 2, height - offset * 2, [
    { color: 'rgba(0, 0, 0, 0.25)', offset: 0 },
    { color: 'rgba(0, 0, 0, 0)', offset: 0.5 },
    { color: 'rgba(0, 0, 0, 0.25)', offset: 1 },
  ])

  drawRoundedRectangle(
    ctx,
    offset,
    offset,
    width - offset * 2,
    height - offset * 2,
    cornerRadius
  )
  ctx.fill()

  if (color.name === 'BRUSHED_METAL' || color.name === 'BRUSHED_STAINLESS') {
    // Apply BRUSHED effect
    const mono = (color.name === 'BRUSHED_METAL')
    const texture = new BrushedMetalTexture(color.gradientStop, 5, 0.1, mono, 0.5)
    
    ctx.fillStyle = (ctx.createPattern(texture.fill(0, 0, width, height), 'no-repeat') as CanvasPattern)
    ctx.fill()
  }
}

function drawStainlessBackground (ctx: CanvasCtx, width: number, height: number, offset: number) {
  // Define the fraction of the conical gradient paint
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

  // Set a clip as we will be drawing outside the required area
  ctx.clip()

  const grad = new ConicalGradient(fractions, colors)
  grad.fillRect(
    ctx,
    width / 2,
    height / 2,
    width - offset * 2,
    height - offset * 2,
    width / 2,
    height / 2
  )

  // Add an additional inner shadow to fade out brightness at the top
  ctx.fillStyle = createLinearGradient(ctx, 0, offset, 0, height - offset * 2, [
    { color: 'rgba(0, 0, 0, 0.25)', offset: 0 },
    { color: 'rgba(0, 0, 0, 0.05)', offset: 0.1 },
    { color: 'rgba(0, 0, 0, 0)', offset: 1 },
  ])
  ctx.fill()
}

function drawTurnedEffect (ctx: CanvasCtx, width: number, height: number, offset: number, cornerRadius: number) {
  // Define the turning radius
  const radius = Math.sqrt(
    (width - offset * 2) * (width - offset * 2) + 
    (height - offset * 2) * (height - offset * 2)
  ) / 2
  const turnRadius = radius * 0.55
  const centerX = width / 2
  const centerY = height / 2
  
  // Step size proporational to radius
  const stepSize = (TWO_PI / 360) * (400 / radius)

  // Save before we start
  ctx.save()

  // Set a clip as we will be drawing outside the required area
  drawRoundedRectangle(ctx, offset, offset, width - offset * 2, height - offset * 2, cornerRadius)
  ctx.clip()

  // set the style for the turnings
  ctx.lineWidth = 0.5

  const end = TWO_PI - stepSize * 0.3

  // Step the engine round'n'round
  for (let i = 0; i < end; i += stepSize) {
    // draw a 'turn'
    ctx.strokeStyle = 'rgba(240, 240, 255, 0.25)'
    ctx.beginPath()
    ctx.arc(centerX + turnRadius, centerY, turnRadius, 0, TWO_PI)
    ctx.stroke()

    // rotate the 'piece'
    ctx.translate(centerX, centerY)
    ctx.rotate(stepSize * 0.3)
    ctx.translate(-centerX, -centerY)

    // draw a 'turn'
    ctx.strokeStyle = 'rgba(25, 10, 10, 0.1)'
    ctx.beginPath()
    ctx.arc(centerX + turnRadius, centerY, turnRadius, 0, TWO_PI)
    ctx.stroke()
    ctx.translate(centerX, centerY)
    ctx.rotate(-stepSize * 0.3)
    ctx.translate(-centerX, -centerY)

    // rotate the 'piece'
    ctx.translate(centerX, centerY)
    ctx.rotate(stepSize)
    ctx.translate(-centerX, -centerY)
  }

  // Restore canvas now we are done
  ctx.restore()
}

function drawInnerShadow (ctx: CanvasCtx, width: number, height: number, frameWidth: number, cornerRadius: number) {
  const colors = [
    'rgba(0, 0, 0, 0.30)',
    'rgba(0, 0, 0, 0.20)',
    'rgba(0, 0, 0, 0.13)',
    'rgba(0, 0, 0, 0.09)',
    'rgba(0, 0, 0, 0.06)',
    'rgba(0, 0, 0, 0.04)',
    'rgba(0, 0, 0, 0.03)'
  ]

  colors.forEach((color, i) => {
    ctx.strokeStyle = color

    drawRoundedRectangle(
      ctx,
      frameWidth + i,
      frameWidth + i,
      width - frameWidth * 2 - 2 * i,
      height - frameWidth * 2 - 2 * i,
      cornerRadius
    )

    ctx.stroke()
  })
}
