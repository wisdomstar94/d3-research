"use client"
import { shuffle } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://www.geeksforgeeks.org/d3-js-d3-shuffle-function/

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-377-shuffle</title>
        <meta name="description" content="d3-377-shuffle 예시 코드 페이지입니다." />
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
      d3.shuffle 실행 시 Fisher-Yates 셔플을 사용하여 지정한 배열의 순서를 랜덤화합니다.
    */

    const arr = [10, 20, 30, 40];
    console.log(`arr`, arr);
    console.log(`shuffle(arr)`, shuffle(arr));
    console.log(`shuffle(arr)`, shuffle(arr));
    console.log(`shuffle(arr)`, shuffle(arr));
    console.log(`shuffle(arr)`, shuffle(arr));
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
