import { RgbaColor } from "./RgbaColor";

export class BackgroundColorDef {
  gradientStart: RgbaColor;
  gradientFraction: RgbaColor;
  gradientStop: RgbaColor;
  labelColor: RgbaColor;
  symbolColor: RgbaColor;
  name: string;

  constructor(
    gradStart: RgbaColor,
    gradFraction: RgbaColor,
    gradStop: RgbaColor,
    labelColor: RgbaColor,
    symbolColor: RgbaColor,
    name: string
  ) {
    this.gradientStart = gradStart;
    this.gradientFraction = gradFraction;
    this.gradientStop = gradStop;
    this.labelColor = labelColor;
    this.symbolColor = symbolColor;
    this.name = name;
  }
}
