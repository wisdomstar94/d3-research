"use client"

import { interpolateTransformCss } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://www.geeksforgeeks.org/d3-js-interpolatetransformcss-function/

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-252-interpolateTransformCss</title>
        <meta name="description" content="d3-252-interpolateTransformCss 예시 코드 페이지입니다." />
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
      d3.interpolateTransformCss 함수는 주어진 두 CssTransform 속성 사이의 보간기 함수를 반환하는 데 사용됩니다. 
      이동, 회전, 기울이기X 및 크기 조정과 같은 Transform의 여러 속성을 여기에서 사용할 수 있습니다.
    */
    
    const css1 = `translateX(10px) scale(1.5)`;
    const css2 = `translateY(15px) scale(2)`;
    const i = interpolateTransformCss(css1, css2);
    
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
