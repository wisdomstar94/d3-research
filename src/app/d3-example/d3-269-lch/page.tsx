"use client"
import { lab, lch } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://www.geeksforgeeks.org/d3-js-lch-function/

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-269-lch</title>
        <meta name="description" content="d3-269-lch 예시 코드 페이지입니다." />
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
      d3.lch 함수는 새로운 LCH 색상을 구성하는 데 사용되며 
      함수의 매개변수로 지정된 색상의 l, c 및 h 속성을 반환합니다.
    */

    const color1 = lch("red");
    const color2 = lch("green");
    const color3 = lch("blue");
  
    console.log(`color1`, color1);
    console.log(`color2`, color2);
    console.log(`color3`, color3);
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
