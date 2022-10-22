import { useEffect } from "react";
import { useRecoilState } from "recoil";
import ContentArea from "../content-area/content-area.component";
import SideBar from "../side-bar/side-bar.component";
import TopBar from "../top-bar/top-bar.component";
import { commonLayoutModeStateAtom } from "./common-layout.atom";
import styles from "./common-layout.component.module.scss";
import { ICommonLayout } from "./common-layout.interface";

const CommonLayout = (props: ICommonLayout.Props) => {
  const [commonLayoutModeState, setCommonLayoutModeState] = useRecoilState(commonLayoutModeStateAtom);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', onResize);
      onResize();
    }

    function onResize(event?: UIEvent) {
      const windowWidth = window.innerWidth;

      if (windowWidth <= 800) {
        setCommonLayoutModeState('mobile-basic');
      } else {
        setCommonLayoutModeState('pc-basic');
      }
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', onResize);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SideBar />
      <TopBar />
      <ContentArea>
        { props.children }
      </ContentArea>
    </>
  );
};

export default CommonLayout;