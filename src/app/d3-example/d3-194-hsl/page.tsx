"use client"
import { hsl } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://www.geeksforgeeks.org/d3-js-d3-hsl-function/

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-194-hsl</title>
        <meta name="description" content="d3-194-hsl 예시 코드 페이지입니다." />
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
      d3.hsl 함수는 새로운 HSL 색상을 구성하는 데 사용되며 함수의 매개변수로 지정된 색상의 HSL 속성을 반환합니다.
    */
    const color1 = hsl("red");
    const color2 = hsl("green");
    const color3 = hsl("blue");
    const color4 = hsl("springgreen");

    console.log(`color1`, color1);
    console.log(`color2`, color2);
    console.log(`color3`, color3);
    console.log(`color4`, color4);
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
