"use client"
import { scalePow } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://www.geeksforgeeks.org/d3-js-scalepow-function/

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-357-scalePow</title>
        <meta name="description" content="d3-357-scalePow 예시 코드 페이지입니다." />
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
      d3.scalePow 함수는 지정된 범위, 지수 1, 기본 보간기 및 
      클램핑이 비활성화된 새 연속 스케일을 구성합니다. 도메인의 기본값은 [0, 1]입니다. 
      범위를 지정하지 않으면 기본값은 [0, 1]입니다. 
      (다른 지수를 설정할 때까지 이 값은 사실상 선형 척도입니다.)

      제1 제네릭은 범위 요소의 데이터 유형에 대응한다. 
      두 번째 제네릭은 스케일에 의해 생성된 출력 요소의 데이터 유형에 대응한다. 
      세 번째 제네릭은 알 수 없는 값의 데이터 유형에 해당합니다.

      범위 요소와 출력 요소 유형이 다른 경우 
      척도와 함께 사용되는 보간기 공장에서 이 동작과 일치해야 하며 
      보간된 범위 요소를 해당 출력 요소로 변환해야 합니다.

      범위는 범위 요소 유형에 따라 설정해야 합니다.

      보간기 공장은 스케일의 보간(...) 방법을 사용하여 설정할 수 있습니다.
    */
    const linear = 
      scalePow()
      .domain([1, 10])
      .range([10, 20, 30, 40, 50, 60])
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
