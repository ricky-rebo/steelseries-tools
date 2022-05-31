class TypeDef {
  type: string
  constructor (type: string) { this.type = type }
}


export class GaugeTypeDef extends TypeDef {
  freeAreaAngle: number
  rotationOffset: number
  angleRange: number

  constructor (type: string, freeAreaAngle: number, rotationOffset: number, angleRange: number) {
    super(type)
    this.freeAreaAngle = freeAreaAngle
    this.rotationOffset = rotationOffset
    this.angleRange = angleRange
  }
}

export class OrientationDef extends TypeDef {}

export class KnobTypeDef extends TypeDef {}

export class KnobStyleDef {
  style: string
  constructor (style: string) { this.style = style }
}

export class FrameDesignDef {
  design: string
  constructor (design: string) { this.design = design }
}

export class PointerTypeDef extends TypeDef {}

export class ForegroundTypeDef extends TypeDef {}

export class LabelNumberFormatDef {
  format: string
  constructor (format: string) { this.format = format }
}

export class TickLabelOrientationDef extends TypeDef {}

export class TrendStateDef {
  state: string
  constructor (state: string) { this.state = state }
}
