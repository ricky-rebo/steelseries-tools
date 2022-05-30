export const sum = (a: number, b: number) => {
  if ('development' === process.env.NODE_ENV) {
    console.log('boop')
  }
  return a + b;
}

export { drawFrame } from "./draw/drawFrame"
export { drawForeground } from "./draw/drawForeground"

export {
  FrameDesign,
  ForegroundType
} from "./customization/types"
