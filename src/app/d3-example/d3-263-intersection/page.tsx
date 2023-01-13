"use client"
import { intersection } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-263-intersection</title>
        <meta name="description" content="d3-263-intersection 예시 코드 페이지입니다." />
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
      d3.intersection 함수는 지정된 모든 반복 가능한 항목에 나타나는 모든(구별) 값이 포함된 새 InterSet을 반환합니다. 
      반환된 집합의 값 순서는 지정된 반복 가능한 항목에서 처음 발생한 값을 기준으로 합니다.
    */
    const a = [6, 2, 8, 8, 0, 0, 3, 9, 4, 4];
    const b = [2, 8, 4, 5, 3, 1, 6, 0, 0, 4];
    const c = [6, 8, 4, 4, 1, 8, 4, 7, 0, 8];

    const test = intersection(a, b, c);
    console.log('test', test); // 6, 8, 0, 4 이 4개 숫자는 a, b, c 에 모두 존재하는 것들임!
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
