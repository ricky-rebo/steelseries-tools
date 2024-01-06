import { TWO_PI } from "../../shared";

// TODO docs
export function drawCustomLayer(ctx: CanvasRenderingContext2D, img: CanvasImageSource) {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;

  const drawWidth = width * 0.831775;
  const drawHeight = height * 0.831775;

  const startX = (width - drawWidth) / 2;
  const startY = (height - drawHeight) / 2;

  if (img !== null && img.height > 0 && img.width > 0) {
    ctx.save();

    // Set the clipping area
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, drawWidth / 2, 0, TWO_PI, true);
    ctx.clip();

    // Add the image
    ctx.drawImage(img, startX, startY, drawWidth, drawHeight);

    ctx.restore();
  }
}
