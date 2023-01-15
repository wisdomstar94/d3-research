"use client"
import { superset } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-397-superset</title>
        <meta name="description" content="d3-397-superset 예시 코드 페이지입니다." />
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
      d3.superset 함수는 a가 b의 수퍼 집합인 경우 true를 반환합니다. 
      지정된 허용 가능한 b의 모든 값도 지정된 허용 가능한 a에 있으면 true를 반환합니다.
    */

    const a = new Set([10, 20, 40, 50, 60, 30]);
    const b = new Set([10, 20, 30]);
    
    console.log(`a`, a);
    console.log(`b`, b);
    console.log(`superset(a, b)`, superset(a, b));
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
