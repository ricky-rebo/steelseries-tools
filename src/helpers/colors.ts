import { RgbaColor } from "../model/RgbaColor";

const INT_TO_FLOAT = 1 / 255;

export function getRawColorFromFraction(fromColor: RgbaColor, toColor: RgbaColor, range: number, fraction: number) {
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
