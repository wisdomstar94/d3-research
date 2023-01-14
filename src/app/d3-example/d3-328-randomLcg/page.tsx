"use client"
import { randomLcg } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-328-randomLcg</title>
        <meta name="description" content="d3-328-randomLcg 예시 코드 페이지입니다." />
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
      d3.randomLcg 함수는 선형 합동 생성기를 반환합니다. 
      이 함수는 Math.random과 유사하게 간격 [0,1]에 잘 분포된 유사 랜덤 값과 
      긴 주기(최대 10억 개의 숫자)를 얻기 위해 반복적으로 호출될 수 있습니다. 
      
      시드는 [0,1] 간격의 실수 또는 임의의 정수로 지정할 수 있습니다. 
      후자의 경우 하위 32비트만 고려됩니다. 
      
      동일한 시드를 가진 두 개의 생성기가 동일한 시퀀스를 생성하여 재현 가능한 의사 랜덤 실험을 만들 수 있다. 
      시드가 지정되지 않은 경우 Math.random을 사용하여 시드가 선택됩니다.
    */
    
    const randomFn = randomLcg(0.7); 
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
