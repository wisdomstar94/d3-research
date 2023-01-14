"use client"
import { interpolate, quantize } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://www.geeksforgeeks.org/d3-js-quantize-function/

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-316-quantize</title>
        <meta name="description" content="d3-316-quantize 예시 코드 페이지입니다." />
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
      d3.quantize 함수는 지정한 보간기에서 n개의 균일한 간격의 샘플을 반환합니다. 
      여기서 n은 1보다 큰 정수입니다. 
      
      첫 번째 표본은 항상 t = 0이고 
      마지막 표본은 항상 t = 1입니다. 
      
      이는 연속 보간기에서 양자화 척도의 범위를 도출하는 것과 같이 주어진 보간기에서 
      고정된 수의 샘플을 생성하는 데 유용할 수 있다.
    */

    const interpolator = interpolate("blue", "white");
    const samples = quantize(interpolator, 4);
    console.log(`samples`, samples);

    // 보간기 함수를 사용해 4단계의 값을 가져오고 싶을 때 유용할 듯!!!
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
