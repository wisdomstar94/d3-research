"use client"
import { selectorAll } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-376-selectorAll</title>
        <meta name="description" content="d3-376-selectorAll 예시 코드 페이지입니다." />
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
      d3.selectorAll 실행 시 지정한 선택기가 지정된 경우 
      지정한 선택기와 일치하는 이 요소의 모든 하위 항목을 반환하는 함수를 반환합니다. 
      이 방법은 선택에 의해 내부적으로 사용됩니다.모두를 선택합니다.
    */

    const mySelector = selectorAll('div');
    (document as any).mySelector = mySelector;
    console.log(`document.mySelector()`, (document as any).mySelector());

    // this 가 document 를 가리키도록 document 밑에 함수를 집어넣고 호출하였음!
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
