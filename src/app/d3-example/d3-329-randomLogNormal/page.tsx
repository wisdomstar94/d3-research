"use client"
import { randomLogNormal } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-329-randomLogNormal</title>
        <meta name="description" content="d3-329-randomLogNormal 예시 코드 페이지입니다." />
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
      d3.randomLogNormal 함수는 로그 정규 분포를 사용하여 난수를 생성하는 함수를 반환합니다. 
      주어진 표준 편차 시그마를 사용하여 랜덤 변수의 자연 로그의 기대값은 mu입니다. 
      mu를 지정하지 않으면 0이 기본값이고, 시그마를 지정하지 않으면 1이 기본값입니다.
    */
    
    const randomFn = randomLogNormal(0.7, 0.3); 
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
