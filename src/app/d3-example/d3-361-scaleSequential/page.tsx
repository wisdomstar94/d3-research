"use client"
import { scaleSequential } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-361-scaleSequential</title>
        <meta name="description" content="d3-361-scaleSequential 예시 코드 페이지입니다." />
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
      d3.scaleSequential 함수는 지정된 보간기 함수 또는 배열을 사용하여 새 순차 척도를 구성합니다. 
      도메인의 기본값은 [0, 1]입니다. 
      보간기를 지정하지 않으면 기본적으로 ID 함수가 사용됩니다. 
      스케일이 적용되면 인터폴레이터가 일반적으로 [0, 1] 범위의 값으로 호출됩니다. 
      여기서 0은 최소값을 나타내고 1은 최대값을 나타냅니다.

      보간기가 배열인 경우 척도의 2요소 출력 범위를 나타내며 
      d3.interpolate를 사용하여 보간기 함수로 변환됩니다.

      첫 번째 제네릭은 스케일의 기초가 되는 보간기의 출력의 데이터 유형에 해당한다. 
      두 번째 제네릭은 알 수 없는 값의 데이터 유형에 해당한다.
    */
    const linear = 
      scaleSequential()
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
