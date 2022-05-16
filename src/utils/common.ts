export function range (value: number, limit: number) {
  return value < 0 ? 0 : value > limit ? limit : value
}

export function createBuffer (width: number, height = width, id?: string) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  canvas.id = id ? id : ''

  return canvas
}
