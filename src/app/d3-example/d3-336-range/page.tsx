"use client"
import { range } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-336-range</title>
        <meta name="description" content="d3-336-range 예시 코드 페이지입니다." />
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
      d3.range 함수는 Python 기본 제공 범위와 유사한 산술 급수가 포함된 배열을 반환합니다. 
      이 방법은 배열의 인덱스 또는 선형 척도의 눈금과 같이 
      일정한 간격을 가진 일련의 숫자 값에 대해 반복하기 위해 종종 사용됩니다. 
      잘 반올림된 값은 d3.ticks도 참조하십시오

      단계를 생략하면 기본값은 1입니다. 
      시작을 생략하면 기본값은 0입니다. 
      중지 값은 배타적이며 결과에 포함되지 않습니다. 
      스텝이 양수이면 마지막 요소는 가장 큰 시작 + i * 스텝이 중지보다 작은 것이고, 
      스텝이 음수이면 마지막 요소는 가장 작은 시작 + i * 스텝이 중지보다 큰 것입니다. 
      반환된 배열에 무한한 수의 값이 포함되는 경우 빈 범위가 반환됩니다.
    */
    const rangeArr1 = range(0, 1, 0.2);
    console.log(`rangeArr1`, rangeArr1);

    const rangeArr2 = range(0, 11, 0.05);
    console.log(`rangeArr2`, rangeArr2);
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
