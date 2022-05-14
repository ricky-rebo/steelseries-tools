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
    const red = parseInt(hexString.substring(1, 3), 16)
    const green = parseInt(hexString.substring(3, 5), 16)
    const blue = parseInt(hexString.substring(5, 7), 16)

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

  getRgbaColor () {
    return `rgba(${this.#red}, ${this.#green}, ${this.#blue}, ${this.#alpha})`
  }

  getRgbColor () {
    return `rgb(${this.#red}, ${this.#green}, ${this.#blue})`
  }

  getHexColor () {
    return `#${this.#red.toString(16)}${this.#green.toString(16)}${this.#blue.toString(16)}`
  }
}
