"use client"
import { randomExponential } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-323-randomExponential</title>
        <meta name="description" content="d3-323-randomExponential 예시 코드 페이지입니다." />
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
      d3.randomExponential 함수는 비율 람다를 갖는 지수 분포를 사용하여 난수를 생성하는 함수를 반환합니다. 
      평균이 1 / 람다인 포아송 공정의 사건 발생 간 시간에 해당합니다. 
      예를 들어, 지수(1/40)는 평균적으로 40 단위의 시간마다 하나의 사건이 발생하는 사건 사이에 랜덤 시간을 생성합니다.
    */
    
    const randomFn = randomExponential(0.5);
    console.log(`randomFn()`, randomFn());
    console.log(`randomFn()`, randomFn());
    console.log(`randomFn()`, randomFn());
    console.log(`randomFn()`, randomFn());
    console.log(`randomFn()`, randomFn());
    console.log(`randomFn()`, randomFn());
    console.log(`randomFn()`, randomFn());
    console.log(`randomFn()`, randomFn());
    console.log(`randomFn()`, randomFn());
    console.log(`randomFn()`, randomFn());
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
