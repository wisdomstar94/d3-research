"use client"
import { pointers, select } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-304-pointers</title>
        <meta name="description" content="d3-304-pointers 예시 코드 페이지입니다." />
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
      d3.pointers 함수는 지정한 대상을 기준으로 지정한 이벤트의 포인터 위치 
      좌표 배열 [x0, y0], [x1, y1]…]을 반환합니다. 
      터치 이벤트의 경우 반환되는 위치 배열이 이벤트에 해당합니다. 배열을 터치합니다. 
      다른 이벤트의 경우 단일 변수 배열을 반환합니다.
    */
    select(boxElementRef.current)
      .on("click", (e) => {
        const point = pointers(e);
        console.log('point', point);
      })
    ;
    // 모바일같은 경우는 멀티 터치가 되다보니 그럴 때 사용하는 것 같음!
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
