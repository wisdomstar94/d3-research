"use client"
import { tsv } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://www.geeksforgeeks.org/d3-js-tsv-function/

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-473-tsv</title>
        <meta name="description" content="d3-473-tsv 예시 코드 페이지입니다." />
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
      d3.tsv 함수는  ".tsv" 파일 또는 "tab" 문자를 구분 기호로 사용하는 파일을 읽는 데 사용됩니다. 
      함수에서 "init" 가 지정되면 주어진 함수 호출을 가져오고 통과합니다.
    */
    tsv("/tsv/sample.tsv", (d) => d).then((data) => {
      console.log(`data`, data);
      // data.forEach((item) => {
      //   console.log('item', item);
      // });
    }); 
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
