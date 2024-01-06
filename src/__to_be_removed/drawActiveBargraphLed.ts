import { ColorDef } from "../model/ColorDef";
import { createRadialGradient } from "../helpers/gradients";

// TODO docs
export function drawActiveBargraphLed(ctx: CanvasCtx, color: ColorDef, mainCtx: CanvasCtx, vertical: boolean) {
  const centerX = ctx.canvas.width / 2;
  const centerY = ctx.canvas.height / 2;
  const outerRadius = vertical ? centerX : centerY;

  ctx.save();

  ctx.fillStyle = createRadialGradient(mainCtx, centerX, centerY, 0, outerRadius, [
    { offset: 0, color: color.light.getRgbaColor() },
    { offset: 1, color: color.dark.getRgbaColor() },
  ]);

  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.restore();
}
