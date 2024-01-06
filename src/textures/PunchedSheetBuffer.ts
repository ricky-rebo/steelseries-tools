import { drawToCanvas } from "canvas-drawing-tools";

// TODO docs
export const PunchedSheetBuffer = drawToCanvas(15, 15, function (ctx) {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;
  let grad;

  ctx.save();

  // BACK
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, 0, width, height);
  ctx.closePath();
  ctx.restore();
  ctx.fillStyle = "#1D2123";
  ctx.fill();

  // ULB
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(0, height * 0.266666);
  ctx.bezierCurveTo(0, height * 0.4, width * 0.066666, height * 0.466666, width * 0.2, height * 0.466666);
  ctx.bezierCurveTo(width * 0.333333, height * 0.466666, width * 0.4, height * 0.4, width * 0.4, height * 0.266666);
  ctx.bezierCurveTo(
    width * 0.4,
    height * 0.133333,
    width * 0.333333,
    height * 0.066666,
    width * 0.2,
    height * 0.066666
  );
  ctx.bezierCurveTo(width * 0.066666, height * 0.066666, 0, height * 0.133333, 0, height * 0.266666);
  ctx.closePath();
  grad = ctx.createLinearGradient(0, 0.066666 * height, 0, 0.466666 * height);
  grad.addColorStop(0, "#000000");
  grad.addColorStop(1, "#444444");
  ctx.fillStyle = grad;
  ctx.fill();

  // ULF
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(0, height * 0.2);
  ctx.bezierCurveTo(0, height * 0.333333, width * 0.066666, height * 0.4, width * 0.2, height * 0.4);
  ctx.bezierCurveTo(width * 0.333333, height * 0.4, width * 0.4, height * 0.333333, width * 0.4, height * 0.2);
  ctx.bezierCurveTo(width * 0.4, height * 0.066666, width * 0.333333, 0, width * 0.2, 0);
  ctx.bezierCurveTo(width * 0.066666, 0, 0, height * 0.066666, 0, height * 0.2);
  ctx.closePath();
  ctx.fillStyle = "#050506";
  ctx.fill();

  // LRB
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(width * 0.466666, height * 0.733333);
  ctx.bezierCurveTo(
    width * 0.466666,
    height * 0.866666,
    width * 0.533333,
    height * 0.933333,
    width * 0.666666,
    height * 0.933333
  );
  ctx.bezierCurveTo(
    width * 0.8,
    height * 0.933333,
    width * 0.866666,
    height * 0.866666,
    width * 0.866666,
    height * 0.733333
  );
  ctx.bezierCurveTo(
    width * 0.866666,
    height * 0.6,
    width * 0.8,
    height * 0.533333,
    width * 0.666666,
    height * 0.533333
  );
  ctx.bezierCurveTo(
    width * 0.533333,
    height * 0.533333,
    width * 0.466666,
    height * 0.6,
    width * 0.466666,
    height * 0.733333
  );
  ctx.closePath();
  grad = ctx.createLinearGradient(0, 0.533333 * height, 0, 0.933333 * height);
  grad.addColorStop(0, "#000000");
  grad.addColorStop(1, "#444444");
  ctx.fillStyle = grad;
  ctx.fill();

  // LRF
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(width * 0.466666, height * 0.666666);
  ctx.bezierCurveTo(
    width * 0.466666,
    height * 0.8,
    width * 0.533333,
    height * 0.866666,
    width * 0.666666,
    height * 0.866666
  );
  ctx.bezierCurveTo(
    width * 0.8,
    height * 0.866666,
    width * 0.866666,
    height * 0.8,
    width * 0.866666,
    height * 0.666666
  );
  ctx.bezierCurveTo(
    width * 0.866666,
    height * 0.533333,
    width * 0.8,
    height * 0.466666,
    width * 0.666666,
    height * 0.466666
  );
  ctx.bezierCurveTo(
    width * 0.533333,
    height * 0.466666,
    width * 0.466666,
    height * 0.533333,
    width * 0.466666,
    height * 0.666666
  );
  ctx.closePath();
  ctx.fillStyle = "#050506";
  ctx.fill();

  ctx.restore();
});
