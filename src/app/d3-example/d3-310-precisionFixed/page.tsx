"use client"
import { format, precisionFixed } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-310-precisionFixed</title>
        <meta name="description" content="d3-310-precisionFixed 예시 코드 페이지입니다." />
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
      d3.precisionFixed 함수는 지정된 숫자 단계 값이 지정된 고정점 표기법에 대해 제안된 10진수 정밀도를 반환합니다.
      단계는 형식을 지정할 값 간의 최소 절대 차이를 나타냅니다. (이것은 포맷할 값도 여러 단계로 가정합니다.) 
      예를 들어, 숫자 1, 1.5 및 2가 주어지면 단계는 0.5여야 하며 제안된 정밀도는 1입니다.
    */
    
    const p = precisionFixed(0.5);
    console.log('p', p);
    const f = format(`.${p}f`);
    console.log(`f(1)`, f(1));
    console.log(`f(1.5)`, f(1.5));
    console.log(`f(2)`, f(2));
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
