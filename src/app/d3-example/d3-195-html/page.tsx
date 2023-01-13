"use client"
import { html } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://www.geeksforgeeks.org/d3-js-html-function/

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-195-html</title>
        <meta name="description" content="d3-195-html 예시 코드 페이지입니다." />
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
      d3.html 함수는 HTML 유형의 파일을 가져오고 읽는 데 사용됩니다. 
      먼저 파일을 텍스트로 가져온 다음 파일을 HTML로 구문 분석합니다.
    */
    
    html("/d3-example/d3-195-html/sample").then((response) => {
      console.log('typeof response', typeof response); // object
      console.log(`Object.keys(response)`, Object.keys(response));
      console.log('response', response);
      const h2Text = response.querySelector('h2')?.innerText;
      console.log(`h2Text`, h2Text);
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
