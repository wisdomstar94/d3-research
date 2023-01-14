"use client"
import { randomWeibull } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-335-randomWeibull</title>
        <meta name="description" content="d3-335-randomWeibull 예시 코드 페이지입니다." />
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
      d3.randomWeibull 함수는 k에 따라 일반화된 극단값 분포 중 하나를 사용하여 난수를 생성하는 함수를 반환합니다. 
      k가 양수이면 형상 모수 k를 사용하는 Weibull 분포, 
      k가 0이면 Gumbel 분포, 
      k가 음수이면 형상 모수 -k를 사용하는 Fréchet 분포 세 가지 경우 모두 a가 위치 모수이고 b가 b입니다. 
      a를 지정하지 않으면 기본값은 0이고, b를 지정하지 않으면 기본값은 1입니다.
    */
    
    const randomFn = randomWeibull(3.7); 
    console.log(`randomFn()`, randomFn());
    console.log(`randomFn()`, randomFn());
    console.log(`randomFn()`, randomFn());
    console.log(`randomFn()`, randomFn());
    console.log(`randomFn()`, randomFn());
    console.log(`randomFn()`, randomFn());
    console.log(`randomFn()`, randomFn());
    console.log(`randomFn()`, randomFn());
    console.log(`randomFn()`, randomFn());
    console.log(`randomFn()`, randomFn());
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
