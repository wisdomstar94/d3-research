"use client"
import { timeParse } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://observablehq.com/@embracelife/d3-timeparse-specifier

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-441-timeParse</title>
        <meta name="description" content="d3-441-timeParse 예시 코드 페이지입니다." />
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
      d3.timeParse 함수는 지정한 문자열 지정자에 대한 새 파서를 반환합니다.

      기본 로케일에서 locale.parse(TimeLocaleObject.parse)에 대한 별칭입니다.
    */
    const parser = timeParse("%Y-%m-%dT%H:%M:%SZ");
    const result = parser("2011-07-01T19:15:28Z");
    console.log('result', result);
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
