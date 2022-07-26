import { TypeDef } from "./TypeDef";

export class GaugeTypeDef extends TypeDef {
  freeAreaAngle: number;
  rotationOffset: number;
  angleRange: number;

  constructor(type: string, freeAreaAngle: number, rotationOffset: number, angleRange: number) {
    super(type);
    this.freeAreaAngle = freeAreaAngle;
    this.rotationOffset = rotationOffset;
    this.angleRange = angleRange;
  }
}
