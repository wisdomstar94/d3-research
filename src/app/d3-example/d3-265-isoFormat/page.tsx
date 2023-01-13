"use client"
import { isoFormat } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";



const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-265-isoFormat</title>
        <meta name="description" content="d3-265-isoFormat 예시 코드 페이지입니다." />
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
      d3.isoFormat 함수는 전체 ISO 8601 UTC 시간 형식. 
      가능한 경우 이 메서드는 Date.toISOstring을 사용하여 형식을 지정합니다.
    */

    const date = new Date();

    const format1 = isoFormat(date);
    const format2 = date.toISOString();
    console.log(`format1`, format1);
    console.log(`format2`, format2);
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
