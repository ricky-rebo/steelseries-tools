import { drawToCanvas } from "canvas-drawing-tools";

import { RgbaColor } from "../model/RgbaColor";
import { range } from "./common";

const INT_TO_FLOAT = 1 / 255;

export function getRawColorFromFraction(fromColor: RgbaColor, toColor: RgbaColor, range: number, fraction: number): RawColorData {
  const sourceRed = fromColor.getRed();
  const sourceGreen = fromColor.getGreen();
  const sourceBlue = fromColor.getBlue();
  const sourceAlpha = fromColor.getAlpha();

  const deltaRed = toColor.getRed() - sourceRed;
  const deltaGreen = toColor.getGreen() - sourceGreen;
  const deltaBlue = toColor.getBlue() - sourceBlue;
  const deltaAlpha = toColor.getAlpha() * INT_TO_FLOAT - sourceAlpha * INT_TO_FLOAT;

  const fractionRed = (deltaRed / range) * fraction;
  const fractionGreen = (deltaGreen / range) * fraction;
  const fractionBlue = (deltaBlue / range) * fraction;
  const fractionAlpha = (deltaAlpha / range) * fraction;

  return [
    parseInt((sourceRed + fractionRed).toFixed(0)),
    parseInt((sourceGreen + fractionGreen).toFixed(0)),
    parseInt((sourceBlue + fractionBlue).toFixed(0)),
    sourceAlpha + fractionAlpha
  ];
}

export function getColorFromFraction(fromColor: RgbaColor, toColor: RgbaColor, range: number, fraction: number) {
  return RgbaColor.fromRawColor(getRawColorFromFraction(fromColor, toColor, range, fraction));
}

export function hexToRgba (hexString: string, alpha: number) {
  return RgbaColor.fromHexString(hexString, alpha).toRgbaString()
}

export function getColorValues (color: string): [number, number, number, number] {
  const lookupBuffer = drawToCanvas(1, 1, function (ctx) {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.rect(0, 0, 1, 1)
    ctx.fill()
  })

  const colorData = lookupBuffer.getContext('2d')!.getImageData(0, 0, 2, 2).data

  return [colorData[0], colorData[1], colorData[2], colorData[3]]
}

export function darker (color: RgbaColor, fraction: number) {
  let red = Math.floor(color.getRed() * (1 - fraction))
  let green = Math.floor(color.getGreen() * (1 - fraction))
  let blue = Math.floor(color.getBlue() * (1 - fraction))

  red = range(red, 255)
  green = range(green, 255)
  blue = range(blue, 255)

  return new RgbaColor(red, green, blue, color.getAlpha())
}

export function lighter (color: RgbaColor, fraction: number) {
  let red = Math.round(color.getRed() * (1 + fraction))
  let green = Math.round(color.getGreen() * (1 + fraction))
  let blue = Math.round(color.getBlue() * (1 + fraction))

  red = range(red, 255)
  green = range(green, 255)
  blue = range(blue, 255)

  return new RgbaColor(red, green, blue, color.getAlpha())
}
