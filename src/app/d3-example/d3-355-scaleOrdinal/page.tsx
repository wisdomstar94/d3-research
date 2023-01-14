"use client"
import { scaleOrdinal } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://gist.github.com/d3indepth/fabe4d1adbf658c0b73c74d3ea36d465

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-355-scaleOrdinal</title>
        <meta name="description" content="d3-355-scaleOrdinal 예시 코드 페이지입니다." />
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
      d3.scaleOrdinal 함수는 지정된 범위를 사용하여 새 순서 척도를 구성합니다. 
      도메인은 기본적으로 빈 배열로 설정됩니다. 
      범위를 지정하지 않으면 기본적으로 빈 배열로 설정됩니다. 
      순서형 척도는 비어 있지 않은 범위가 정의될 때까지 항상 정의되지 않은 상태로 반환됩니다.

      제네릭은 범위 요소의 데이터 유형에 해당합니다.
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
      scaleOrdinal()
      .domain(myData)
      .range(['black', '#ccc', '#ccc'])
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
