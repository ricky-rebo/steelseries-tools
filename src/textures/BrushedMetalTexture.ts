import { createCanvas } from "canvas-drawing-tools";

import { range } from "../helpers/common";
import { PI } from "../shared";
import { RgbaColor } from "../model/RgbaColor";

// TODO docs
export class BrushedMetalTexture {
  #color: RgbaColor;
  #radius: number;
  #variation: number;
  #monochrome: boolean;
  #shine: number;

  constructor(color: RgbaColor, radius: number, amount: number, monochrome: boolean, shine: number) {
    this.#color = color;
    this.#radius = radius;
    this.#variation = amount * 255;
    this.#monochrome = monochrome;
    this.#shine = shine;
  }

  #random(x: number, variation: number) {
    x += ((2 * Math.random() - 1) * variation) | 0;
    return this.#clamp(x);
  }

  #clamp(val: number) {
    return range(val, 255);
  }

  #createSinValues(width: number) {
    let sinArr: number[] = [];

    for (let i = 0; i < width; i++) {
      if (this.#shine !== 0) {
        sinArr[i] = (255 * this.#shine * Math.sin((i / width) * PI)) | 0;
      } else {
        sinArr[i] = 0;
      }
    }

    return sinArr;
  }

  #calcPixels(ctx: CanvasRenderingContext2D, width: number, height: number, alpha: number) {
    // Create pixel arrays
    const inPixels = ctx.createImageData(width, height);
    // const outPixels = ctx.createImageData(width, height)

    // Precreate sin() values
    const sinArr = this.#createSinValues(width);

    let indx,
      n = 0;
    let tr, tg, tb;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        indx = y * width * 4 + x * 4;
        tr = this.#color.getRed() + sinArr[x];
        tg = this.#color.getGreen() + sinArr[x];
        tb = this.#color.getBlue() + sinArr[x];

        n = ((2 * Math.random() - 1) * this.#variation) | 0;
        inPixels.data[indx] = this.#monochrome ? this.#clamp(tr + n) : this.#random(tr, this.#variation);
        inPixels.data[indx + 1] = this.#monochrome ? this.#clamp(tg + n) : this.#random(tg, this.#variation);
        inPixels.data[indx + 2] = this.#monochrome ? this.#clamp(tb + n) : this.#random(tb, this.#variation);
        inPixels.data[indx + 3] = alpha;
      }
    }

    return inPixels;
  }

  #horizontalBlur(inPix: ImageData, outPix: ImageData, width: number, height: number, radius: number, alpha: number) {
    let i;
    let totR;
    let totG;
    let totB;

    if (radius >= width) {
      radius = width - 1;
    }

    const mul = 1 / (radius * 2 + 1);

    let indx = 0;
    for (let y = 0; y < height; y++) {
      totR = totG = totB = 0;

      for (let x = 0; x < radius; x++) {
        i = (indx + x) * 4;
        totR += inPix.data[i];
        totG += inPix.data[i + 1];
        totB += inPix.data[i + 2];
      }

      for (let x = 0; x < width; x++) {
        if (x > radius) {
          i = (indx - radius - 1) * 4;
          totR -= inPix.data[i];
          totG -= inPix.data[i + 1];
          totB -= inPix.data[i + 2];
        }

        if (x + radius < width) {
          i = (indx + radius) * 4;
          totR += inPix.data[i];
          totG += inPix.data[i + 1];
          totB += inPix.data[i + 2];
        }

        i = indx * 4;
        outPix.data[i] = (totR * mul) | 0;
        outPix.data[i + 1] = (totG * mul) | 0;
        outPix.data[i + 2] = (totB * mul) | 0;
        outPix.data[i + 3] = alpha;
        indx++;
      }
    }
  }

  fill(startX: number, startY: number, endX: number, endY: number) {
    startX = Math.floor(startX);
    startY = Math.floor(startY);
    endX = Math.ceil(endX);
    endY = Math.ceil(endY);

    const width = endX - startX;
    const height = endY - startY;

    // Create output canvas
    const outCanvas = createCanvas(width, height);
    const outCanvasContext = outCanvas.getContext("2d");

    // ERROR CHECK
    if (!outCanvasContext) {
      throw Error("Unable to get canvas context");
    }

    const alpha = 255;

    // Create pixel array
    const inPixels = this.#calcPixels(outCanvasContext, width, height, alpha);

    if (this.#radius > 0) {
      const outPixels = outCanvasContext.createImageData(width, height);
      this.#horizontalBlur(inPixels, outPixels, width, height, this.#radius, alpha);
      outCanvasContext.putImageData(outPixels, startX, startY);
    } else {
      outCanvasContext.putImageData(inPixels, startX, startY);
    }

    return outCanvas;
  }
}
