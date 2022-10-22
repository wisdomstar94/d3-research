import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { commonLayoutModeStateAtom } from "../common-layout/common-layout.atom";
import styles from "./content-area.component.module.scss";
import { IContentArea } from "./content-area.interface";

const ContentArea = (props: IContentArea.Props) => {
  const [commonLayoutModeState, setCommonLayoutModeState] = useRecoilState(commonLayoutModeStateAtom);
  const [isActiveTransition, setIsActiveTransition] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsActiveTransition(true);
    }, 300);
  }, []);

  return (
    <>
      <div className={[
          styles['content-area'],
          styles[commonLayoutModeState],
          isActiveTransition ? styles['animation-duration'] : '',
        ].join(' ')}>
        { props.children }
      </div>
    </>
  );
};

export default ContentArea;