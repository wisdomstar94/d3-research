"use client"
import { min } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";


const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-286-min</title>
        <meta name="description" content="d3-286-min 예시 코드 페이지입니다." />
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
      d3.min 함수는 주어진 배열의 숫자 시퀀스에서 가장 작은 값을 얻을 수 있습니다.
    */
    
    const result = min([5, 4, 1, 3, 2, 65, 7]);
    console.log(`result`, result);
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
