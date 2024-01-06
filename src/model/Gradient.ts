import { getColorFromFraction } from "../helpers/colors";
import { RgbaColor } from "./RgbaColor";

export class Gradient {
  #start: number;
  #end: number;
  #fractions: Array<number>;
  #colors: Array<RgbaColor>;

  constructor(start: number, end: number, fractions: Array<number>, colors: Array<RgbaColor>) {
    this.#start = start;
    this.#end = end;
    this.#fractions = fractions;
    this.#colors = colors;
  }

  getColorAt(fraction: number) {
    let lowerLimit = 0;
    let lowerIndex = 0;
    let upperLimit = 1;
    let upperIndex = 1;
    let i;

    fraction = fraction < 0 ? 0 : fraction > 1 ? 1 : fraction;

    for (i = 0; i < this.#fractions.length; i++) {
      if (this.#fractions[i] < fraction && lowerLimit < this.#fractions[i]) {
        lowerLimit = this.#fractions[i];
        lowerIndex = i;
      }
      if (this.#fractions[i] === fraction) {
        return this.#colors[i];
      }
      if (this.#fractions[i] > fraction && upperLimit >= this.#fractions[i]) {
        upperLimit = this.#fractions[i];
        upperIndex = i;
      }
    }

    return getColorFromFraction(
      this.#colors[lowerIndex],
      this.#colors[upperIndex],
      1,
      (fraction - lowerLimit) / (upperLimit - lowerLimit)
    );
  }

  getStart() {
    return this.#start;
  }

  getEnd() {
    return this.#end;
  }

  getRange() {
    return this.#end - this.#start;
  }
}
