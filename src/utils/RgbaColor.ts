import { range } from "./common"

export class RgbaColor {
  #red
  #green
  #blue
  #alpha

  constructor (r: number, g: number, b: number, a = 1) {
    this.#red = range(r, 255)
    this.#green = range(g, 255)
    this.#blue = range(b, 255)
    this.#alpha = range(a, 1)
  }

  static fromHexString(hexString: string, alpha = 1) {
    hexString = hexString.charAt(0) === "#" ? hexString.substring(1, 7) : hexString

    const red = parseInt(hexString.substring(0, 2), 16)
    const green = parseInt(hexString.substring(2, 4), 16)
    const blue = parseInt(hexString.substring(4, 6), 16)

    return new RgbaColor(red, green, blue, alpha)
  }

  getRed () {
    return this.#red
  }

  setRed (r: number) {
    this.#red = range(r, 255)
  }

  getGreen () {
    return this.#green
  }

  setGreen (g: number) {
    this.#green = range(g, 255)
  }

  getBlue () {
    return this.#blue
  }

  setBlue (b: number) {
    this.#blue = range(b, 255)
  }

  getAlpha () {
    return this.#alpha
  }

  setAlpha (a: number) {
    this.#alpha = range(a, 1)
  }

  toRgbaColorString () {
    return `rgba(${this.#red}, ${this.#green}, ${this.#blue}, ${this.#alpha})`
  }
  getRgbaColor () {
    // TODO print deprecation warning
    return this.toRgbaColorString()
  }

  toRgbColorString () {
    return `rgb(${this.#red}, ${this.#green}, ${this.#blue})`
  }
  getRgbColor () {
    // TODO print deprecation warning
    return this.toRgbColorString()
  }

  toHexColorString () {
    return `#${this.#red.toString(16)}${this.#green.toString(16)}${this.#blue.toString(16)}`
  }
  getHexColor () {
    // TODO print deprecation warning
    return this.toHexColorString()
  }
}
