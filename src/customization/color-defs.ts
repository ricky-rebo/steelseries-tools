import { RgbaColor } from "../colors/RgbaColor"

export class BackgroundColorDef {
  gradientStart: RgbaColor
  gradientFraction: RgbaColor
  gradientStop: RgbaColor
  labelColor: RgbaColor
  symbolColor: RgbaColor
  name: string
  
  constructor (gradStart: RgbaColor, gradFraction: RgbaColor, gradStop: RgbaColor, labelColor: RgbaColor, symbolColor: RgbaColor, name: string) {
    this.gradientStart = gradStart
    this.gradientFraction = gradFraction
    this.gradientStop = gradStop
    this.labelColor = labelColor
    this.symbolColor = symbolColor
    this.name = name
  }
}


export class LcdColorDef {
  gradientStartColor: string
  gradientFraction1Color: string
  gradientFraction2Color: string
  gradientFraction3Color: string
  gradientStopColor: string
  textColor: string

  constructor(gradStartColor: string, gradFraction1Color: string, gradFraction2Color: string, gradFraction3Color: string, gradStopColor: string, textColor: string) {
    this.gradientStartColor = gradStartColor
    this.gradientFraction1Color = gradFraction1Color
    this.gradientFraction2Color = gradFraction2Color
    this.gradientFraction3Color = gradFraction3Color
    this.gradientStopColor = gradStopColor
    this.textColor = textColor
  }
}


export class ColorDef {
  veryDark: RgbaColor
  dark: RgbaColor
  medium: RgbaColor
  light: RgbaColor
  lighter: RgbaColor
  veryLight: RgbaColor

  constructor (veryDark: RgbaColor, dark: RgbaColor, medium: RgbaColor, light: RgbaColor, lighter: RgbaColor, veryLight: RgbaColor) {
    this.veryDark = veryDark
    this.dark = dark
    this.medium = medium
    this.light = light
    this.lighter = lighter
    this.veryLight = veryLight
  }
}


export class LedColorDef {
  innerColor1_ON: string
  innerColor2_ON: string
  outerColor_ON: string
  coronaColor: string
  innerColor1_OFF: string
  innerColor2_OFF: string
  outerColor_OFF: string

  constructor (
    innerColor1_ON: string, innerColor2_ON: string,
    outerColor_ON: string,
    coronaColor: string,
    innerColor1_OFF: string, innerColor2_OFF: string,
    outerColor_OFF: string
  ) {
    this.innerColor1_ON = innerColor1_ON
    this.innerColor2_ON = innerColor2_ON
    this.outerColor_ON = outerColor_ON
    this.coronaColor = coronaColor
    this.innerColor1_OFF = innerColor1_OFF
    this.innerColor2_OFF = innerColor2_OFF
    this.outerColor_OFF = outerColor_OFF
  }
}
