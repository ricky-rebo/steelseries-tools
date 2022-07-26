import { HALF_PI, PI, RAD_FACTOR, TWO_PI } from '../../shared';
import { GaugeTypeDef } from "../../model/GaugeTypeDef";


export const GaugeType = {
  TYPE1: new GaugeTypeDef('type1', 0, PI, HALF_PI),
  TYPE2: new GaugeTypeDef('type2', 0, PI, PI),
  TYPE3: new GaugeTypeDef('type3', 0, HALF_PI, PI + 1.5),
  TYPE4: new GaugeTypeDef('type4', RAD_FACTOR * 60, HALF_PI + (RAD_FACTOR * 60) / 2, TWO_PI - (RAD_FACTOR * 60)),
  TYPE5: new GaugeTypeDef('type5', 0, 0, 0)
};
