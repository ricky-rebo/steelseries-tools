import { BackgroundColorDef } from "../../model/BackgroundColorDef";
import { ForegroundTypeDef } from "../../model/ForegroundTypeDef";
import { FrameDesignDef } from "../../model/FrameDesignDef";
import { GaugeTypeDef } from "../../model/GaugeTypeDef";
import { KnobStyleDef } from "../../model/KnobStyleDef";
import { KnobTypeDef } from "../../model/KnobTypeDef";
import { OrientationDef } from "../../model/OrientationDef";

import { drawBackground as NEW__drawBackground } from "./drawBackground";
import { drawCustomLayer } from "./drawCustomLayer";
import { drawForeground as NEW__drawForeground } from "./drawForeground";
import { drawFrame as NEW__drawFrame } from "./drawFrame";
import { drawKnob } from "./drawKnob";
import { drawLinearBackground } from "./drawLinearBackground";
import { drawLinearForeground } from "./drawLinearForeground";
import { drawLinearFrame } from "./drawLinearFrame";

export function drawBackground(
  ctx: CanvasRenderingContext2D,
  color: BackgroundColorDef,
  centerX: number,
  centerY: number,
  width: number,
  height: number
) {
  console.warn("[DEPRECATED] OLD__drawBackground() use is deprecated!");
  NEW__drawBackground(ctx, { color, width, height, centerX, centerY });
}

export function drawForeground(
  ctx: CanvasRenderingContext2D,
  type: ForegroundTypeDef,
  width: number,
  height: number,
  withCenterKnob = false,
  knob?: KnobTypeDef,
  style?: KnobStyleDef,
  gaugeType?: GaugeTypeDef,
  gaugeOrientation?: OrientationDef
) {
  console.warn("[DEPRECATED] OLD__drawForeground() use is deprecated!");
  NEW__drawForeground(ctx, { type, width, height });

  if (withCenterKnob && knob && style) {
    drawKnob(ctx, { type: knob, style, width, height, gaugeType, gaugeOrientation });
  }
}

export function drawFrame(
  ctx: CanvasRenderingContext2D,
  design: FrameDesignDef,
  centerX: number,
  centerY: number,
  width: number,
  height: number
) {
  console.warn("[DEPRECATED] OLD__drawFrame() use is deprecated!");
  NEW__drawFrame(ctx, { design, width, height, centerX, centerY });
}

export function drawRadialCustomImage(
  ctx: CanvasRenderingContext2D,
  img: CanvasImageSource,
  _centerX: number,
  _centerY: number,
  _imageWidth: number,
  _imageHeight: number
) {
  console.warn("[DEPRECATED] OLD__drawRadialCustomImage() use is deprecated!");
  drawCustomLayer(ctx, img);
}

export function drawLinearBackgroundImage(
  ctx: CanvasRenderingContext2D,
  color: BackgroundColorDef,
  width: number,
  height: number,
  vertical: boolean
) {
  console.warn("[DEPRECATED] OLD__drawLinearBackgroundImage() use is deprecated!");
  drawLinearBackground(ctx, { color, width, height, vertical });
}

export function drawLinearForegroundImage(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  vertical: boolean
) {
  console.warn("[DEPRECATED] OLD__drawLinearForegroundImage() use is deprecated!");
  drawLinearForeground(ctx, { width, height, vertical });
}

export function drawLinearFrameImage(
  ctx: CanvasRenderingContext2D,
  design: FrameDesignDef,
  width: number,
  height: number,
  vertical: boolean
) {
  console.warn("[DEPRECATED] OLD__drawLinearFrameImage() use is deprecated!");
  drawLinearFrame(ctx, { design, width, height, vertical });
}
