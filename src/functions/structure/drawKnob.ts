import { createKnobImage } from './createKnobImage';
import { KnobStyleDef } from "../../model/KnobStyleDef";
import { KnobTypeDef } from "../../model/KnobTypeDef";

// TODO docs
export function drawKnob (ctx: CanvasCtx, type: KnobTypeDef, style: KnobStyleDef, width = ctx.canvas.width, height = ctx.canvas.height) {
  const knobSize = Math.ceil(height * 0.084112)
  const knobX = width * 0.5 - knobSize / 2
  const knobY = height * 0.5 - knobSize / 2
  const shadowOffset = width * 0.008

  const knobImage = createKnobImage(knobSize, type, style)

  ctx.save()

  // Set the pointer shadow params
  ctx.shadowColor = "rgba(0, 0, 0, 0.8)"
  ctx.shadowOffsetX = ctx.shadowOffsetY = shadowOffset
  ctx.shadowBlur = shadowOffset * 2

  ctx.drawImage(knobImage, knobX, knobY)

  ctx.restore()
}
