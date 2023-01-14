"use client"
import { namespace } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://www.geeksforgeeks.org/d3-js-namespace-function/

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-289-namespace</title>
        <meta name="description" content="d3-289-namespace 예시 코드 페이지입니다." />
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
      d3.namespace 함수는 전체 네임스페이스 URL과 로컬 이름을 설명하는 로컬 속성과 
      공백이 포함된 객체를 반환하는 데 사용됩니다. 
      이름에 콜론이 있으면 콜론 왼쪽에 있는 문자열이 네임스페이스 접두사입니다.
    */
    
    console.log(`namespace("svg:a")`, namespace("svg:text"));
    console.log(`namespace("xml:b")`, namespace("xml:div"));
    console.log(`namespace("xhtml:c")`, namespace("xhtml:span"));
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
