"use client"
import { utcTicks } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://devdocs.io/d3~7/d3-time#utcticks

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-507-utcTicks</title>
        <meta name="description" content="d3-507-utcTicks 예시 코드 페이지입니다." />
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
      d3.utcTicks 함수는 시작과 중지 사이의 규칙적인 간격(포함)으로 대략적인 카운트 날짜 배열을 반환합니다. 
      중지가 시작 전인 경우 날짜가 역순으로 반환되고, 그렇지 않은 경우 날짜가 시간순으로 반환됩니다.
    */

    const start = new Date(Date.UTC(1970, 2, 1))
    const stop = new Date(Date.UTC(1996, 2, 19))
    const count = 4
    const reuslt = utcTicks(start, stop, count); // [1975-01-01, 1980-01-01, 1985-01-01, 1990-01-01, 1995-01-01]
    console.log(`reuslt`, reuslt);
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
