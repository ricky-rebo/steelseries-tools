import { range } from "../helpers/common"

export class RgbaColor {
  #red: number
  #green: number
  #blue: number
  #alpha: number

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

  static fromRawColor(rawColorData: RawColorData) {
    const alpha = rawColorData.length > 3 ? rawColorData[3] : 255

    return new RgbaColor(rawColorData[0], rawColorData[1], rawColorData[2], alpha)
  }

  getRed () {
    return this.#red
  }

  setRed (r: number) {
    this.#red = range(r, 255)
    return this
  }

  getGreen () {
    return this.#green
  }

  setGreen (g: number) {
    this.#green = range(g, 255)
    return this
  }

  getBlue () {
    return this.#blue
  }

  setBlue (b: number) {
    this.#blue = range(b, 255)
    return this
  }

  getAlpha () {
    return this.#alpha
  }

  setAlpha (a: number) {
    this.#alpha = range(a, 1)
    return this
  }

  toRgbaString (): RgbaColorString {
    return `rgba(${this.#red},${this.#green},${this.#blue},${this.#alpha})`
  }

  /**
   * @deprecated use `toRgbaString()` instead!
   */
  getRgbaColor () {
    return this.toRgbaString()
  }

  toRgbString (): RgbColorString {
    return `rgb(${this.#red},${this.#green},${this.#blue})`
  }

  /**
   * @deprecated use `toRgbString()` insetad!
   */
  getRgbColor () {
    // TODO print deprecation warning
    return this.toRgbString()
  }

  toHexString () {
    return `#${this.#red.toString(16)}${this.#green.toString(16)}${this.#blue.toString(16)}`
  }

  /**
   * @deprecated use `toHexString()` instead!
   */
  getHexColor () {
    // TODO print deprecation warning
    return this.toHexString()
  }
}
