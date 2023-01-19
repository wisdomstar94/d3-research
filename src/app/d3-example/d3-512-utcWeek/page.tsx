"use client"
import { utcWeek } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-512-utcWeek</title>
        <meta name="description" content="d3-512-utcWeek 예시 코드 페이지입니다." />
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
      d3.utcWeek 함수는 d3.timeSunday의 별칭으로, 7일이며 일반적으로 168시간입니다. 
      현지 시간으로 주간은 일광 절약 시간으로 인해 167시간에서 169시간 사이가 될 수 있습니다.
    */
    const result = utcWeek(new Date);
    console.log(`result`, result);
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
