export class LedColorDef {
  innerColor1_ON: string;
  innerColor2_ON: string;
  outerColor_ON: string;
  coronaColor: string;
  innerColor1_OFF: string;
  innerColor2_OFF: string;
  outerColor_OFF: string;

  constructor(
    innerColor1_ON: string, innerColor2_ON: string,
    outerColor_ON: string,
    coronaColor: string,
    innerColor1_OFF: string, innerColor2_OFF: string,
    outerColor_OFF: string
  ) {
    this.innerColor1_ON = innerColor1_ON;
    this.innerColor2_ON = innerColor2_ON;
    this.outerColor_ON = outerColor_ON;
    this.coronaColor = coronaColor;
    this.innerColor1_OFF = innerColor1_OFF;
    this.innerColor2_OFF = innerColor2_OFF;
    this.outerColor_OFF = outerColor_OFF;
  }
}
