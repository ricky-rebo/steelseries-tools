export interface DrawOptions {
  width?: number;
  height?: number;
  centerX?: number;
  centerY?: number;
}

export default abstract class FrameDesignModel {
  name: string;
  design: string;

  constructor(name: string) {
    this.name = name;
    this.design = name; // legacy
  }

  abstract draw(ctx: CanvasRenderingContext2D, options: DrawOptions): void;
}
