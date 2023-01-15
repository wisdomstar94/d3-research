"use client"
import { timeFormat } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-425-timeFormat</title>
        <meta name="description" content="d3-425-timeFormat 예시 코드 페이지입니다." />
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
      d3.timeFormat 함수는 지정한 문자열 지정자에 대한 새 형식 지정자를 반환합니다. 
      반환된 함수는 지정된 날짜를 포맷하고 해당 문자열을 반환합니다.

      로케일의 별칭입니다.형식(TimeLocaleObject).format)을 기본 로케일에 표시합니다.
    */
    const format = timeFormat('%Y-%m-%d %H:%M:%S');
    console.log(`format(new Date())`, format(new Date()));
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
