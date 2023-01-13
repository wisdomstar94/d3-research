"use client"

import { interpolateTransformSvg } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://www.geeksforgeeks.org/d3-js-interpolatetransformsvg-function/

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-253-interpolateTransformSvg</title>
        <meta name="description" content="d3-253-interpolateTransformSvg 예시 코드 페이지입니다." />
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
      d3.interpolateTransformSvg 함수는 주어진 두 SVG 변환 사이의 보간기 함수를 반환하는 데 사용됩니다. 
      그런 다음 반환된 함수에서 k 값을 변경하여 다른 변형 속성을 설정할 수 있습니다.
    */
    
    const css1 = `skewX(30)`;
    const css2 = `skewX(10) translate(10, 0)`;
    const i = interpolateTransformSvg(css1, css2);
    
    console.log(`i(0)`, i(0));
    console.log(`i(0.2)`, i(0.2));
    console.log(`i(0.5)`, i(0.5));
    console.log(`i(0.8)`, i(0.8));
    console.log(`i(1)`, i(1));
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
