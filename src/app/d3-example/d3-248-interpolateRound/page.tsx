"use client"
import { interpolateRound } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://www.geeksforgeeks.org/d3-js-interpolateround-function/

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-248-interpolateRound</title>
        <meta name="description" content="d3-248-interpolateRound 예시 코드 페이지입니다." />
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
      d3.interpolateRound 함수는 주어진 두 숫자의 보간을 반환하고 가장 가까운 정수로 반올림하는 데 사용됩니다.
    */
    {
      const i = interpolateRound(10, 20);
      console.log(`i(0)`, i(0));
      console.log(`i(0.2)`, i(0.2));
      console.log(`i(0.4)`, i(0.4));
      console.log(`i(0.5)`, i(0.5));
      console.log(`i(0.6)`, i(0.6));
      console.log(`i(0.8)`, i(0.8));
      console.log(`i(1)`, i(1));
    }
    console.log('------------------------');
    {
      const i = interpolateRound(33, 77);
      console.log(`i(0)`, i(0));
      console.log(`i(0.2)`, i(0.2));
      console.log(`i(0.4)`, i(0.4));
      console.log(`i(0.5)`, i(0.5));
      console.log(`i(0.6)`, i(0.6));
      console.log(`i(0.8)`, i(0.8));
      console.log(`i(1)`, i(1));
    }
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
