"use client"
import { interpolateNumberArray } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://observablehq.com/@d3/d3-interpolatenumberarray

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-226-interpolateNumberArray</title>
        <meta name="description" content="d3-226-interpolateNumberArray 예시 코드 페이지입니다." />
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
      d3.interpolateNumberArray 함수는 a와 b의 두 배열 사이에 보간기를 반환합니다. 
      내부적으로 b와 유형 및 길이가 동일한 어레이 템플릿이 생성됩니다. 
      b의 각 요소에 대해 a에 해당하는 요소가 있으면 배열 템플릿에 직접 값이 보간됩니다. 
      이러한 요소가 없으면 b의 정적 값이 복사됩니다. 
      그러면 업데이트된 어레이 템플릿이 반환됩니다.
    */
    {
      const i = interpolateNumberArray([5, 10], [25, 40]);
      console.log(`i(0)`, i(0));
      console.log(`i(0.2)`, i(0.2));
      console.log(`i(0.4)`, i(0.4));
      console.log(`i(0.5)`, i(0.5));
      console.log(`i(0.6)`, i(0.6));
      console.log(`i(0.8)`, i(0.8));
      console.log(`i(1)`, i(1));
    }
    console.log('------------------------');
    {
      const i = interpolateNumberArray([100, 200], [150, 800]);
      console.log(`i(0)`, i(0));
      console.log(`i(0.2)`, i(0.2));
      console.log(`i(0.4)`, i(0.4));
      console.log(`i(0.5)`, i(0.5));
      console.log(`i(0.6)`, i(0.6));
      console.log(`i(0.8)`, i(0.8));
      console.log(`i(1)`, i(1));
    }
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
