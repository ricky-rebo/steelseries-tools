import { darker, getColorValues, lighter } from "../helpers/colors";
import { RgbaColor } from "./RgbaColor";

export class ColorDef {
  veryDark: RgbaColor;
  dark: RgbaColor;
  medium: RgbaColor;
  light: RgbaColor;
  lighter: RgbaColor;
  veryLight: RgbaColor;

  constructor(
    veryDark: RgbaColor,
    dark: RgbaColor,
    medium: RgbaColor,
    light: RgbaColor,
    lighter: RgbaColor,
    veryLight: RgbaColor
  ) {
    this.veryDark = veryDark;
    this.dark = dark;
    this.medium = medium;
    this.light = light;
    this.lighter = lighter;
    this.veryLight = veryLight;
  }

  static fromColorString(color: string) {
    const values = getColorValues(color);
    const rgbaCol = new RgbaColor(values[0], values[1], values[2], values[3]);

    return new ColorDef(
      darker(rgbaCol, 0.32),
      darker(rgbaCol, 0.62),
      rgbaCol,
      lighter(rgbaCol, 0.84),
      lighter(rgbaCol, 0.94),
      lighter(rgbaCol, 1)
    );
  }
}
