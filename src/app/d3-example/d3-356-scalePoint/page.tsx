"use client"
import { scalePoint } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-356-scalePoint</title>
        <meta name="description" content="d3-356-scalePoint 예시 코드 페이지입니다." />
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
      d3.scalePoint 함수는 지정된 범위, 패딩, 반올림 및 중앙 맞춤을 사용하여 새 점 척도를 구성합니다. 
      도메인은 기본적으로 빈 도메인으로 설정됩니다. 
      범위를 지정하지 않으면 기본적으로 단위 범위 [0, 1]로 설정됩니다.

      제네릭은 도메인 요소의 데이터 유형에 해당합니다.
    */
      
    const myData = [
      'Jan', 
      'Feb', 
      'Mar', 
      'Apr', 
      'May', 
      'Jun', 
      'Jul', 
      'Aug', 
      'Sep', 
      'Oct', 
      'Nov', 
      'Dec',
    ];

    const linear = 
      scalePoint()
      .domain(myData)
      .range([10, 20])
    ;

    myData.forEach((item, index) => {
      console.log(`linear(${item})`, linear(item));
    });
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
