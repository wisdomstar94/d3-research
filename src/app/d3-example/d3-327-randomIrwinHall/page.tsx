"use client"
import { randomIrwinHall } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-327-randomIrwinHall</title>
        <meta name="description" content="d3-327-randomIrwinHall 예시 코드 페이지입니다." />
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
      d3.randomIrwinHall 함수는 n개의 독립 변수가 있는 Irwin-Hall 분포를 사용하여 
      난수를 생성하는 함수를 반환합니다. 
      n의 분수 부분이 0이 아닌 경우, 이것은 d3.랜덤을 더하는 것으로 처리된다Uniform()은 
      해당 분수 부분을 적분 부분에 곱한 값입니다.
    */
    
    const randomFn = randomIrwinHall(10); 
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
