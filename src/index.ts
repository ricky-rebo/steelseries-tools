export const sum = (a: number, b: number) => {
  if ('development' === process.env.NODE_ENV) {
    console.log('boop')
  }
  return a + b;
}

export { drawFrame } from "./draw/drawFrame";
export { FrameDesign } from "./customization/types";
