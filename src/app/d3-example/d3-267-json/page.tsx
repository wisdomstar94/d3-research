"use client"
import { json } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://www.geeksforgeeks.org/d3-js-json-function/

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-267-json</title>
        <meta name="description" content="d3-267-json 예시 코드 페이지입니다." />
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
      d3.json 함수는 JSON 파일을 가져오는 데 사용됩니다. 
      이 함수에 초기화 매개변수가 있으면 가져오기 작업과 함께 호출됩니다.
    */

    json("/json/sample.json").then((d) => {
      console.log('d', d);
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
