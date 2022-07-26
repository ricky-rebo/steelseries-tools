import { RgbaColor } from "./RgbaColor";

export class ColorDef {
  veryDark: RgbaColor;
  dark: RgbaColor;
  medium: RgbaColor;
  light: RgbaColor;
  lighter: RgbaColor;
  veryLight: RgbaColor;

  constructor(veryDark: RgbaColor, dark: RgbaColor, medium: RgbaColor, light: RgbaColor, lighter: RgbaColor, veryLight: RgbaColor) {
    this.veryDark = veryDark;
    this.dark = dark;
    this.medium = medium;
    this.light = light;
    this.lighter = lighter;
    this.veryLight = veryLight;
  }
}
