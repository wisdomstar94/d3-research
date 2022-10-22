import { atom } from "recoil";
import { ICommonLayout } from "./common-layout.interface";

export const commonLayoutModeStateAtom = atom({
  key: 'commonLayoutModeState',
  default: 'mobile-basic' as ICommonLayout.layoutMode,
});
