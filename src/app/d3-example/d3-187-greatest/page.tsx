"use client"
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";
import { greatest } from "d3";

// https://www.geeksforgeeks.org/d3-js-greatest-method/

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-187-greatest</title>
        <meta name="description" content="d3-187-greatest 예시 코드 페이지입니다." />
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
      d3.greatest 함수는 인자로 주어진 배열 요소중에 가장 큰 요소 값을 반환하는 함수임.
    */
    console.log(`greatest([5, 4, 3, 2, 1])`, greatest([5, 4, 3, 2, 1]));
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
