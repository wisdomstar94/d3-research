"use client"
import { stack, stackOffsetWiggle, stackOrderNone } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-391-stackOrderNone</title>
        <meta name="description" content="d3-391-stackOrderNone 예시 코드 페이지입니다." />
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
      d3.stackOrderNone 함수는 지정된 열 순서 [0, 1, ... n - 1]을 반환합니다. 
      여기서 n은 열에 있는 요소의 수입니다. 따라서, 스택 순서는 키 접근자에 의해 주어진다.
    */

    const data = [
      { a: 3840, b: 1920, c: 960, d: 400 },
      { a: 1600, b: 1440, c: 960, d: 400 },
      { a: 640, b: 960, c: 640, d: 400 },
      { a: 320, b: 480, c: 640, d: 400 },
    ];

    const stackGen = 
      stack()
      .keys(["a", "b", "c", "d"])
      .order(stackOrderNone)
      .offset(stackOffsetWiggle)
    ;

    const myStack = stackGen(data);
    console.log(`myStack`, myStack);
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
