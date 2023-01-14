"use client"
import { pointer, select } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-303-pointer</title>
        <meta name="description" content="d3-303-pointer 예시 코드 페이지입니다." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CommonLayout>
        <PageContents />
      </CommonLayout>
    </>
  );
};

const PageContents = () => {
  const boxElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    while (boxElementRef.current?.hasChildNodes() === true) {
      if (boxElementRef.current?.firstChild !== null) {
        boxElementRef.current?.removeChild(boxElementRef.current?.firstChild);
      }
    }

    /*
      d3.pointer 함수는 지정된 대상에 상대적인 지정된 이벤트의 좌표를 나타내는 
      숫자 [x, y]의 두 요소 배열을 반환합니다. 
      이벤트는 마우스 이벤트, 포인터 이벤트, 터치 또는 UIEvent를 이벤트로 포함하는 사용자 지정 이벤트일 수 있습니다.
      sourceEvent.

      대상을 지정하지 않으면 소스 이벤트의 currentTarget 속성(사용 가능한 경우)이 기본값으로 설정됩니다. 
      대상이 SVG 요소인 경우 이벤트의 좌표는 화면 좌표 변환 행렬의 역방향을 사용하여 변환됩니다. 
      대상이 HTML 요소인 경우 이벤트의 좌표는 대상의 경계 클라이언트 직사각형의 왼쪽 상단 모서리에 상대적으로 변환됩니다. 
      (따라서 좌표계는 클라이언트 좌표에 대해서만 변환할 수 있습니다. 지오메트리 유틸리티를 참조하십시오.) 
      그렇지 않으면 [event.pageX, event.pageY]가 반환됩니다.
    */
    select(boxElementRef.current)
      .on("click", (e) => {
        const point = pointer(e);
        console.log('point', point);
      })
    ;
    // event 객체를 넘기면 이벤트가 발생된 좌표를 가져올 수 있다!
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
