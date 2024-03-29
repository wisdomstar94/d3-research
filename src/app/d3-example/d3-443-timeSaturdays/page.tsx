"use client"
import { timeSaturdays } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-443-timeSaturdays</title>
        <meta name="description" content="d3-443-timeSaturdays 예시 코드 페이지입니다." />
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
      d3.timeSaturdays 함수는 timeSaturday.range(...)에 대한 편의 별칭입니다.
    */
    const dates = timeSaturdays(new Date('2023-01-01 00:00:00'), new Date('2023-05-09 15:24:57'), 3);
    console.log(`dates`, dates);
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
