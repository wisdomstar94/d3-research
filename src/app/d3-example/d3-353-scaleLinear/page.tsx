"use client"
import { scaleLinear } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://www.geeksforgeeks.org/d3-js-scalelinear-method/

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-353-scaleLinear</title>
        <meta name="description" content="d3-353-scaleLinear 예시 코드 페이지입니다." />
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
      d3.scaleLinear 은 지정된 도메인과 범위, 기본 보간기 및 
      클램핑이 비활성화된 새 연속 스케일을 구성합니다. 
      도메인 또는 범위를 지정하지 않으면 각 도메인의 기본값은 [0, 1]입니다. 
      선형 척도는 비례적 차이를 보존하기 때문에 연속 정량 데이터에 대한 좋은 기본 선택입니다. 
      각 범위 값 y는 도메인 값 x: y = mx + b의 함수로 표현될 수 있다.
    */
    
    const linear = 
      scaleLinear()
      .domain([0, 10])
      .range([0, 600])
    ;

    console.log(`linear(0)`, linear(0));
    console.log(`linear(2)`, linear(2));
    console.log(`linear(4)`, linear(4));
    console.log(`linear(6)`, linear(6));
    console.log(`linear(8)`, linear(8));
    console.log(`linear(10)`, linear(10));
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
