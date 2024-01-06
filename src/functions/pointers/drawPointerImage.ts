import { createCanvas, createLinearGradient, createRadialGradient } from "canvas-drawing-tools";

import { ColorDef } from "../../model/ColorDef";
import { PointerTypeDef } from "../../model/PointerTypeDef";
import { TWO_PI } from "../../shared";
import { RgbaColor } from "../../model/RgbaColor";

interface Options {
  size: number;
  pointerType: PointerTypeDef;
  pointerColor: ColorDef;
  labelColor: RgbaColor;
}

const cache: CanvasCache = {};

// TODO docs
// TODO dividere logica di caching (createPointerImage) e disegno (drawPointer)
export function drawPointerImage(ctx: CanvasCtx, options: Options) {
  const size = options.size ?? Math.min(ctx.canvas.width, ctx.canvas.height);

  const CACHE_KEY =
    options.pointerType.type +
    options.pointerColor.light.toHexString() +
    options.pointerColor.medium.toHexString() +
    size;

  // check if we have already created and cached this buffer, if not create it
  if (!(CACHE_KEY in cache)) {
    const ptrBuffer = createCanvas(size, size);
    const ptrCtx = ptrBuffer.getContext("2d");

    if (!ptrCtx) {
      throw Error("Unable to get canvas context!");
    }

    switch (options.pointerType.type) {
      case "type2":
        ptrCtx.fillStyle = createLinearGradient(ptrCtx, 0, size * 0.471962, 0, size * 0.130841, [
          { color: options.labelColor.toRgbaString(), offset: 0 },
          { color: options.labelColor.toRgbaString(), offset: 0.36 },
          { color: options.pointerColor.light.toRgbaString(), offset: 0.361 },
          { color: options.pointerColor.light.toRgbaString(), offset: 1 },
        ]);

        ptrCtx.beginPath();
        ptrCtx.moveTo(size * 0.518691, size * 0.471962);
        ptrCtx.lineTo(size * 0.509345, size * 0.462616);
        ptrCtx.lineTo(size * 0.509345, size * 0.341121);
        ptrCtx.lineTo(size * 0.504672, size * 0.130841);
        ptrCtx.lineTo(size * 0.495327, size * 0.130841);
        ptrCtx.lineTo(size * 0.490654, size * 0.341121);
        ptrCtx.lineTo(size * 0.490654, size * 0.462616);
        ptrCtx.lineTo(size * 0.481308, size * 0.471962);
        ptrCtx.closePath();
        ptrCtx.fill();
        break;

      case "type3":
        ptrCtx.fillStyle = options.pointerColor.light.toRgbaString();
        ptrCtx.fillRect(size * 0.495327, size * 0.130841, size * 0.009345, size * 0.373831);
        break;

      case "type4":
        ptrCtx.fillStyle = createLinearGradient(ptrCtx, 0.467289 * size, 0, 0.528036 * size, 0, [
          { color: options.pointerColor.dark.toRgbaString(), offset: 0 },
          { color: options.pointerColor.dark.toRgbaString(), offset: 0.51 },
          { color: options.pointerColor.light.toRgbaString(), offset: 0.52 },
          { color: options.pointerColor.light.toRgbaString(), offset: 1 },
        ]);

        ptrCtx.beginPath();
        ptrCtx.moveTo(size * 0.5, size * 0.126168);
        ptrCtx.lineTo(size * 0.514018, size * 0.135514);
        ptrCtx.lineTo(size * 0.53271, size * 0.5);
        ptrCtx.lineTo(size * 0.523364, size * 0.602803);
        ptrCtx.lineTo(size * 0.476635, size * 0.602803);
        ptrCtx.lineTo(size * 0.467289, size * 0.5);
        ptrCtx.lineTo(size * 0.485981, size * 0.135514);
        ptrCtx.lineTo(size * 0.5, size * 0.126168);
        ptrCtx.closePath();
        ptrCtx.fill();
        break;

      case "type5":
        ptrCtx.fillStyle = createLinearGradient(ptrCtx, 0.471962 * size, 0, 0.528036 * size, 0, [
          { color: options.pointerColor.light.toRgbaString(), offset: 0 },
          { color: options.pointerColor.light.toRgbaString(), offset: 0.5 },
          { color: options.pointerColor.medium.toRgbaString(), offset: 0.5 },
          { color: options.pointerColor.medium.toRgbaString(), offset: 1 },
        ]);

        ptrCtx.beginPath();
        ptrCtx.moveTo(size * 0.5, size * 0.495327);
        ptrCtx.lineTo(size * 0.528037, size * 0.495327);
        ptrCtx.lineTo(size * 0.5, size * 0.149532);
        ptrCtx.lineTo(size * 0.471962, size * 0.495327);
        ptrCtx.lineTo(size * 0.5, size * 0.495327);
        ptrCtx.closePath();
        ptrCtx.fill();

        ptrCtx.lineWidth = 1;
        ptrCtx.lineCap = "square";
        ptrCtx.lineJoin = "miter";
        ptrCtx.strokeStyle = options.pointerColor.dark.toRgbaString();
        ptrCtx.stroke();
        break;

      case "type6":
        ptrCtx.fillStyle = options.pointerColor.medium.toRgbaString();

        ptrCtx.beginPath();
        ptrCtx.moveTo(size * 0.481308, size * 0.485981);
        ptrCtx.lineTo(size * 0.481308, size * 0.392523);
        ptrCtx.lineTo(size * 0.485981, size * 0.317757);
        ptrCtx.lineTo(size * 0.495327, size * 0.130841);
        ptrCtx.lineTo(size * 0.504672, size * 0.130841);
        ptrCtx.lineTo(size * 0.514018, size * 0.317757);
        ptrCtx.lineTo(size * 0.518691, size * 0.38785);
        ptrCtx.lineTo(size * 0.518691, size * 0.485981);
        ptrCtx.lineTo(size * 0.504672, size * 0.485981);
        ptrCtx.lineTo(size * 0.504672, size * 0.38785);
        ptrCtx.lineTo(size * 0.5, size * 0.317757);
        ptrCtx.lineTo(size * 0.495327, size * 0.392523);
        ptrCtx.lineTo(size * 0.495327, size * 0.485981);
        ptrCtx.lineTo(size * 0.481308, size * 0.485981);
        ptrCtx.closePath();
        ptrCtx.fill();
        break;

      case "type7":
        ptrCtx.fillStyle = createLinearGradient(ptrCtx, 0.481308 * size, 0, 0.518691 * size, 0, [
          { color: options.pointerColor.dark.toRgbaString(), offset: 0 },
          { color: options.pointerColor.medium.toRgbaString(), offset: 1 },
        ]);

        ptrCtx.beginPath();
        ptrCtx.moveTo(size * 0.490654, size * 0.130841);
        ptrCtx.lineTo(size * 0.481308, size * 0.5);
        ptrCtx.lineTo(size * 0.518691, size * 0.5);
        ptrCtx.lineTo(size * 0.504672, size * 0.130841);
        ptrCtx.lineTo(size * 0.490654, size * 0.130841);
        ptrCtx.closePath();
        ptrCtx.fill();
        break;

      case "type8":
        ptrCtx.fillStyle = createLinearGradient(ptrCtx, 0.471962 * size, 0, 0.528036 * size, 0, [
          { color: options.pointerColor.light.toRgbaString(), offset: 0 },
          { color: options.pointerColor.light.toRgbaString(), offset: 0.5 },
          { color: options.pointerColor.medium.toRgbaString(), offset: 0.5 },
          { color: options.pointerColor.medium.toRgbaString(), offset: 1 },
        ]);
        ptrCtx.strokeStyle = options.pointerColor.dark.toRgbaString();

        ptrCtx.beginPath();
        ptrCtx.moveTo(size * 0.5, size * 0.53271);
        ptrCtx.lineTo(size * 0.53271, size * 0.5);
        ptrCtx.bezierCurveTo(size * 0.53271, size * 0.5, size * 0.509345, size * 0.457943, size * 0.5, size * 0.149532);
        ptrCtx.bezierCurveTo(
          size * 0.490654,
          size * 0.457943,
          size * 0.467289,
          size * 0.5,
          size * 0.467289,
          size * 0.5
        );
        ptrCtx.lineTo(size * 0.5, size * 0.53271);
        ptrCtx.closePath();
        ptrCtx.fill();
        ptrCtx.stroke();
        break;

      case "type9":
        ptrCtx.fillStyle = createLinearGradient(ptrCtx, 0.471962 * size, 0, 0.528036 * size, 0, [
          { color: "#323232", offset: 0 },
          { color: "#666666", offset: 0.5 },
          { color: "#323232", offset: 1 },
        ]);
        ptrCtx.strokeStyle = "#2E2E2E";

        ptrCtx.beginPath();
        ptrCtx.moveTo(size * 0.495327, size * 0.233644);
        ptrCtx.lineTo(size * 0.504672, size * 0.233644);
        ptrCtx.lineTo(size * 0.514018, size * 0.439252);
        ptrCtx.lineTo(size * 0.485981, size * 0.439252);
        ptrCtx.lineTo(size * 0.495327, size * 0.233644);
        ptrCtx.closePath();

        ptrCtx.moveTo(size * 0.490654, size * 0.130841);
        ptrCtx.lineTo(size * 0.471962, size * 0.471962);
        ptrCtx.lineTo(size * 0.471962, size * 0.528037);
        ptrCtx.bezierCurveTo(
          size * 0.471962,
          size * 0.528037,
          size * 0.476635,
          size * 0.602803,
          size * 0.476635,
          size * 0.602803
        );
        ptrCtx.bezierCurveTo(
          size * 0.476635,
          size * 0.607476,
          size * 0.481308,
          size * 0.607476,
          size * 0.5,
          size * 0.607476
        );
        ptrCtx.bezierCurveTo(
          size * 0.518691,
          size * 0.607476,
          size * 0.523364,
          size * 0.607476,
          size * 0.523364,
          size * 0.602803
        );
        ptrCtx.bezierCurveTo(
          size * 0.523364,
          size * 0.602803,
          size * 0.528037,
          size * 0.528037,
          size * 0.528037,
          size * 0.528037
        );
        ptrCtx.lineTo(size * 0.528037, size * 0.471962);
        ptrCtx.lineTo(size * 0.509345, size * 0.130841);
        ptrCtx.lineTo(size * 0.490654, size * 0.130841);
        ptrCtx.closePath();
        ptrCtx.fill();

        ptrCtx.fillStyle = options.pointerColor.medium.toRgbaString();

        ptrCtx.beginPath();
        ptrCtx.moveTo(size * 0.495327, size * 0.219626);
        ptrCtx.lineTo(size * 0.504672, size * 0.219626);
        ptrCtx.lineTo(size * 0.504672, size * 0.135514);
        ptrCtx.lineTo(size * 0.495327, size * 0.135514);
        ptrCtx.lineTo(size * 0.495327, size * 0.219626);
        ptrCtx.closePath();
        ptrCtx.fill();
        break;

      case "type10":
        ptrCtx.fillStyle = createLinearGradient(ptrCtx, 0.471962 * size, 0, 0.528036 * size, 0, [
          { color: options.pointerColor.light.toRgbaString(), offset: 0 },
          { color: options.pointerColor.light.toRgbaString(), offset: 0.5 },
          { color: options.pointerColor.medium.toRgbaString(), offset: 0.5 },
          { color: options.pointerColor.medium.toRgbaString(), offset: 1 },
        ]);
        ptrCtx.strokeStyle = options.pointerColor.medium.getRgbaColor();
        ptrCtx.lineWidth = 1;
        ptrCtx.lineCap = "square";
        ptrCtx.lineJoin = "miter";

        ptrCtx.beginPath();
        ptrCtx.moveTo(size * 0.5, size * 0.149532);
        ptrCtx.bezierCurveTo(
          size * 0.5,
          size * 0.149532,
          size * 0.443925,
          size * 0.490654,
          size * 0.443925,
          size * 0.5
        );
        ptrCtx.bezierCurveTo(
          size * 0.443925,
          size * 0.53271,
          size * 0.467289,
          size * 0.556074,
          size * 0.5,
          size * 0.556074
        );
        ptrCtx.bezierCurveTo(
          size * 0.53271,
          size * 0.556074,
          size * 0.556074,
          size * 0.53271,
          size * 0.556074,
          size * 0.5
        );
        ptrCtx.bezierCurveTo(
          size * 0.556074,
          size * 0.490654,
          size * 0.5,
          size * 0.149532,
          size * 0.5,
          size * 0.149532
        );
        ptrCtx.closePath();

        ptrCtx.fill();
        ptrCtx.stroke();
        break;

      case "type11":
        ptrCtx.fillStyle = createLinearGradient(ptrCtx, 0, 0.168224 * size, 0, 0.584112 * size, [
          { offset: 0, color: options.pointerColor.medium.toRgbaString() },
          { offset: 1, color: options.pointerColor.dark.toRgbaString() },
        ]);
        ptrCtx.strokeStyle = options.pointerColor.dark.getRgbaColor();

        ptrCtx.beginPath();
        ptrCtx.moveTo(0.5 * size, 0.168224 * size);
        ptrCtx.lineTo(0.485981 * size, 0.5 * size);
        ptrCtx.bezierCurveTo(
          0.485981 * size,
          0.5 * size,
          0.481308 * size,
          0.584112 * size,
          0.5 * size,
          0.584112 * size
        );
        ptrCtx.bezierCurveTo(
          0.514018 * size,
          0.584112 * size,
          0.509345 * size,
          0.5 * size,
          0.509345 * size,
          0.5 * size
        );
        ptrCtx.lineTo(0.5 * size, 0.168224 * size);

        ptrCtx.fill();
        ptrCtx.stroke();
        break;

      case "type12":
        ptrCtx.fillStyle = createLinearGradient(ptrCtx, 0, 0.168224 * size, 0, 0.504672 * size, [
          { offset: 0, color: options.pointerColor.medium.toRgbaString() },
          { offset: 1, color: options.pointerColor.dark.toRgbaString() },
        ]);
        ptrCtx.strokeStyle = options.pointerColor.dark.toRgbaString();

        ptrCtx.beginPath();
        ptrCtx.moveTo(0.5 * size, 0.168224 * size);
        ptrCtx.lineTo(0.485981 * size, 0.5 * size);
        ptrCtx.lineTo(0.5 * size, 0.504672 * size);
        ptrCtx.lineTo(0.509345 * size, 0.5 * size);
        ptrCtx.lineTo(0.5 * size, 0.168224 * size);
        ptrCtx.closePath();

        ptrCtx.fill();
        ptrCtx.stroke();
        break;

      case "type13":
        ptrCtx.fillStyle = createLinearGradient(ptrCtx, 0, 0.5 * size, 0, 0.130841 * size, [
          { color: options.labelColor.toRgbaString(), offset: 0 },
          { color: options.labelColor.toRgbaString(), offset: 0.85 },
          { color: options.pointerColor.medium.toRgbaString(), offset: 0.85 },
          { color: options.pointerColor.medium.toRgbaString(), offset: 1 },
        ]);

        // Same Path as type14
        ptrCtx.beginPath();
        ptrCtx.moveTo(0.485981 * size, 0.168224 * size);
        ptrCtx.lineTo(0.5 * size, 0.130841 * size);
        ptrCtx.lineTo(0.509345 * size, 0.168224 * size);
        ptrCtx.lineTo(0.509345 * size, 0.509345 * size);
        ptrCtx.lineTo(0.485981 * size, 0.509345 * size);
        ptrCtx.lineTo(0.485981 * size, 0.168224 * size);
        ptrCtx.closePath();

        ptrCtx.fill();
        break;

      case "type14":
        ptrCtx.fillStyle = createLinearGradient(ptrCtx, 0.485981 * size, 0, 0.509345 * size, 0, [
          { color: options.pointerColor.veryDark.toRgbaString(), offset: 0 },
          { color: options.pointerColor.light.toRgbaString(), offset: 0.5 },
          { color: options.pointerColor.veryDark.toRgbaString(), offset: 1 },
        ]);

        // Same Path as type13
        ptrCtx.beginPath();
        ptrCtx.moveTo(0.485981 * size, 0.168224 * size);
        ptrCtx.lineTo(0.5 * size, 0.130841 * size);
        ptrCtx.lineTo(0.509345 * size, 0.168224 * size);
        ptrCtx.lineTo(0.509345 * size, 0.509345 * size);
        ptrCtx.lineTo(0.485981 * size, 0.509345 * size);
        ptrCtx.lineTo(0.485981 * size, 0.168224 * size);
        ptrCtx.closePath();

        ptrCtx.fill();
        break;

      case "type15":
      // POINTER TYPE15 - Classic with crescent
      // eslint-disable-next-line no-fallthrough
      case "type16":
        // POINTER TYPE16 - Classic without crescent
        const y1 = options.pointerType.type === "type15" ? size * 0.63 : size * 0.621495;
        ptrCtx.fillStyle = createLinearGradient(ptrCtx, 0, 0, 0, y1, [
          { color: options.pointerColor.medium.toRgbaString(), offset: 0 },
          { color: options.pointerColor.medium.toRgbaString(), offset: 0.388888 },
          { color: options.pointerColor.light.toRgbaString(), offset: 0.5 },
          { color: options.pointerColor.medium.toRgbaString(), offset: 0.611111 },
          { color: options.pointerColor.medium.toRgbaString(), offset: 1 },
        ]);
        ptrCtx.strokeStyle = options.pointerColor.dark.toRgbaString();

        ptrCtx.beginPath();
        ptrCtx.moveTo(size * 0.509345, size * 0.457943);
        ptrCtx.lineTo(size * 0.5015, size * 0.13);
        ptrCtx.lineTo(size * 0.4985, size * 0.13);
        ptrCtx.lineTo(size * 0.490654, size * 0.457943);
        ptrCtx.bezierCurveTo(
          size * 0.490654,
          size * 0.457943,
          size * 0.490654,
          size * 0.457943,
          size * 0.490654,
          size * 0.457943
        );
        ptrCtx.bezierCurveTo(
          size * 0.471962,
          size * 0.462616,
          size * 0.457943,
          size * 0.481308,
          size * 0.457943,
          size * 0.5
        );
        ptrCtx.bezierCurveTo(
          size * 0.457943,
          size * 0.518691,
          size * 0.471962,
          size * 0.537383,
          size * 0.490654,
          size * 0.542056
        );
        ptrCtx.bezierCurveTo(
          size * 0.490654,
          size * 0.542056,
          size * 0.490654,
          size * 0.542056,
          size * 0.490654,
          size * 0.542056
        );

        if (options.pointerType.type === "type15") {
          // Crescent
          ptrCtx.lineTo(size * 0.490654, size * 0.57);
          ptrCtx.bezierCurveTo(size * 0.46, size * 0.58, size * 0.46, size * 0.62, size * 0.490654, size * 0.63);
          ptrCtx.bezierCurveTo(size * 0.47, size * 0.62, size * 0.48, size * 0.59, size * 0.5, size * 0.59);
          ptrCtx.bezierCurveTo(size * 0.53, size * 0.59, size * 0.52, size * 0.62, size * 0.509345, size * 0.63);
          ptrCtx.bezierCurveTo(size * 0.54, size * 0.62, size * 0.54, size * 0.58, size * 0.509345, size * 0.57);
          ptrCtx.lineTo(size * 0.509345, size * 0.57);
        } else {
          // No Crescent
          ptrCtx.lineTo(size * 0.490654, size * 0.621495);
          ptrCtx.lineTo(size * 0.509345, size * 0.621495);
        }

        ptrCtx.lineTo(size * 0.509345, size * 0.542056);
        ptrCtx.bezierCurveTo(
          size * 0.509345,
          size * 0.542056,
          size * 0.509345,
          size * 0.542056,
          size * 0.509345,
          size * 0.542056
        );
        ptrCtx.bezierCurveTo(
          size * 0.528037,
          size * 0.537383,
          size * 0.542056,
          size * 0.518691,
          size * 0.542056,
          size * 0.5
        );
        ptrCtx.bezierCurveTo(
          size * 0.542056,
          size * 0.481308,
          size * 0.528037,
          size * 0.462616,
          size * 0.509345,
          size * 0.457943
        );
        ptrCtx.bezierCurveTo(
          size * 0.509345,
          size * 0.457943,
          size * 0.509345,
          size * 0.457943,
          size * 0.509345,
          size * 0.457943
        );
        ptrCtx.closePath();

        ptrCtx.fill();
        ptrCtx.stroke();

        // Draw the rings
        let radius = (size * 0.06542) / 2;
        ptrCtx.fillStyle = createLinearGradient(
          ptrCtx,
          size * 0.5 - radius,
          size * 0.5 + radius,
          0,
          size * 0.5 + radius,
          [
            { color: "#e6b35c", offset: 0 },
            { color: "#e6b35c", offset: 0.01 },
            { color: "#c48200", offset: 0.99 },
            { color: "#c48200", offset: 1 },
          ]
        );

        ptrCtx.beginPath();
        ptrCtx.arc(size * 0.5, size * 0.5, radius, 0, TWO_PI);
        ptrCtx.closePath();
        ptrCtx.fill();

        radius = (size * 0.046728) / 2;
        ptrCtx.fillStyle = createRadialGradient(ptrCtx, size * 0.5, size * 0.5, 0, radius, [
          { color: "#c5c5c5", offset: 0 },
          { color: "#c5c5c5", offset: 0.19 },
          { color: "#000000", offset: 0.22 },
          { color: "#000000", offset: 0.8 },
          { color: "#707070", offset: 0.99 },
          { color: "#707070", offset: 1 },
        ]);

        ptrCtx.beginPath();
        ptrCtx.arc(size * 0.5, size * 0.5, radius, 0, TWO_PI);
        ptrCtx.closePath();
        ptrCtx.fill();
        break;

      case "type1":
      /* falls through */
      default:
        ptrCtx.fillStyle = createLinearGradient(ptrCtx, 0, size * 0.471962, 0, size * 0.130841, [
          { color: options.pointerColor.veryDark.toRgbaString(), offset: 0 },
          { color: options.pointerColor.medium.toRgbaString(), offset: 0.3 },
          { color: options.pointerColor.medium.toRgbaString(), offset: 0.59 },
          { color: options.pointerColor.veryDark.toRgbaString(), offset: 1 },
        ]);

        ptrCtx.beginPath();
        ptrCtx.moveTo(size * 0.518691, size * 0.471962);
        ptrCtx.bezierCurveTo(
          size * 0.514018,
          size * 0.457943,
          size * 0.509345,
          size * 0.415887,
          size * 0.509345,
          size * 0.401869
        );
        ptrCtx.bezierCurveTo(
          size * 0.504672,
          size * 0.383177,
          size * 0.5,
          size * 0.130841,
          size * 0.5,
          size * 0.130841
        );
        ptrCtx.bezierCurveTo(
          size * 0.5,
          size * 0.130841,
          size * 0.490654,
          size * 0.383177,
          size * 0.490654,
          size * 0.397196
        );
        ptrCtx.bezierCurveTo(
          size * 0.490654,
          size * 0.415887,
          size * 0.485981,
          size * 0.457943,
          size * 0.481308,
          size * 0.471962
        );
        ptrCtx.bezierCurveTo(
          size * 0.471962,
          size * 0.481308,
          size * 0.467289,
          size * 0.490654,
          size * 0.467289,
          size * 0.5
        );
        ptrCtx.bezierCurveTo(
          size * 0.467289,
          size * 0.518691,
          size * 0.481308,
          size * 0.53271,
          size * 0.5,
          size * 0.53271
        );
        ptrCtx.bezierCurveTo(
          size * 0.518691,
          size * 0.53271,
          size * 0.53271,
          size * 0.518691,
          size * 0.53271,
          size * 0.5
        );
        ptrCtx.bezierCurveTo(
          size * 0.53271,
          size * 0.490654,
          size * 0.528037,
          size * 0.481308,
          size * 0.518691,
          size * 0.471962
        );
        ptrCtx.closePath();
        ptrCtx.fill();
        break;
    }

    // cache buffer
    cache[CACHE_KEY] = ptrBuffer;
  }

  ctx.drawImage(cache[CACHE_KEY], 0, 0);
}
