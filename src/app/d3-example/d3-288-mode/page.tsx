"use client"
import { mode } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-288-mode</title>
        <meta name="description" content="d3-288-mode 예시 코드 페이지입니다." />
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
      d3.mode 함수는 지정된 값의 모드(가장 자주 나타나는 값)를 반환합니다. 
      동일한 경우 관련 값 중 첫 번째 값을 반환합니다. 
      테이블에 비교 가능한 값이 없으면 정의되지 않은 값을 반환합니다. 
      옵션 접근자 함수를 지정할 수 있으며, 이는 모드를 계산하기 전에 Array.를 호출하는 것과 같습니다. 
      이 메서드는 정의되지 않은, null 및 NaN 값을 무시합니다. 이는 누락된 데이터를 무시하는 데 유용합니다.
    */
    
    const arr1 = [10, 3, 2, 10, 11, 12, 11, 10, 9, 2, 6, 8, 1];
    const result = mode(arr1);
    console.log(`result`, result);
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
