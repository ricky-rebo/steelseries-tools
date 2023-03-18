import { RgbaColor } from "./model/RgbaColor";

export { 
  drawLinearTickmarksImage,
  drawRadialTickmarksImage,
  drawTitleImage
} from "./functions/data-visualization/legacy";

export {
  createMeasuredValueImage,
  createThresholdImage,
  drawLinearIndicator,
  drawPointerImage,
} from "./functions/pointers/legacy";

export {
  drawBackground,
  drawForeground,
  drawFrame,
  drawRadialCustomImage,
  drawLinearBackgroundImage,
  drawLinearForegroundImage,
  drawLinearFrameImage,
} from "./functions/structure/legacy";

export { RgbaColor as rgbaColor } from "./model/RgbaColor";
export { Gradient as gradientWrapper } from "./model/Gradient";
export { Color as ColorDef } from "./enums/colors/Color";

export function setAlpha (hexString: string, alpha: number) {
  return RgbaColor.fromHexString(hexString, alpha).toRgbaString()
}
