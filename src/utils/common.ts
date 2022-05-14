export function range (value: number, limit: number) {
  return value < 0 ? 0 : value > limit ? limit : value
}