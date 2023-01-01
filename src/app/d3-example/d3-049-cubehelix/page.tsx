"use client"
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { cubehelix } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-049-cubehelix</title>
        <meta name="description" content="d3-049-cubehelix 예시 코드 페이지입니다." />
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
    boxElementRef.current?.childNodes?.forEach((item) => {
      boxElementRef.current?.removeChild(item);
    });

    /*
      d3.cubehelix() 함수 는 새로운 Cubehelix 색상을 구성하는 데 사용되며 함수의 매개변수로 사용되는 지정된 색상의 HSL 속성을 반환합니다.
    */

    const color1 = cubehelix("red");
    const color2 = cubehelix("green");
    const color3 = cubehelix("blue");
    const color4 = cubehelix("#2ecb66");
    const color5 = cubehelix("rgba(20,94,204,0.5)");
    
    // Getting the HSL properties
    console.log(`color1`, color1);
    console.log(`color2`, color2);
    console.log(`color3`, color3);
    console.log(`color4`, color4);
    console.log(`color5`, color5);
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
