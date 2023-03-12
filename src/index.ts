// Structure Layer
export { drawFrame } from "./functions/structure/drawFrame"
export { drawBackground } from "./functions/structure/drawBackground";
export { drawCustomLayer } from "./functions/structure/drawCustomLayer";
export { drawForeground } from "./functions/structure/drawForeground"
export { drawKnob } from "./functions/structure/drawKnob";
export { createKnobImage } from "./functions/structure/createKnobImage";

export { drawLinearFrame } from "./functions/structure/drawLinearFrame";
export { drawLinearBackground } from "./functions/structure/drawLinearBackground";
export { drawLinearForeground } from "./functions/structure/drawLinearForeground";

// Data Visualization Layer
export { drawStrings } from "./functions/data-visualization/drawStrings";
export { drawTickmarks } from "./functions/data-visualization/drawTickmarks";
export { drawTickmarkLables } from "./functions/data-visualization/drawTickmarkLables";

export { drawLinearStrings } from "./functions/data-visualization/drawLinearStrings";
export { drawLinearTickmarks } from "./functions/data-visualization/drawLinearTickmarks";

// Pointers
export { drawPointerImage } from "./functions/pointers/drawPointerImage";
export { createIndicatorImage } from "./functions/pointers/createIndicatorImage";
export { drawLinearIndicator } from "./functions/pointers/drawLinearIndicator"; // Rimuovere ???


// ***** TO BE REMOVED *****
export { createLcdBackgroundImage } from "./__to_be_removed/createLcdBackgroundImage";
export { createLedImage } from "./__to_be_removed/createLedImage";
export { createTrendIndicator } from "./__to_be_removed/createTrendIndicator";
export { drawActiveBargraphLed } from "./__to_be_removed/drawActiveBargraphLed";
export { drawRoseImage } from "./__to_be_removed/drawRoseImage";

// Enums
export { BackgroundColor } from "./enums/colors/BackgroundColor";
export { Color } from "./enums/colors/Color";
export { LcdColor } from "./enums/colors/LcdColor";
export { LedColor } from "./enums/colors/LedColor";

export { GaugeType } from "./enums/types/GaugeType";
export { Orientation } from "./enums/types/Orientation";
export { KnobType } from "./enums/types/KnobType";
export { KnobStyle } from "./enums/types/KnobStyle";
export { FrameDesign } from "./enums/types/FrameDesign";
export { PointerType } from "./enums/types/PointerType";
export { ForegroundType } from "./enums/types/ForegroundType";
export { LabelNumberFormat } from "./enums/types/LabelNumberFormat";
export { TickLabelOrientation } from "./enums/types/TickLabelOrientation";
export { TrendState } from "./enums/types/TrendState";

// Models
export { RgbaColor } from "./model/RgbaColor";
export { Gradient } from "./model/Gradient";
export { ConicalGradient } from "./model/ConicalGradient";

export { ColorDef } from "./model/ColorDef";
export { BackgroundColorDef } from "./model/BackgroundColorDef";
export { LcdColorDef } from "./model/LcdColorDef";
export { LedColorDef } from "./model/LedColorDef";

export { FrameDesignDef } from "./model/FrameDesignDef";
export { ForegroundTypeDef } from "./model/ForegroundTypeDef";
export { GaugeTypeDef } from "./model/GaugeTypeDef";
export { KnobTypeDef } from "./model/KnobTypeDef";
export { KnobStyleDef } from "./model/KnobStyleDef";
export { LabelNumberFormatDef } from "./model/LabelNumberFormatDef";
export { OrientationDef } from "./model/OrientationDef";
export { PointerTypeDef } from "./model/PointerTypeDef";
export { TickLabelOrientationDef } from "./model/TickLabelOrientationDef";
export { TrendStateDef } from "./model/TrendStateDef";

// Constants
export * as consts from "./shared"; 

// Legacy
export * as legacy from "./legacy";

// Helpers
// TODO valutare quali helper esportare
