"use client"
import { stack, stackOffsetWiggle, stackOrderNone } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-386-stackOffsetWiggle</title>
        <meta name="description" content="d3-386-stackOffsetWiggle 예시 코드 페이지입니다." />
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
      d3.stackOffsetWiggle 함수는 도면층의 가중 흔들림을 최소화하도록 기준선을 이동합니다. 
      이 오프셋은 내부 출력 순서와 함께 스트림 그래프에 권장됩니다. 
      자세한 내용은 Bryon & Wattenberg의 
      Stacked Graphs—Geometry & Astemics by Bryon & Wattenberg.
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
      .offset(stackOffsetWiggle)
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
