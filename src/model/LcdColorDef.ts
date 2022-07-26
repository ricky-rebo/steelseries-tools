export class LcdColorDef {
  gradientStartColor: string;
  gradientFraction1Color: string;
  gradientFraction2Color: string;
  gradientFraction3Color: string;
  gradientStopColor: string;
  textColor: string;

  constructor(gradStartColor: string, gradFraction1Color: string, gradFraction2Color: string, gradFraction3Color: string, gradStopColor: string, textColor: string) {
    this.gradientStartColor = gradStartColor;
    this.gradientFraction1Color = gradFraction1Color;
    this.gradientFraction2Color = gradFraction2Color;
    this.gradientFraction3Color = gradFraction3Color;
    this.gradientStopColor = gradStopColor;
    this.textColor = textColor;
  }
}
