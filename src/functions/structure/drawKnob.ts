import { createKnobImage } from './createKnobImage';
import { KnobStyleDef } from "../../model/KnobStyleDef";
import { KnobTypeDef } from "../../model/KnobTypeDef";
import { GaugeTypeDef } from '../../model/GaugeTypeDef';
import { OrientationDef } from '../../model/OrientationDef';
import { GaugeType } from '../../enums/types/GaugeType';
import { Orientation } from '../../enums/types/Orientation';

interface Options {
  type: KnobTypeDef,
  style: KnobStyleDef
  width?: number
  height?: number
  gaugeType?: GaugeTypeDef
  gaugeOrientation?: OrientationDef
}

// TODO docs
export function drawKnob (ctx: CanvasCtx, options: Options) {
  const width = options.width ?? ctx.canvas.width;
  const height = options.height ?? ctx.canvas.height;

  const knobSize = Math.ceil(height * 0.084112)
  let knobX = width * 0.5 - knobSize / 2
  let knobY = height * 0.5 - knobSize / 2
  const shadowOffset = width * 0.008

  const knobImage = createKnobImage(knobSize, options.type, options.style)

  // Edge Case
  if (options.gaugeType === GaugeType.TYPE5 && options.gaugeOrientation) {
    switch (options.gaugeOrientation) {
      case Orientation.WEST:
        knobX = width * 0.733644 - knobSize / 2;
        break;
      case Orientation.EAST:
        knobX = width * (1 - 0.733644) - knobSize / 2;
        break;
      default:
        knobY = height * 0.733644 - knobSize / 2;
    }
  } 

  ctx.save()

  // Set the pointer shadow params
  ctx.shadowColor = "rgba(0, 0, 0, 0.8)"
  ctx.shadowOffsetX = ctx.shadowOffsetY = shadowOffset
  ctx.shadowBlur = shadowOffset * 2

  ctx.drawImage(knobImage, knobX, knobY)

  ctx.restore()
}
