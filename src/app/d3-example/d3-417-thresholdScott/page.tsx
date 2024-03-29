"use client"
import { bin, max, min, range, thresholdScott } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-417-thresholdScott</title>
        <meta name="description" content="d3-417-thresholdScott 예시 코드 페이지입니다." />
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
      d3.thresholdScott 함수는 Scott의 정규 기준 규칙에 따라 빈 수를 반환합니다. 입력 값은 숫자여야 합니다.
    */

    const data = range(100);
    const myBin = bin()
      .value(d => d)
      .thresholds(thresholdScott(data, min(data)!, max(data)!));

    const bins = myBin(data);
    console.log(`bins`, bins);
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
