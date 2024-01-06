import { BackgroundColorDef } from "../../model/BackgroundColorDef";
import { LabelNumberFormatDef } from "../../model/LabelNumberFormatDef";
import { GaugeTypeDef } from "../../model/GaugeTypeDef";
import { calcNiceNumber } from "../../helpers/common";

const MAX_MAJOR_TICKS_COUNT = 10;
const MAX_MINOR_TICKS_COUNT = 10;

interface Options {
  width?: number;
  height?: number;
  gaugeType: GaugeTypeDef;
  backgroundColor: BackgroundColorDef;
  labelFormat: LabelNumberFormatDef;
  minValue: number;
  maxValue: number;
  niceScale: boolean;
  vertical: boolean;
}

// TODO docs
export function drawLinearTickmarks(ctx: CanvasCtx, opt: Options) {
  const width = opt.width ?? ctx.canvas.width;
  const height = opt.height ?? ctx.canvas.height;

  // Parameters init
  opt.backgroundColor.labelColor.setAlpha(1);

  let majorTickSpacing = 10;
  let minorTickSpacing = 1;
  if (opt.niceScale) {
    const niceRange = calcNiceNumber(opt.maxValue - opt.minValue, false);
    majorTickSpacing = calcNiceNumber(niceRange / (MAX_MAJOR_TICKS_COUNT - 1), true);
    minorTickSpacing = calcNiceNumber(majorTickSpacing / (MAX_MINOR_TICKS_COUNT - 1), true);
  }

  // Ticks sizes
  const { minorTickStart, minorTickStop, mediumTickStart, mediumTickStop, majorTickStart, majorTickStop } =
    calcTicksSize(width, height, opt.vertical);

  const { scaleBoundsX, scaleBoundsY, scaleBoundsW, scaleBoundsH } = calcScaleBounds(
    width,
    height,
    opt.gaugeType,
    opt.vertical
  );

  const tickSpaceScaling = (opt.vertical ? scaleBoundsH : scaleBoundsW) / (opt.maxValue - opt.minValue);

  const TEXT_WIDTH = width * 0.1;

  ctx.save();

  // Init context
  ctx.textBaseline = "middle";
  ctx.textAlign = opt.vertical ? "right" : "center";

  ctx.strokeStyle = opt.backgroundColor.labelColor.getRgbaColor();
  ctx.fillStyle = opt.backgroundColor.labelColor.getRgbaColor();

  let valueCounter = opt.minValue;
  let majorTickCounter = MAX_MINOR_TICKS_COUNT - 1;
  let tickCounter;
  let currentPos;

  let i;
  // FIXME ridurre ad un solo indice (tickCounter)
  for (i = opt.minValue, tickCounter = 0; i <= opt.maxValue; i += minorTickSpacing, tickCounter += minorTickSpacing) {
    // Calculate the bounds of the scaling
    currentPos = opt.vertical
      ? scaleBoundsY + scaleBoundsH - tickCounter * tickSpaceScaling
      : scaleBoundsX + tickCounter * tickSpaceScaling;

    majorTickCounter++;

    // Draw tickmark every major tickmark spacing
    if (majorTickCounter === MAX_MINOR_TICKS_COUNT) {
      drawLinearTick(ctx, majorTickStart, majorTickStop, currentPos, 1.5, opt.vertical);

      // Draw the standard tickmark labels
      const labelPosX = opt.vertical ? width * 0.28 : currentPos;
      const labelPosY = opt.vertical ? currentPos : height * 0.73;
      drawLabel(ctx, valueCounter, labelPosX, labelPosY, TEXT_WIDTH, opt.labelFormat);

      valueCounter += majorTickSpacing;
      majorTickCounter = 0;
      continue;
    }

    // Draw tickmark every minor tickmark spacing
    if (MAX_MINOR_TICKS_COUNT % 2 === 0 && majorTickCounter === MAX_MINOR_TICKS_COUNT / 2) {
      drawLinearTick(ctx, mediumTickStart, mediumTickStop, currentPos, 1, opt.vertical);
    } else {
      drawLinearTick(ctx, minorTickStart, minorTickStop, currentPos, 0.5, opt.vertical);
    }
  }

  ctx.restore();
}

function calcTicksSize(width: number, height: number, vertical: boolean) {
  const minorTickStart = vertical ? width * 0.34 : height * 0.65;
  const minorTickStop = vertical ? width * 0.36 : height * 0.63;

  const mediumTickStart = vertical ? width * 0.33 : height * 0.66;
  const mediumTickStop = vertical ? width * 0.36 : height * 0.63;

  const majorTickStart = vertical ? width * 0.32 : height * 0.67;
  const majorTickStop = vertical ? width * 0.36 : height * 0.63;

  return {
    minorTickStart,
    minorTickStop,
    mediumTickStart,
    mediumTickStop,
    majorTickStart,
    majorTickStop,
  };
}

function calcScaleBounds(width: number, height: number, gaugeType: GaugeTypeDef, vertical: boolean) {
  const scaleBoundsX = vertical ? 0 : width * (gaugeType.type === "type2" ? 0.19857 : 0.142857);
  const scaleBoundsY = vertical ? height * 0.12864 : 0;
  const scaleBoundsW = vertical ? 0 : width * (gaugeType.type === "type2" ? 0.82 : 0.871012) - scaleBoundsX;
  const scaleBoundsH = vertical ? height * (gaugeType.type === "type2" ? 0.7475 : 0.856796) - scaleBoundsY : 0;

  return { scaleBoundsX, scaleBoundsY, scaleBoundsW, scaleBoundsH };
}

function drawLinearTick(
  ctx: CanvasCtx,
  tickStart: number,
  tickStop: number,
  currentPos: number,
  lineWidth: number,
  vertical: boolean
) {
  const startX = vertical ? tickStart : currentPos;
  const startY = vertical ? currentPos : tickStart;
  const stopX = vertical ? tickStop : currentPos;
  const stopY = vertical ? currentPos : tickStop;

  ctx.save();

  ctx.lineWidth = lineWidth;

  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(stopX, stopY);
  ctx.closePath();
  ctx.stroke();

  ctx.restore();
}

function drawLabel(
  ctx: CanvasCtx,
  value: number,
  posX: number,
  posY: number,
  textWidth: number,
  format: LabelNumberFormatDef
) {
  switch (format.format) {
    case "fractional":
      ctx.fillText(value.toFixed(2), posX, posY, textWidth);
      break;

    case "scientific":
      ctx.fillText(value.toPrecision(2), posX, posY, textWidth);
      break;

    case "standard":
    default:
      ctx.fillText(value.toFixed(0), posX, posY, textWidth);
      break;
  }
}
