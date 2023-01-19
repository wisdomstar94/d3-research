"use client"
import { variance } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://www.geeksforgeeks.org/d3-js-d3-variance-function/

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-516-variance</title>
        <meta name="description" content="d3-516-variance 예시 코드 페이지입니다." />
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
      d3.variance 함수는 Welford의 알고리즘을 사용하여 
      지정된 허용 가능한 숫자의 모집단 분산에 대한 편향되지 않은 추정치를 반환합니다. 
      테이블의 숫자가 두 개 미만이면 정의되지 않은 값을 반환합니다. 
      분산을 계산하기 전에 Array.를 호출하는 것과 동일한 옵션 접근자 함수를 지정할 수 있습니다. 
      이 메서드는 정의되지 않은 값과 NaN 값을 무시합니다. 이 방법은 누락된 데이터를 무시하는 데 유용합니다.
    */
    
    const Array1 = [10, 20, 30, 40, 50, 60];
    const Array2 = [1, 2];
    const Array3 = [0, 1.5, 6.8];
    const Array4 = [.8, .08, .008];

    console.log('@@', {
      'variance(Array1)': variance(Array1),
      'variance(Array2)': variance(Array2),
      'variance(Array3)': variance(Array3),
      'variance(Array4)': variance(Array4),
    })
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
