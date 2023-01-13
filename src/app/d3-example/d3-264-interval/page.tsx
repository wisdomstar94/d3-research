"use client"
import { interval } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://www.geeksforgeeks.org/d3-js-interval-function/

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-264-interval</title>
        <meta name="description" content="d3-264-interval 예시 코드 페이지입니다." />
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
      d3.interval 함수는 주어진 시간 간격 또는 지연마다 함수를 호출하는 데 사용됩니다. 
      지연이 주어지지 않으면 지연은 타이머와 동일합니다. 
    */

    let count = 0;
    const func = function(e: any) {
      count++;
      console.log('e', e);
      console.log('count', count);
      if (count > 5) {
        timer.stop();
      }
    };
    const timer = interval(func, 1000);
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
