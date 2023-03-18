export function range (value: number, limit: number) {
  return value < 0 ? 0 : value > limit ? limit : value
}

export function calcNiceNumber (_range: number, round: boolean) {
  const exponent = Math.floor(Math.log10(_range)) // exponent of range
  const fraction = _range / Math.pow(10, exponent) // fractional part of range
  let niceFraction // nice, rounded fraction

  if (round) {
    if (fraction < 1.5) {
      niceFraction = 1
    } else if (fraction < 3) {
      niceFraction = 2
    } else if (fraction < 7) {
      niceFraction = 5
    } else {
      niceFraction = 10
    }
  } else {
    if (fraction <= 1) {
      niceFraction = 1
    } else if (fraction <= 2) {
      niceFraction = 2
    } else if (fraction <= 5) {
      niceFraction = 5
    } else {
      niceFraction = 10
    }
  }
  return niceFraction * Math.pow(10, exponent)
}

export function prepareTexture (svg: string): HTMLImageElement {
  const buffer = Buffer.from(svg, 'utf-8').toString('base64');

  const texture = new Image();
  texture.src = `data:image/svg+xml;base64,${buffer}`;

  return texture;
}
