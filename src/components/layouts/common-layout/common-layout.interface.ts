import React from "react";

export declare namespace ICommonLayout {
  export type layoutMode = 
    'pc-basic' |
    'pc-side-bar-minimum' | 
    'mobile-basic' | 
    'mobile-side-bar-show'
  ;

  export interface Props {
    children?: React.ReactNode;
  }
}