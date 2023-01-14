"use client"
import { scaleQuantile } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-358-scaleQuantile</title>
        <meta name="description" content="d3-358-scaleQuantile 예시 코드 페이지입니다." />
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
      d3.scaleQuantile 함수는 지정된 범위를 사용하여 새 분위수 척도를 구성합니다. 
      도메인은 기본적으로 빈 배열로 설정됩니다. 
      범위를 지정하지 않으면 기본적으로 빈 배열로 설정됩니다. 
      분위수 척도는 도메인과 범위를 모두 지정할 때까지 유효하지 않습니다.

      제1 제네릭은 범위 요소의 데이터 유형에 대응한다. 
      두 번째 제네릭은 알 수 없는 값의 데이터 유형에 해당한다.
    */
    const linear = 
      scaleQuantile()
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
