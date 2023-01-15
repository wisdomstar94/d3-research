"use client"
import { scaleQuantize } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-359-scaleQuantize</title>
        <meta name="description" content="d3-359-scaleQuantize 예시 코드 페이지입니다." />
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
      d3.scaleQuantize 함수는 지정된 범위를 사용하여 새 양자화 척도를 구성합니다. 
      도메인의 기본값은 [0, 1]입니다. 
      범위를 지정하지 않으면 기본값은 [0, 1]입니다. 
      따라서 기본 양자화 척도는 Math.round 함수와 동일합니다.

      범위는 범위 요소의 유형에 따라 설정되어야 합니다.

      제1 제네릭은 범위 요소의 데이터 유형에 대응한다. 
      두 번째 제네릭은 알 수 없는 값의 데이터 유형에 해당한다.
    */
    const linear = 
      scaleQuantize()
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