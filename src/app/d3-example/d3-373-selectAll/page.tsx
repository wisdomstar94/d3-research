"use client"
import { selectAll } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://www.geeksforgeeks.org/d3-js-d3-selectall-function/

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-373-selectAll</title>
        <meta name="description" content="d3-373-selectAll 예시 코드 페이지입니다." />
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
      d3.selectAll 함수는 지정한 선택기 문자열과 일치하는 모든 요소를 선택합니다. 
      요소는 문서 순서(위에서 아래로)로 선택됩니다. 
      문서에 선택기와 일치하는 요소가 없는 경우 빈 선택 항목을 반환합니다.

      첫 번째 일반적인 "GElement"는 선택할 요소의 유형을 나타냅니다. 
      두 번째 일반적인 "OldDatum"은 선택된 요소의 기준점 유형을 나타냅니다. 
      이는 이전에 설정된 알려진 기준점 유형으로 요소를 다시 선택할 때 유용합니다.
    */

    const target = selectAll('div');
    console.log(`target`, target);
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
