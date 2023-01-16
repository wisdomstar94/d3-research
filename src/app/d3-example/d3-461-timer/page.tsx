"use client"
import { timer } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-461-timer</title>
        <meta name="description" content="d3-461-timer 예시 코드 페이지입니다." />
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
      d3.timer 함수는 새 타이머를 예약하고 반환합니다. 
      타이머가 중지될 때까지 지정된 콜백을 반복적으로 호출합니다. 
      콜백은 타이머가 활성화된 이후 경과된 시간을 통과합니다.
    */
    const tm = timer(() => {
      console.log(`반복적으로 계속 실행!`);
    }, 2000);
    console.log(`tm`, tm);
    setTimeout(() => {
      tm.stop();
    }, 4000);
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
