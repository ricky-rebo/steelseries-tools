import { createCanvas } from "canvas-drawing-tools";

import { LcdColorDef } from "../model/LcdColorDef";
import { drawRoundedRectangle } from "../helpers/misc";

const cache: CanvasCache = {};

// TODO docs
export function createLcdBackgroundImage(width: number, height: number, lcdColor: LcdColorDef) {
  const CACHE_KEY = width.toString() + height + JSON.stringify(lcdColor);

  // check if we have already created and cached this buffer, if not create it
  if (!(CACHE_KEY in cache)) {
    const lcdBuffer = createCanvas(width, height);
    const lcdCtx = lcdBuffer.getContext("2d");
    let grad;

    if (!lcdCtx) {
      throw Error("Unable to get canvas context!");
    }

    const bgStartX = 0;
    const bgStartY = 0;
    const bgWidth = width;
    const bgHeight = height;

    const fgStartX = 1;
    const fgStartY = 1;
    const fgWidth = width - 2;
    const fgHeight = height - 2;

    const bgRadius = Math.min(width, height) * 0.095;
    const fgRadius = bgRadius - 1;

    // background
    drawRoundedRectangle(lcdCtx, bgStartX, bgStartY, bgWidth, bgHeight, bgRadius);

    // TODO use createLinearGradient() helper
    grad = lcdCtx.createLinearGradient(0, bgStartY, 0, bgStartY + bgHeight);
    grad.addColorStop(0, "#4c4c4c");
    grad.addColorStop(0.08, "#666666");
    grad.addColorStop(0.92, "#666666");
    grad.addColorStop(1, "#e6e6e6");
    lcdCtx.fillStyle = grad;
    lcdCtx.fill();

    // foreground
    drawRoundedRectangle(lcdCtx, fgStartX, fgStartY, fgWidth, fgHeight, fgRadius);

    // TODO use createLinearGradient() helper
    grad = lcdCtx.createLinearGradient(0, fgStartY, 0, fgStartY + fgHeight);
    grad.addColorStop(0, lcdColor.gradientStartColor);
    grad.addColorStop(0.03, lcdColor.gradientFraction1Color);
    grad.addColorStop(0.49, lcdColor.gradientFraction2Color);
    grad.addColorStop(0.5, lcdColor.gradientFraction3Color);
    grad.addColorStop(1, lcdColor.gradientStopColor);
    lcdCtx.fillStyle = grad;
    lcdCtx.fill();

    // cache the buffer
    cache[CACHE_KEY] = lcdBuffer;
  }

  return cache[CACHE_KEY];
}

export default createLcdBackgroundImage;
