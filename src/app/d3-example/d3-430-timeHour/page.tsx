"use client"
import { timeHour } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-430-timeHour</title>
        <meta name="description" content="d3-430-timeHour 예시 코드 페이지입니다." />
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
      d3.timeHour 함수는 시간 간격(현지 시간); 시간(예: 01:00 AM); 60분.

      현지 시간으로 시간을 한 시간 앞당기면 일광 절약 시간으로 인해 동일한 시간이 반환되거나 한 시간을 건너뛸 수 있습니다.
    */
    console.log(`timeHour(new Date())`, timeHour(new Date()));
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
