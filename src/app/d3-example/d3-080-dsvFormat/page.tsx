"use client"
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { dsvFormat } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://devdocs.io/d3~7/d3-dsv#dsvformat
// https://runebook.dev/ko/docs/d3/d3-dsv

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-080-dsvFormat</title>
        <meta name="description" content="d3-080-dsvFormat 예시 코드 페이지입니다." />
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
      d3.dsvFormat 지정된 구분 기호에 대해 새 DSV 구문 분석기와 포맷터를 구성합니다. 
      구분 기호는 단일 문자(즉, 단일 16비트 코드 단위)여야 하므로 ASCII 구분 기호는 괜찮지만 이모티콘 구분 기호는 그렇지 않습니다.
    */

    const psv = dsvFormat(',');
    const data = psv.parse(`x,y,name
10,3,apple
20,6,banana
30,9,melon
40,12,kiwi
50,15,grape`);
    console.log('data', data);
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
