import { createCanvas } from "canvas-drawing-tools";

import { LedColorDef } from "../model/LedColorDef";
import { TrendStateDef } from "../model/TrendStateDef";
import { hexToRgba } from "../helpers/colors";
import { TWO_PI } from "../shared";
import { createLinearGradient, createRadialGradient } from "../helpers/gradients";

const cache: CanvasCache = {};

// TODO docs
export function createTrendIndicator(width: number, trendState: TrendStateDef, colors: LedColorDef[]) {
  const CACHE_KEY = trendState.state + width + JSON.stringify(colors);

  // Check if we have already cached this indicator, if not create it
  if (!(CACHE_KEY in cache)) {
    const height = width * 2;

    // create oversized buffer for the glow
    const trendBuffer = createCanvas(width * 2, width * 4);
    const trendCtx = trendBuffer.getContext("2d");

    if (!trendCtx) {
      throw Error("Unable to get canvas context!");
    }

    trendCtx.translate(width * 0.5, width * 0.5);

    // Must draw the active section last so the 'glow' is on top
    switch (trendState.state) {
      case "up":
        drawDownArrow(trendCtx, width, height, colors[2], false);
        drawEquals(trendCtx, width, height, colors[1], false);
        drawUpArrow(trendCtx, width, height, colors[0], true);
        break;
      case "steady":
        drawDownArrow(trendCtx, width, height, colors[2], false);
        drawUpArrow(trendCtx, width, height, colors[0], false);
        drawEquals(trendCtx, width, height, colors[1], true);
        break;
      case "down":
      default:
        drawUpArrow(trendCtx, width, height, colors[0], false);
        drawEquals(trendCtx, width, height, colors[1], false);
        drawDownArrow(trendCtx, width, height, colors[2], true);
        break;
    }

    // cache the buffer
    cache[CACHE_KEY] = trendBuffer;
  }
  return cache[CACHE_KEY];
}

/* ***** DRAW FUNCTIONS ***** */

function drawUpArrow(ctx: CanvasRenderingContext2D, width: number, height: number, color: LedColorDef, on: boolean) {
  let fill;
  if (on) {
    fill = createRadialGradient(ctx, 0.5 * width, 0.2 * height, 0, 0.5 * width, [
      { color: color.innerColor1_ON, offset: 0 },
      { color: color.innerColor2_ON, offset: 0.2 },
      { color: color.outerColor_ON, offset: 1 },
    ]);
  } else {
    fill = createLinearGradient(ctx, 0, 0, 0, 0.5 * height, [
      { color: "#323232", offset: 0 },
      { color: "#5c5c5c", offset: 1 },
    ]);
  }
  ctx.fillStyle = fill;

  ctx.beginPath();
  ctx.moveTo(0.5 * width, 0);
  ctx.lineTo(width, 0.2 * height);
  ctx.lineTo(0.752 * width, 0.2 * height);
  ctx.lineTo(0.752 * width, 0.37 * height);
  ctx.lineTo(0.252 * width, 0.37 * height);
  ctx.lineTo(0.252 * width, 0.2 * height);
  ctx.lineTo(0, 0.2 * height);
  ctx.closePath();
  ctx.fill();

  if (!on) {
    // Inner shadow
    ctx.strokeStyle = "rgba(0, 0, 0, 0.4)";

    ctx.beginPath();
    ctx.moveTo(0, 0.2 * height);
    ctx.lineTo(0.5 * width, 0);
    ctx.lineTo(width, 0.2 * height);
    ctx.moveTo(0.252 * width, 0.2 * height);
    ctx.lineTo(0.252 * width, 0.37 * height);
    ctx.stroke();

    // Inner highlight
    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";

    ctx.beginPath();
    ctx.moveTo(0.252 * width, 0.37 * height);
    ctx.lineTo(0.752 * width, 0.37 * height);
    ctx.lineTo(0.752 * width, 0.2 * height);
    ctx.lineTo(width, 0.2 * height);
    ctx.stroke();
  } else {
    // draw halo
    ctx.fillStyle = createRadialGradient(ctx, 0.5 * width, 0.2 * height, 0, 0.7 * width, [
      { color: hexToRgba(color.coronaColor, 0), offset: 0 },
      { color: hexToRgba(color.coronaColor, 0.3), offset: 0.5 },
      { color: hexToRgba(color.coronaColor, 0.2), offset: 0.7 },
      { color: hexToRgba(color.coronaColor, 0.1), offset: 0.8 },
      { color: hexToRgba(color.coronaColor, 0.05), offset: 0.85 },
      { color: hexToRgba(color.coronaColor, 0), offset: 1 },
    ]);

    ctx.beginPath();
    ctx.arc(0.5 * width, 0.2 * height, 0.7 * width, 0, TWO_PI, true);
    ctx.closePath();
    ctx.fill();
  }
}

function drawEquals(ctx: CanvasRenderingContext2D, width: number, height: number, color: LedColorDef, on: boolean) {
  if (on) {
    ctx.rect(0.128 * width, 0.41 * height, 0.744 * width, 0.074 * height);
    ctx.rect(0.128 * width, 0.516 * height, 0.744 * width, 0.074 * height);
    ctx.closePath();

    ctx.fillStyle = color.outerColor_ON;
    ctx.fill();
  } else {
    ctx.fillStyle = createLinearGradient(ctx, 0, 0.41 * height, 0, 0.41 * height + 0.074 * height, [
      { color: "#323232", offset: 0 },
      { color: "#5c5c5c", offset: 1 },
    ]);

    ctx.beginPath();
    ctx.rect(0.128 * width, 0.41 * height, 0.744 * width, 0.074 * height);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = createLinearGradient(ctx, 0, 0.516 * height, 0, 0.516 * height + 0.074 * height, [
      { color: "#323232", offset: 0 },
      { color: "#5c5c5c", offset: 1 },
    ]);

    ctx.rect(0.128 * width, 0.516 * height, 0.744 * width, 0.074 * height);
    ctx.closePath();
    ctx.fill();
  }

  if (!on) {
    // inner shadow
    ctx.beginPath();
    ctx.moveTo(0.128 * width, 0.41 * height + 0.074 * height);
    ctx.lineTo(0.128 * width, 0.41 * height);
    ctx.lineTo(0.128 * width + 0.744 * width, 0.41 * height);
    ctx.stroke();

    ctx.strokeStyle = "rgba(0, 0, 0, 0.4)";

    ctx.beginPath();
    ctx.moveTo(0.128 * width, 0.516 * height + 0.074 * height);
    ctx.lineTo(0.128 * width, 0.516 * height);
    ctx.lineTo(0.128 * width + 0.744 * width, 0.516 * height);
    ctx.stroke();

    // inner highlight
    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";

    ctx.beginPath();
    ctx.moveTo(0.128 * width + 0.744 * width, 0.41 * height);
    ctx.lineTo(0.128 * width + 0.744 * width, 0.41 * height + 0.074 * height);
    ctx.lineTo(0.128 * width, 0.41 * height + 0.074 * height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0.128 * width + 0.744 * width, 0.516 * height);
    ctx.lineTo(0.128 * width + 0.744 * width, 0.516 * height + 0.074 * height);
    ctx.lineTo(0.128 * width, 0.516 * height + 0.074 * height);
    ctx.stroke();
  } else {
    ctx.fillStyle = createRadialGradient(ctx, 0.5 * width, 0.5 * height, 0, 0.7 * width, [
      { color: hexToRgba(color.coronaColor, 0), offset: 0 },
      { color: hexToRgba(color.coronaColor, 0.3), offset: 0.5 },
      { color: hexToRgba(color.coronaColor, 0.2), offset: 0.7 },
      { color: hexToRgba(color.coronaColor, 0.1), offset: 0.8 },
      { color: hexToRgba(color.coronaColor, 0.05), offset: 0.85 },
      { color: hexToRgba(color.coronaColor, 0), offset: 1 },
    ]);

    ctx.beginPath();
    ctx.arc(0.5 * width, 0.5 * height, 0.7 * width, 0, TWO_PI, true);
    ctx.closePath();
    ctx.fill();
  }
}

function drawDownArrow(ctx: CanvasRenderingContext2D, width: number, height: number, color: LedColorDef, on: boolean) {
  let fill;
  if (on) {
    fill = createRadialGradient(ctx, 0.5 * width, 0.8 * height, 0, 0.5 * width, [
      { color: color.innerColor1_ON, offset: 0 },
      { color: color.innerColor2_ON, offset: 0.2 },
      { color: color.outerColor_ON, offset: 1 },
    ]);
  } else {
    fill = createLinearGradient(ctx, 0, 0.63 * height, 0, height, [
      { color: "#323232", offset: 0 },
      { color: "#5c5c5c", offset: 1 },
    ]);
  }
  ctx.fillStyle = fill;

  ctx.beginPath();
  ctx.moveTo(0.5 * width, height);
  ctx.lineTo(width, 0.8 * height);
  ctx.lineTo(0.725 * width, 0.8 * height);
  ctx.lineTo(0.725 * width, 0.63 * height);
  ctx.lineTo(0.252 * width, 0.63 * height);
  ctx.lineTo(0.252 * width, 0.8 * height);
  ctx.lineTo(0, 0.8 * height);
  ctx.closePath();
  ctx.fill();

  if (!on) {
    // Inner shadow
    ctx.strokeStyle = "rgba(0, 0, 0, 0.4)";

    ctx.beginPath();
    ctx.moveTo(0, 0.8 * height);
    ctx.lineTo(0.252 * width, 0.8 * height);
    ctx.moveTo(0.252 * width, 0.63 * height);
    ctx.lineTo(0.752 * width, 0.63 * height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0.752 * width, 0.8 * height);
    ctx.lineTo(width, 0.8 * height);
    ctx.stroke();

    // Inner highlight
    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";

    ctx.beginPath();
    ctx.moveTo(0, 0.8 * height);
    ctx.lineTo(0.5 * width, height);
    ctx.lineTo(width, 0.8 * height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0.752 * width, 0.8 * height);
    ctx.lineTo(0.752 * width, 0.63 * height);
    ctx.stroke();
  } else {
    // draw halo
    ctx.fillStyle = createRadialGradient(ctx, 0.5 * width, 0.8 * height, 0, 0.7 * width, [
      { color: hexToRgba(color.coronaColor, 0), offset: 0 },
      { color: hexToRgba(color.coronaColor, 0.3), offset: 0.5 },
      { color: hexToRgba(color.coronaColor, 0.2), offset: 0.7 },
      { color: hexToRgba(color.coronaColor, 0.1), offset: 0.8 },
      { color: hexToRgba(color.coronaColor, 0.05), offset: 0.85 },
      { color: hexToRgba(color.coronaColor, 0), offset: 1 },
    ]);

    ctx.beginPath();
    ctx.arc(0.5 * width, 0.8 * height, 0.7 * width, 0, TWO_PI, true);
    ctx.closePath();
    ctx.fill();
  }
}
