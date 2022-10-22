import React from "react";

export declare namespace ISideBar {
  export interface MenuItem {
    menuName: string;
    menuLink: string;
  }

  export interface Props {
    children?: React.ReactNode;
  }
}