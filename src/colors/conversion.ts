import { RgbaColor } from "./RgbaColor";

export function hexToRgba (hexString: string, alpha: number) {
  return RgbaColor.fromHexString(hexString, alpha).toRgbaString()
}