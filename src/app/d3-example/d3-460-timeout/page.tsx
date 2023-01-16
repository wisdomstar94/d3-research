"use client"
import { timeout } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-460-timeout</title>
        <meta name="description" content="d3-460-timeout 예시 코드 페이지입니다." />
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
      d3.timeout 함수는 지정한 콜백을 호출하여 새 타이머를 예약하고 반환합니다. 
      타이머는 첫 번째 콜백 시 자동으로 중지됩니다. 콜백은 타이머가 활성화된 이후 경과된 시간을 통과합니다.
    */
    const timer = timeout(() => {
      console.log('2초후 실행!');
    }, 2000);
    console.log(`timer`, timer);
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
