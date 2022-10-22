import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { commonLayoutModeStateAtom } from "../common-layout/common-layout.atom";
import styles from "./top-bar.component.module.scss";
import { ITopBar } from "./top-bar.interface";

const TopBar = (props: ITopBar.Props) => {
  const [commonLayoutModeState, setCommonLayoutModeState] = useRecoilState(commonLayoutModeStateAtom);
  const [isActiveTransition, setIsActiveTransition] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsActiveTransition(true);
    }, 300);
  }, []);

  const hamburgerIconClick = useCallback(() => {
    switch (commonLayoutModeState) {
      case 'pc-basic': setCommonLayoutModeState('pc-side-bar-minimum'); break;
      case 'pc-side-bar-minimum': setCommonLayoutModeState('pc-basic'); break;
      case 'mobile-basic': setCommonLayoutModeState('mobile-side-bar-show'); break;
      case 'mobile-side-bar-show': setCommonLayoutModeState('mobile-basic'); break;
    }
  }, [commonLayoutModeState, setCommonLayoutModeState]);

  return (
    <>
      <div className={[
          styles['top-bar'],
          styles[commonLayoutModeState],
          isActiveTransition ? styles['animation-duration'] : '',
        ].join(' ')}>
        <div className={[
            styles['left-area']
          ].join(' ')}>
          <div className={[
              styles['hamburger-icon']
            ].join(' ')}
            onClick={hamburgerIconClick}>
            <svg id="_레이어_2" data-name="레이어 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20.33 15.43" style={{ width: '18px', fill: '#999' }}>
              <g id="_레이어_1-2" data-name="레이어 1">
                <g>
                  <rect width="20.33" height="2.45"/>
                  <rect y="6.49" width="20.33" height="2.45"/>
                  <rect y="12.99" width="20.33" height="2.45"/>
                </g>
              </g>
            </svg>
          </div>
        </div>
        <div className={[
            styles['right-area']
          ].join(' ')}>

        </div>
      </div>
    </>
  );
};

export default TopBar;