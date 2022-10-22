import React from "react";

const RootComponent: React.FC<{ children: React.ReactNode; }> = (props) => {
  return (
    <>
      {props.children}
    </>
  );
};

export default RootComponent;
