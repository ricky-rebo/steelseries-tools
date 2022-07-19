import { createKnobImage } from '../create/createKnobImage';
import { KnobStyleDef, KnobTypeDef } from '../customization/type-descriptors';
import { TWO_PI } from "../utils/constants";

// TODO doocs
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


/* Internal draw functions */

export function drawStandardKnobImage(ctx: CanvasRenderingContext2D, size: number, knobStyle: KnobStyleDef) {
  const maxPostCenterX = size / 2;
  const maxPostCenterY = size / 2;
  let grad;

  ctx.beginPath();
  ctx.arc(maxPostCenterX, maxPostCenterY, size / 2, 0, TWO_PI, true);
  ctx.closePath();

  grad = ctx.createLinearGradient(0, 0, 0, size);
  grad.addColorStop(0, 'rgb(180, 180, 180)');
  grad.addColorStop(0.46, 'rgb(63, 63, 63)');
  grad.addColorStop(1, 'rgb(40, 40, 40)');
  ctx.fillStyle = grad;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(maxPostCenterX, maxPostCenterY, (size * 0.77) / 2, 0, TWO_PI, true);
  ctx.closePath();

  grad = ctx.createLinearGradient(0, size - size * 0.77, 0, size - size * 0.77 + size * 0.77);
  switch (knobStyle.style) {
    case 'black':
      grad.addColorStop(0, 'rgb(191, 191, 191)');
      grad.addColorStop(0.5, 'rgb(45, 44, 49)');
      grad.addColorStop(1, 'rgb(125, 126, 128)');
      break;

    case 'brass':
      grad.addColorStop(0, 'rgb(223, 208, 174)');
      grad.addColorStop(0.5, 'rgb(123, 95, 63)');
      grad.addColorStop(1, 'rgb(207, 190, 157)');
      break;

    case 'silver':
    /* falls through */
    default:
      grad.addColorStop(0, 'rgb(215, 215, 215)');
      grad.addColorStop(0.5, 'rgb(116, 116, 116)');
      grad.addColorStop(1, 'rgb(215, 215, 215)');
      break;
  }
  ctx.fillStyle = grad;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(maxPostCenterX, maxPostCenterY, (size * 0.77) / 2, 0, TWO_PI, true);
  ctx.closePath();

  grad = ctx.createRadialGradient(maxPostCenterX, maxPostCenterY, 0, maxPostCenterX, maxPostCenterY, (size * 0.77) / 2);
  grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
  grad.addColorStop(0.75, 'rgba(0, 0, 0, 0)');
  grad.addColorStop(0.76, 'rgba(0, 0, 0, 0.01)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0.2)');
  ctx.fillStyle = grad;
  ctx.fill();
}

export function drawMetalKnobImage(ctx: CanvasRenderingContext2D, size: number, knobStyle: KnobStyleDef) {
  let grad;

  // METALKNOB_FRAME
  ctx.beginPath();
  ctx.moveTo(0, size * 0.5);
  ctx.bezierCurveTo(0, size * 0.222222, size * 0.222222, 0, size * 0.5, 0);
  ctx.bezierCurveTo(size * 0.777777, 0, size, size * 0.222222, size, size * 0.5);
  ctx.bezierCurveTo(size, size * 0.777777, size * 0.777777, size, size * 0.5, size);
  ctx.bezierCurveTo(size * 0.222222, size, 0, size * 0.777777, 0, size * 0.5);
  ctx.closePath();

  grad = ctx.createLinearGradient(0, 0, 0, size);
  grad.addColorStop(0, 'rgb(92, 95, 101)');
  grad.addColorStop(0.47, 'rgb(46, 49, 53)');
  grad.addColorStop(1, 'rgb(22, 23, 26)');

  ctx.fillStyle = grad;
  ctx.fill();

  // METALKNOB_MAIN
  ctx.beginPath();
  ctx.moveTo(size * 0.055555, size * 0.5);
  ctx.bezierCurveTo(size * 0.055555, size * 0.277777, size * 0.277777, size * 0.055555, size * 0.5, size * 0.055555);
  ctx.bezierCurveTo(size * 0.722222, size * 0.055555, size * 0.944444, size * 0.277777, size * 0.944444, size * 0.5);
  ctx.bezierCurveTo(size * 0.944444, size * 0.722222, size * 0.722222, size * 0.944444, size * 0.5, size * 0.944444);
  ctx.bezierCurveTo(size * 0.277777, size * 0.944444, size * 0.055555, size * 0.722222, size * 0.055555, size * 0.5);
  ctx.closePath();

  grad = ctx.createLinearGradient(0, 0.055555 * size, 0, 0.944443 * size);
  switch (knobStyle.style) {
    case 'black':
      grad.addColorStop(0, 'rgb(43, 42, 47)');
      grad.addColorStop(1, 'rgb(26, 27, 32)');
      break;

    case 'brass':
      grad.addColorStop(0, 'rgb(150, 110, 54)');
      grad.addColorStop(1, 'rgb(124, 95, 61)');
      break;

    case 'silver':
    /* falls through */
    default:
      grad.addColorStop(0, 'rgb(204, 204, 204)');
      grad.addColorStop(1, 'rgb(87, 92, 98)');
      break;
  }
  ctx.fillStyle = grad;
  ctx.fill();

  // METALKNOB_LOWERHL
  ctx.beginPath();
  ctx.moveTo(size * 0.777777, size * 0.833333);
  ctx.bezierCurveTo(size * 0.722222, size * 0.722222, size * 0.611111, size * 0.666666, size * 0.5, size * 0.666666);
  ctx.bezierCurveTo(size * 0.388888, size * 0.666666, size * 0.277777, size * 0.722222, size * 0.222222, size * 0.833333);
  ctx.bezierCurveTo(size * 0.277777, size * 0.888888, size * 0.388888, size * 0.944444, size * 0.5, size * 0.944444);
  ctx.bezierCurveTo(size * 0.611111, size * 0.944444, size * 0.722222, size * 0.888888, size * 0.777777, size * 0.833333);
  ctx.closePath();

  grad = ctx.createRadialGradient(0.555555 * size, 0.944444 * size, 0, 0.555555 * size, 0.944444 * size, 0.388888 * size);
  grad.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
  grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = grad;
  ctx.fill();

  // METALKNOB_UPPERHL
  ctx.beginPath();
  ctx.moveTo(size * 0.944444, size * 0.277777);
  ctx.bezierCurveTo(size * 0.833333, size * 0.111111, size * 0.666666, 0, size * 0.5, 0);
  ctx.bezierCurveTo(size * 0.333333, 0, size * 0.166666, size * 0.111111, size * 0.055555, size * 0.277777);
  ctx.bezierCurveTo(size * 0.166666, size * 0.333333, size * 0.333333, size * 0.388888, size * 0.5, size * 0.388888);
  ctx.bezierCurveTo(size * 0.666666, size * 0.388888, size * 0.833333, size * 0.333333, size * 0.944444, size * 0.277777);
  ctx.closePath();

  grad = ctx.createRadialGradient(0.5 * size, 0, 0, 0.5 * size, 0, 0.583333 * size);
  grad.addColorStop(0, 'rgba(255, 255, 255, 0.749019)');
  grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = grad;
  ctx.fill();

  // METALKNOB_INNERFRAME
  ctx.beginPath();
  ctx.moveTo(size * 0.277777, size * 0.555555);
  ctx.bezierCurveTo(size * 0.277777, size * 0.388888, size * 0.388888, size * 0.277777, size * 0.5, size * 0.277777);
  ctx.bezierCurveTo(size * 0.611111, size * 0.277777, size * 0.777777, size * 0.388888, size * 0.777777, size * 0.555555);
  ctx.bezierCurveTo(size * 0.777777, size * 0.666666, size * 0.611111, size * 0.777777, size * 0.5, size * 0.777777);
  ctx.bezierCurveTo(size * 0.388888, size * 0.777777, size * 0.277777, size * 0.666666, size * 0.277777, size * 0.555555);
  ctx.closePath();

  grad = ctx.createLinearGradient(0, 0.277777 * size, 0, 0.722221 * size);
  grad.addColorStop(0, '#000000');
  grad.addColorStop(1, 'rgb(204, 204, 204)');
  ctx.fillStyle = grad;
  ctx.fill();

  // METALKNOB_INNERBACKGROUND
  ctx.beginPath();
  ctx.moveTo(size * 0.333333, size * 0.555555);
  ctx.bezierCurveTo(size * 0.333333, size * 0.444444, size * 0.388888, size * 0.333333, size * 0.5, size * 0.333333);
  ctx.bezierCurveTo(size * 0.611111, size * 0.333333, size * 0.722222, size * 0.444444, size * 0.722222, size * 0.555555);
  ctx.bezierCurveTo(size * 0.722222, size * 0.611111, size * 0.611111, size * 0.722222, size * 0.5, size * 0.722222);
  ctx.bezierCurveTo(size * 0.388888, size * 0.722222, size * 0.333333, size * 0.611111, size * 0.333333, size * 0.555555);
  ctx.closePath();

  grad = ctx.createLinearGradient(0, 0.333333 * size, 0, 0.666666 * size);
  grad.addColorStop(0, 'rgb(10, 9, 1)');
  grad.addColorStop(1, 'rgb(42, 41, 37)');
  ctx.fillStyle = grad;
  ctx.fill();
}
