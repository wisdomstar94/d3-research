"use client"
import { ticks } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-422-ticks</title>
        <meta name="description" content="d3-422-ticks 예시 코드 페이지입니다." />
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
      d3.ticks 함수는 시작과 중지(포함) 사이에 대략적인 카운트 + 1개의 
      균일한 간격, 잘 반올림된 값의 배열을 생성합니다. 
      
      각 값은 1, 2 또는 5를 곱한 거듭제곱입니다. 
      d3.tickIncrement, d3.tickStep 및 linear.ticks를 참조하십시오.

      눈금은 추론된 단계와 일치하는 정확하고 잘 둥근 값인 경우에만 
      지정된 시작 및 중지 값을 포함할 수 있다는 점에서 포함됩니다. 
      보다 공식적으로, 각각의 반환된 티킷은 시작 ≤ t 및 t ≤ 정지를 만족한다.
    */
    const result = ticks(0, 10, 3);
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
