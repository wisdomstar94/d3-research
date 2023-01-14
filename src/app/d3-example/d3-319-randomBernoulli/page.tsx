"use client"
import { randomBernoulli } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-319-randomBernoulli</title>
        <meta name="description" content="d3-319-randomBernoulli 예시 코드 페이지입니다." />
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
      randomBernoulli 함수는 1이 성공 확률 p로 반환되고 
      0이 실패 확률 = 1 - p로 반환되는 베르누이 분포에 따라 1 또는 0을 생성하는 함수를 반환합니다. 
      값 p는 [0, 1] 범위에 있습니다.
    */
    const f = randomBernoulli(0.5);
    console.log(`f()`, f());
    console.log(`f()`, f());
    console.log(`f()`, f());

    // 확률적으로 당첨되는 걸 만들 때 유용할 듯!
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
