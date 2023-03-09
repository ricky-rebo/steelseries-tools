// Structure Layer
export { drawFrame } from "./functions/structure/drawFrame"
export { drawBackground } from "./functions/structure/drawBackground";
export { drawForeground } from "./functions/structure/drawForeground"
export { drawKnob } from "./functions/structure/drawKnob";
export { drawCustomLayer } from "./functions/structure/drawCustomLayer";

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
export { createMeasuredValuePointerImage as createMeasuredValueImage } from "./functions/pointers/createMeasuredValuePointerImage";
export { createThresholdPointerImage as createThresholdImage } from "./functions/pointers/createThresholdPointerImage";
export { createTrendIndicator } from "./functions/pointers/createTrendIndicator"; // Rimuovere ???
export { drawLinearIndicator } from "./functions/pointers/drawLinearIndicator"; // Rimuovere ???
export { drawPointerImage } from "./functions/pointers/drawPointerImage";

// ***** TO BE REMOVED *****
export { createLcdBackgroundImage } from "./__to_be_removed/createLcdBackgroundImage";
export { createLedImage } from "./__to_be_removed/createLedImage";
export { drawActiveBargraphLed } from "./__to_be_removed/drawActiveBargraphLed";
export { drawRoseImage } from "./__to_be_removed/drawRoseImage";

// Enums
export { BackgroundColor } from "./enums/colors/BackgroundColor";
export { Color as ColorDef } from "./enums/colors/Color";
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

// Legacy
export { 
  OLD__drawLinearTickmarksImage,
  OLD__drawRadialTickmarksImage,
  OLD__drawTitleImage
} from "./functions/data-visualization/legacy";
export {
  OLD__createMeasuredValueImage,
  OLD__createThresholdImage,
  OLD__drawLinearIndicator,
  OLD__drawPointerImage,
} from "./functions/pointers/legacy";
export {
  OLD__drawBackgroun,
  OLD__drawForeground,
  OLD__drawFrame,
  OLD__drawLinearBackgroundImage,
  OLD__drawLinearForegroundImage,
  OLD__drawLinearFrameImage,
} from "./functions/structure/legacy";

// Helpers
// TODO valutare quali helper esportare
