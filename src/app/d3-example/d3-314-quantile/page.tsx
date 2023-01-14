"use client"
import { quantile } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-314-quantile</title>
        <meta name="description" content="d3-314-quantile 예시 코드 페이지입니다." />
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
      d3.quantile 함수는 지정된 허용 가능한 숫자의 p-quentile을 반환합니다. 
      여기서 p는 [0, 1] 범위의 숫자입니다. 
      
      예를 들어, 중위수는 p = 0.5, 
      첫 번째 사분위수는 p = 0.25, 
      세 번째 사분위수는 p = 0.75를 사용하여 계산할 수 있습니다. 
      
      이 특별한 구현체는 R-7 메소드를 사용하는데, 이것은 R 프로그래밍 언어와 엑셀의 기본값이다.
    */

    const arr = [0, 10, 30];
    console.log(`arr`, arr);

    console.log(`quantile(arr, 0)`, quantile(arr, 0)); // 0
    console.log(`quantile(arr, 0.5)`, quantile(arr, 0.5)); // 10
    console.log(`quantile(arr, 1)`, quantile(arr, 1)); // 30
    console.log(`quantile(arr, 0.25)`, quantile(arr, 0.25)); // 5
    console.log(`quantile(arr, 0.75)`, quantile(arr, 0.75)); // 20
    console.log(`quantile(arr, 0.1)`, quantile(arr, 0.1)); // 2

    // 앞서 봐온 보간기랑 약간 비슷한... 듯?
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
