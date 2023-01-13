"use client"
import { isoParse } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-266-isoParse</title>
        <meta name="description" content="d3-266-isoParse 예시 코드 페이지입니다." />
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
      d3.isoParse 함수는 전체 ISO 8601 UTC 시간 파서. 
      가능한 경우,이 메소드는 Date 생성자 를 사용하여 문자열을 구문 분석합니다. 
      ISO 8601에 따라 입력 형식의 엄격한 유효성 검사에 의존하는 경우 UTC 구문 분석기 함수를 구성해야 합니다 .

      2023-01-13T12:27:38.605Z
    */

    const date = isoParse('2023-01-13T12:27:38.605Z');
    console.log('date', date);
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
