"use client"
import { stack, stackOffsetDiverging, stackOffsetNone, stackOrderNone } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// http://using-d3js.com/05_06_stacks.html
// https://www.appsloveworld.com/d3js/100/43/how-to-draw-mirrored-x-axisinverted-bar-chart-in-d3

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-382-stackOffsetDiverging</title>
        <meta name="description" content="d3-382-stackOffsetDiverging 예시 코드 페이지입니다." />
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
      d3.stackOffsetDiverging 함수는 양의 값은 0 위에 쌓이고 
      음의 값은 0 아래에 쌓이고 0의 값은 0 위에 쌓입니다.
    */

    const data = [
      { a: 3840, b: 1920, c: 960, d: 400 },
      { a: 1600, b: 1440, c: 960, d: 400 },
      { a: 640, b: 960, c: 640, d: 400 },
      { a: 320, b: 480, c: 640, d: 400 },
    ];

    const stackGen = 
      stack()
      .keys(["a", "b", "c", "d"])
      .order(stackOrderNone)
      .offset(stackOffsetDiverging)
    ;

    const myStack = stackGen(data);
    console.log(`myStack`, myStack);
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
