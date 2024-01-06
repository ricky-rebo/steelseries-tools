import FrameDesignModel from "./FrameDesignModel";

import BlackMetalFrameDesign from "./BlackMetalFrameDesign";
import MetalFrameDesign from "./MetalFrameDesign";
import ShinyMetalFrameDesign from "./ShinyMetalFrameDesign";
import BrassFrameDesign from "./BrassFrameDesign";
import SteelFrameDesign from "./SteelFrameDesign";
import ChromeFrameDesign from "./ChromeFrameDesign";
import GoldFrameDesign from "./GoldFrameDesign";
import AnthraciteFrameDesign from "./AnthraciteFrameDesign";
import TiltedGrayFrameDesign from "./TiltedGrayFrameDesign";
import TiltedBlackFrameDesign from "./TiltedBlackFrameDesign";
import GlossyMetalFrameDesign from "./GlossyMetalFrameDesign";

const FrameDesign = {
  BLACK_METAL: BlackMetalFrameDesign,
  METAL: MetalFrameDesign,
  SHINY_METAL: ShinyMetalFrameDesign,
  BRASS: BrassFrameDesign,
  STEEL: SteelFrameDesign,
  CHROME: ChromeFrameDesign,
  GOLD: GoldFrameDesign,
  ANTHRACITE: AnthraciteFrameDesign,
  TILTED_GRAY: TiltedGrayFrameDesign,
  TILTED_BLACK: TiltedBlackFrameDesign,
  GLOSSY_METAL: GlossyMetalFrameDesign,
};

export { FrameDesignModel, FrameDesign };
