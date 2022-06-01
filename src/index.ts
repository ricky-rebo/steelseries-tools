export const sum = (a: number, b: number) => {
  if ('development' === process.env.NODE_ENV) {
    console.log('boop')
  }
  return a + b;
}

// Main radial structure
export { drawFrame } from "./draw/drawFrame"
export { drawBackground } from "./draw/drawBackground";
export { drawForeground } from "./draw/drawForeground"

export { drawTickmarks } from "./draw/drawTickmarks";
export { drawTickmarkLables } from "./draw/drawTickmarkLables";

export { BackgroundColor } from "./customization/colors";

export {
  FrameDesign,
  ForegroundType,
  GaugeType,
  LabelNumberFormat,
  TickLabelOrientation
} from "./customization/types"
