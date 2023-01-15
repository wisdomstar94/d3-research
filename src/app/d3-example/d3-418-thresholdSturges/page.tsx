"use client"
import { bin, range, thresholdSturges } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-418-thresholdSturges</title>
        <meta name="description" content="d3-418-thresholdSturges 예시 코드 페이지입니다." />
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
      d3.thresholdSturges 함수는 스터지스 공식에 따라 빈 수를 반환합니다. 입력 값은 숫자여야 합니다.

      또한 데이터에서 파생된 입력 값의 배열과 최소 및 최대값으로 표시되는 관측 가능한 도메인의 세 가지 인수를 사용하여 
      자체 임계값 생성기를 구현할 수 있습니다. 
      
      그런 다음 생성기는 숫자 임계값 배열 또는 빈 개수를 반환할 수 있습니다. 
      후자의 경우 도메인은 대략적인 카운트 빈으로 균일하게 분할됩니다. 눈금을 참조하십시오.
    */

    const data = range(100);
    const myBin = bin()
      .value(d => d)
      .thresholds(thresholdSturges(data));

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
