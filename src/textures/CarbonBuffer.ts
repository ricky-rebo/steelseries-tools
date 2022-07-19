import { drawToBuffer } from "../utils/common"
import { createLinearGradient } from "../utils/gradients"

// TODO docs
export const CarbonBuffer = drawToBuffer(12, 12, function(ctx) {
  const width = ctx.canvas.width
  const height = ctx.canvas.height
  let grad

  ctx.save()

  // RULB
  ctx.save()
  ctx.beginPath()
  ctx.rect(0, 0, width * 0.5, height * 0.5)
  ctx.closePath()
  ctx.restore()

  let offsetY = 0
  ctx.fillStyle = createLinearGradient(ctx, 0, offsetY * height, 0, 0.5 * height + offsetY * height, [
    { color: "rgb(35, 35, 35)", offset: 0 },
    { color: "rgb(23, 23, 23)", offset: 1 },
  ])
  ctx.fill()

  // RULF
  ctx.save()
  ctx.beginPath()
  ctx.rect(width * 0.083333, 0, width * 0.333333, height * 0.416666)
  ctx.closePath()
  ctx.restore()

  // offsetY = 0
  ctx.fillStyle = createLinearGradient(ctx, 0, offsetY * height, 0, 0.416666 * height + offsetY * height, [
    { color: "rgb(38, 38, 38)", offset: 0 },
    { color: "rgb(30, 30, 30)", offset: 1 },
  ])
  ctx.fill()

  // RLRB
  ctx.save()
  ctx.beginPath()
  ctx.rect(width * 0.5, height * 0.5, width * 0.5, height * 0.5)
  ctx.closePath()
  ctx.restore()

  offsetY = 0.5
  ctx.fillStyle = createLinearGradient(ctx, 0, offsetY * height, 0, 0.5 * height + offsetY * height, [
    { color: "rgb(35, 35, 35)", offset: 0 },
    { color: "rgb(23, 23, 23)", offset: 1 },
  ])
  ctx.fill()

  // RLRF
  ctx.save()
  ctx.beginPath()
  ctx.rect(width * 0.583333, height * 0.5, width * 0.333333, height * 0.416666)
  ctx.closePath()
  ctx.restore()

  // offsetY = 0.5
  ctx.fillStyle = createLinearGradient(ctx, 0, offsetY * height, 0, 0.416666 * height + offsetY * height, [
    { color: "rgb(38, 38, 38)", offset: 0 },
    { color: "rgb(30, 30, 30)", offset: 1 },
  ])
  ctx.fill()

  // RURB
  ctx.save()
  ctx.beginPath()
  ctx.rect(width * 0.5, 0, width * 0.5, height * 0.5)
  ctx.closePath()
  ctx.restore()

  offsetY = 0
  grad = ctx.createLinearGradient(0, offsetY * height, 0, 0.5 * height + offsetY * height)
  grad.addColorStop(0, "#303030")
  grad.addColorStop(1, "rgb(40, 40, 40)")
  ctx.fillStyle = grad
  ctx.fill()

  // RURF
  ctx.save()
  ctx.beginPath()
  ctx.rect(width * 0.583333, height * 0.083333, width * 0.333333, height * 0.416666)
  ctx.closePath()
  ctx.restore()
  offsetY = 0.083333
  grad = ctx.createLinearGradient(0, offsetY * height, 0, 0.416666 * height + offsetY * height)
  grad.addColorStop(0, "rgb(53, 53, 53)")
  grad.addColorStop(1, "rgb(45, 45, 45)")
  ctx.fillStyle = grad
  ctx.fill()

  // RLLB
  ctx.save()
  ctx.beginPath()
  ctx.rect(0, height * 0.5, width * 0.5, height * 0.5)
  ctx.closePath()
  ctx.restore()
  offsetY = 0.5
  grad = ctx.createLinearGradient(0, offsetY * height, 0, 0.5 * height + offsetY * height)
  grad.addColorStop(0, "#303030")
  grad.addColorStop(1, "#282828")
  ctx.fillStyle = grad
  ctx.fill()

  // RLLF
  ctx.save()
  ctx.beginPath()
  ctx.rect(width * 0.083333, height * 0.583333, width * 0.333333, height * 0.416666)
  ctx.closePath()
  ctx.restore()
  offsetY = 0.583333
  grad = ctx.createLinearGradient(0, offsetY * height, 0, 0.416666 * height + offsetY * height)
  grad.addColorStop(0, "#353535")
  grad.addColorStop(1, "#2d2d2d")
  ctx.fillStyle = grad
  ctx.fill()

  ctx.restore()
})
