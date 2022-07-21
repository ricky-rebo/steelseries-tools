import { RgbaColor } from '../colors/RgbaColor'
import { BackgroundColorDef, LcdColorDef, ColorDef, LedColorDef } from './color-defs'

export const BackgroundColor = {
  DARK_GRAY: new BackgroundColorDef(
    new RgbaColor(0, 0, 0, 1),
    new RgbaColor(51, 51, 51, 1),
    new RgbaColor(153, 153, 153, 1),
    new RgbaColor(255, 255, 255, 1),
    new RgbaColor(180, 180, 180, 1),
    'DARK_GRAY'
  ),
  SATIN_GRAY: new BackgroundColorDef(
    new RgbaColor(45, 57, 57, 1),
    new RgbaColor(45, 57, 57, 1),
    new RgbaColor(45, 57, 57, 1),
    new RgbaColor(167, 184, 180, 1),
    new RgbaColor(137, 154, 150, 1),
    'SATIN_GRAY'
  ),
  LIGHT_GRAY: new BackgroundColorDef(
    new RgbaColor(130, 130, 130, 1),
    new RgbaColor(181, 181, 181, 1),
    new RgbaColor(253, 253, 253, 1),
    new RgbaColor(0, 0, 0, 1),
    new RgbaColor(80, 80, 80, 1),
    'LIGHT_GRAY'
  ),
  WHITE: new BackgroundColorDef(
    new RgbaColor(255, 255, 255, 1),
    new RgbaColor(255, 255, 255, 1),
    new RgbaColor(255, 255, 255, 1),
    new RgbaColor(0, 0, 0, 1),
    new RgbaColor(80, 80, 80, 1),
    'WHITE'
  ),
  BLACK: new BackgroundColorDef(
    new RgbaColor(0, 0, 0, 1),
    new RgbaColor(0, 0, 0, 1),
    new RgbaColor(0, 0, 0, 1),
    new RgbaColor(255, 255, 255, 1),
    new RgbaColor(150, 150, 150, 1),
    'BLACK'
  ),
  BEIGE: new BackgroundColorDef(
    new RgbaColor(178, 172, 150, 1),
    new RgbaColor(204, 205, 184, 1),
    new RgbaColor(231, 231, 214, 1),
    new RgbaColor(0, 0, 0, 1),
    new RgbaColor(80, 80, 80, 1),
    'BEIGE'
  ),
  BROWN: new BackgroundColorDef(
    new RgbaColor(245, 225, 193, 1),
    new RgbaColor(245, 225, 193, 1),
    new RgbaColor(255, 250, 240, 1),
    new RgbaColor(109, 73, 47, 1),
    new RgbaColor(89, 53, 27, 1),
    'BROWN'
  ),
  RED: new BackgroundColorDef(
    new RgbaColor(198, 93, 95, 1),
    new RgbaColor(212, 132, 134, 1),
    new RgbaColor(242, 218, 218, 1),
    new RgbaColor(0, 0, 0, 1),
    new RgbaColor(90, 0, 0, 1),
    'RED'
  ),
  GREEN: new BackgroundColorDef(
    new RgbaColor(65, 120, 40, 1),
    new RgbaColor(129, 171, 95, 1),
    new RgbaColor(218, 237, 202, 1),
    new RgbaColor(0, 0, 0, 1),
    new RgbaColor(0, 90, 0, 1),
    'GREEN'
  ),
  BLUE: new BackgroundColorDef(
    new RgbaColor(45, 83, 122, 1),
    new RgbaColor(115, 144, 170, 1),
    new RgbaColor(227, 234, 238, 1),
    new RgbaColor(0, 0, 0, 1),
    new RgbaColor(0, 0, 90, 1),
    'BLUE'
  ),
  ANTHRACITE: new BackgroundColorDef(
    new RgbaColor(50, 50, 54, 1),
    new RgbaColor(47, 47, 51, 1),
    new RgbaColor(69, 69, 74, 1),
    new RgbaColor(250, 250, 250, 1),
    new RgbaColor(180, 180, 180, 1),
    'ANTHRACITE'
  ),
  MUD: new BackgroundColorDef(
    new RgbaColor(80, 86, 82, 1),
    new RgbaColor(70, 76, 72, 1),
    new RgbaColor(57, 62, 58, 1),
    new RgbaColor(255, 255, 240, 1),
    new RgbaColor(225, 225, 210, 1),
    'MUD'
  ),
  PUNCHED_SHEET: new BackgroundColorDef(
    new RgbaColor(50, 50, 54, 1),
    new RgbaColor(47, 47, 51, 1),
    new RgbaColor(69, 69, 74, 1),
    new RgbaColor(255, 255, 255, 1),
    new RgbaColor(180, 180, 180, 1),
    'PUNCHED_SHEET'
  ),
  CARBON: new BackgroundColorDef(
    new RgbaColor(50, 50, 54, 1),
    new RgbaColor(47, 47, 51, 1),
    new RgbaColor(69, 69, 74, 1),
    new RgbaColor(255, 255, 255, 1),
    new RgbaColor(180, 180, 180, 1),
    'CARBON'
  ),
  STAINLESS: new BackgroundColorDef(
    new RgbaColor(130, 130, 130, 1),
    new RgbaColor(181, 181, 181, 1),
    new RgbaColor(253, 253, 253, 1),
    new RgbaColor(0, 0, 0, 1),
    new RgbaColor(80, 80, 80, 1),
    'STAINLESS'
  ),
  BRUSHED_METAL: new BackgroundColorDef(
    new RgbaColor(50, 50, 54, 1),
    new RgbaColor(47, 47, 51, 1),
    new RgbaColor(69, 69, 74, 1),
    new RgbaColor(0, 0, 0, 1),
    new RgbaColor(80, 80, 80, 1),
    'BRUSHED_METAL'
  ),
  BRUSHED_STAINLESS: new BackgroundColorDef(
    new RgbaColor(50, 50, 54, 1),
    new RgbaColor(47, 47, 51, 1),
    new RgbaColor(110, 110, 112, 1),
    new RgbaColor(0, 0, 0, 1),
    new RgbaColor(80, 80, 80, 1),
    'BRUSHED_STAINLESS'
  ),
  TURNED: new BackgroundColorDef(
    new RgbaColor(130, 130, 130, 1),
    new RgbaColor(181, 181, 181, 1),
    new RgbaColor(253, 253, 253, 1),
    new RgbaColor(0, 0, 0, 1),
    new RgbaColor(80, 80, 80, 1),
    'TURNED'
  )
}

export const LcdColor = {
  BEIGE: new LcdColorDef(
    '#c8c8b1',
    'rgb(241, 237, 207)',
    'rgb(234, 230, 194)',
    'rgb(225, 220, 183)',
    'rgb(237, 232, 191)',
    '#000000'
  ),
  BLUE: new LcdColorDef(
    '#ffffff',
    'rgb(231, 246, 255)',
    'rgb(170, 224, 255)',
    'rgb(136, 212, 255)',
    'rgb(192, 232, 255)',
    '#124564'
  ),
  ORANGE: new LcdColorDef(
    '#ffffff',
    'rgb(255, 245, 225)',
    'rgb(255, 217, 147)',
    'rgb(255, 201, 104)',
    'rgb(255, 227, 173)',
    '#503700'
  ),
  RED: new LcdColorDef(
    '#ffffff',
    'rgb(255, 225, 225)',
    'rgb(253, 152, 152)',
    'rgb(252, 114, 115)',
    'rgb(254, 178, 178)',
    '#4f0c0e'
  ),
  YELLOW: new LcdColorDef(
    '#ffffff',
    'rgb(245, 255, 186)',
    'rgb(210, 255, 0)',
    'rgb(158, 205, 0)',
    'rgb(210, 255, 0)',
    '#405300'
  ),
  WHITE: new LcdColorDef(
    '#ffffff',
    '#ffffff',
    'rgb(241, 246, 242)',
    'rgb(229, 239, 244)',
    '#ffffff',
    '#000000'
  ),
  GRAY: new LcdColorDef(
    '#414141',
    'rgb(117, 117, 117)',
    'rgb(87, 87, 87)',
    '#414141',
    'rgb(81, 81, 81)',
    '#ffffff'
  ),
  BLACK: new LcdColorDef(
    '#414141',
    '#666666',
    '#333333',
    '#000000',
    '#333333',
    '#cccccc'
  ),
  GREEN: new LcdColorDef(
    'rgb(33, 67, 67)',
    'rgb(33, 67, 67)',
    'rgb(29, 58, 58)',
    'rgb(28, 57, 57)',
    'rgb(23, 46, 46)',
    'rgba(0, 185, 165, 255)'
  ),
  BLUE2: new LcdColorDef(
    'rgb(0, 68, 103)',
    'rgb(8, 109, 165)',
    'rgb(0, 72, 117)',
    'rgb(0, 72, 117)',
    'rgb(0, 68, 103)',
    'rgb(111, 182, 228)'
  ),
  BLUE_BLACK: new LcdColorDef(
    'rgb(22, 125, 212)',
    'rgb(3, 162, 254)',
    'rgb(3, 162, 254)',
    'rgb(3, 162, 254)',
    'rgb(11, 172, 244)',
    '#000000'
  ),
  BLUE_DARKBLUE: new LcdColorDef(
    'rgb(18, 33, 88)',
    'rgb(18, 33, 88)',
    'rgb(19, 30, 90)',
    'rgb(17, 31, 94)',
    'rgb(21, 25, 90)',
    'rgb(23, 99, 221)'
  ),
  BLUE_GRAY: new LcdColorDef(
    'rgb(135, 174, 255)',
    'rgb(101, 159, 255)',
    'rgb(44, 93, 255)',
    'rgb(27, 65, 254)',
    'rgb(12, 50, 255)',
    '#b2b4ed'
  ),
  STANDARD: new LcdColorDef(
    'rgb(131, 133, 119)',
    'rgb(176, 183, 167)',
    'rgb(165, 174, 153)',
    'rgb(166, 175, 156)',
    'rgb(175, 184, 165)',
    'rgb(35, 42, 52)'
  ),
  STANDARD_GREEN: new LcdColorDef(
    '#ffffff',
    'rgb(219, 230, 220)',
    'rgb(179, 194, 178)',
    'rgb(153, 176, 151)',
    'rgb(114, 138, 109)',
    '#080C06'
  ),
  BLUE_BLUE: new LcdColorDef(
    'rgb(100, 168, 253)',
    'rgb(100, 168, 253)',
    'rgb(95, 160, 250)',
    'rgb(80, 144, 252)',
    'rgb(74, 134, 255)',
    '#002cbb'
  ),
  RED_DARKRED: new LcdColorDef(
    'rgb(72, 36, 50)',
    'rgb(185, 111, 110)',
    'rgb(148, 66, 72)',
    'rgb(83, 19, 20)',
    'rgb(7, 6, 14)',
    '#FE8B92'
  ),
  DARKBLUE: new LcdColorDef(
    'rgb(14, 24, 31)',
    'rgb(46, 105, 144)',
    'rgb(19, 64, 96)',
    'rgb(6, 20, 29)',
    'rgb(8, 9, 10)',
    '#3DB3FF'
  ),
  LILA: new LcdColorDef(
    'rgb(175, 164, 255)',
    'rgb(188, 168, 253)',
    'rgb(176, 159, 255)',
    'rgb(174, 147, 252)',
    'rgb(168, 136, 233)',
    '#076148'
  ),
  BLACKRED: new LcdColorDef(
    'rgb(8, 12, 11)',
    'rgb(10, 11, 13)',
    'rgb(11, 10, 15)',
    'rgb(7, 13, 9)',
    'rgb(9, 13, 14)',
    '#B50026'
  ),
  DARKGREEN: new LcdColorDef(
    'rgb(25, 85, 0)',
    'rgb(47, 154, 0)',
    'rgb(30, 101, 0)',
    'rgb(30, 101, 0)',
    'rgb(25, 85, 0)',
    '#233123'
  ),
  AMBER: new LcdColorDef(
    'rgb(182, 71, 0)',
    'rgb(236, 155, 25)',
    'rgb(212, 93, 5)',
    'rgb(212, 93, 5)',
    'rgb(182, 71, 0)',
    '#593A0A'
  ),
  LIGHTBLUE: new LcdColorDef(
    'rgb(125, 146, 184)',
    'rgb(197, 212, 231)',
    'rgb(138, 155, 194)',
    'rgb(138, 155, 194)',
    'rgb(125, 146, 184)',
    '#090051'
  ),
  SECTIONS: new LcdColorDef(
    '#b2b2b2',
    '#ffffff',
    '#c4c4c4',
    '#c4c4c4',
    '#b2b2b2',
    '#000000'
  )
}

export const Color = {
  RED: new ColorDef(
    new RgbaColor(82, 0, 0, 1),
    new RgbaColor(158, 0, 19, 1),
    new RgbaColor(213, 0, 25, 1),
    new RgbaColor(240, 82, 88, 1),
    new RgbaColor(255, 171, 173, 1),
    new RgbaColor(255, 217, 218, 1)
  ),
  GREEN: new ColorDef(
    new RgbaColor(8, 54, 4, 1),
    new RgbaColor(0, 107, 14, 1),
    new RgbaColor(15, 148, 0, 1),
    new RgbaColor(121, 186, 37, 1),
    new RgbaColor(190, 231, 141, 1),
    new RgbaColor(234, 247, 218, 1)
  ),
  BLUE: new ColorDef(
    new RgbaColor(0, 11, 68, 1),
    new RgbaColor(0, 73, 135, 1),
    new RgbaColor(0, 108, 201, 1),
    new RgbaColor(0, 141, 242, 1),
    new RgbaColor(122, 200, 255, 1),
    new RgbaColor(204, 236, 255, 1)
  ),
  ORANGE: new ColorDef(
    new RgbaColor(118, 83, 30, 1),
    new RgbaColor(215, 67, 0, 1),
    new RgbaColor(240, 117, 0, 1),
    new RgbaColor(255, 166, 0, 1),
    new RgbaColor(255, 255, 128, 1),
    new RgbaColor(255, 247, 194, 1)
  ),
  YELLOW: new ColorDef(
    new RgbaColor(41, 41, 0, 1),
    new RgbaColor(102, 102, 0, 1),
    new RgbaColor(177, 165, 0, 1),
    new RgbaColor(255, 242, 0, 1),
    new RgbaColor(255, 250, 153, 1),
    new RgbaColor(255, 252, 204, 1)
  ),
  CYAN: new ColorDef(
    new RgbaColor(15, 109, 109, 1),
    new RgbaColor(0, 109, 144, 1),
    new RgbaColor(0, 144, 191, 1),
    new RgbaColor(0, 174, 239, 1),
    new RgbaColor(153, 223, 249, 1),
    new RgbaColor(204, 239, 252, 1)
  ),
  MAGENTA: new ColorDef(
    new RgbaColor(98, 0, 114, 1),
    new RgbaColor(128, 24, 72, 1),
    new RgbaColor(191, 36, 107, 1),
    new RgbaColor(255, 48, 143, 1),
    new RgbaColor(255, 172, 210, 1),
    new RgbaColor(255, 214, 23, 1)
  ),
  WHITE: new ColorDef(
    new RgbaColor(210, 210, 210, 1),
    new RgbaColor(220, 220, 220, 1),
    new RgbaColor(235, 235, 235, 1),
    new RgbaColor(255, 255, 255, 1),
    new RgbaColor(255, 255, 255, 1),
    new RgbaColor(255, 255, 255, 1)
  ),
  GRAY: new ColorDef(
    new RgbaColor(25, 25, 25, 1),
    new RgbaColor(51, 51, 51, 1),
    new RgbaColor(76, 76, 76, 1),
    new RgbaColor(128, 128, 128, 1),
    new RgbaColor(204, 204, 204, 1),
    new RgbaColor(243, 243, 243, 1)
  ),
  BLACK: new ColorDef(
    new RgbaColor(0, 0, 0, 1),
    new RgbaColor(5, 5, 5, 1),
    new RgbaColor(10, 10, 10, 1),
    new RgbaColor(15, 15, 15, 1),
    new RgbaColor(20, 20, 20, 1),
    new RgbaColor(25, 25, 25, 1)
  ),
  RAITH: new ColorDef(
    new RgbaColor(0, 32, 65, 1),
    new RgbaColor(0, 65, 125, 1),
    new RgbaColor(0, 106, 172, 1),
    new RgbaColor(130, 180, 214, 1),
    new RgbaColor(148, 203, 242, 1),
    new RgbaColor(191, 229, 255, 1)
  ),
  GREEN_LCD: new ColorDef(
    new RgbaColor(0, 55, 45, 1),
    new RgbaColor(15, 109, 93, 1),
    new RgbaColor(0, 185, 165, 1),
    new RgbaColor(48, 255, 204, 1),
    new RgbaColor(153, 255, 227, 1),
    new RgbaColor(204, 255, 241, 1)
  ),
  JUG_GREEN: new ColorDef(
    new RgbaColor(0, 56, 0, 1),
    new RgbaColor(32, 69, 36, 1),
    new RgbaColor(50, 161, 0, 1),
    new RgbaColor(129, 206, 0, 1),
    new RgbaColor(190, 231, 141, 1),
    new RgbaColor(234, 247, 218, 1)
  )
}

export const LedColor = {
  RED_LED: new LedColorDef(
    '#FF9A89',
    '#FF9A89',
    '#FF3300',
    '#FF8D70',
    '#7E1C00',
    '#7E1C00',
    '#641B00'
  ),
  GREEN_LED: new LedColorDef(
    '#9AFF89',
    '#9AFF89',
    '#59FF2A',
    '#A5FF00',
    '#1C7E00',
    '#1C7E00',
    '#1B6400'
  ),
  BLUE_LED: new LedColorDef(
    '#899AFF',
    '#899AFF',
    '#0033FF',
    '#708DFF',
    '#001C7E',
    '#001C7E',
    '#001B64'
  ),
  ORANGE_LED: new LedColorDef(
    '#FEA23F',
    '#FEA23F',
    '#FD6C00',
    '#FD6C00',
    '#592800',
    '#592800',
    '#421F00'
  ),
  YELLOW_LED: new LedColorDef(
    '#FFFF62',
    '#FFFF62',
    '#FFFF00',
    '#FFFF00',
    '#6B6D00',
    '#6B6D00',
    '#515300'
  ),
  CYAN_LED: new LedColorDef(
    '#00FFFF',
    '#00FFFF',
    '#1BC3C3',
    '#00FFFF',
    '#083B3B',
    '#083B3B',
    '#052727'
  ),
  MAGENTA_LED: new LedColorDef(
    '#D300FF',
    '#D300FF',
    '#8600CB',
    '#C300FF',
    '#38004B',
    '#38004B',
    '#280035'
  )
}
