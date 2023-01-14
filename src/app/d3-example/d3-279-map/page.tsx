"use client"
import { map } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-279-map</title>
        <meta name="description" content="d3-279-map 예시 코드 페이지입니다." />
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
      d3.map 함수는 지정된 매퍼 함수에 의해 정의된 순서대로 테이블에서 매핑된 값을 포함하는 새 배열을 반환합니다. 
      array.map 및 Array.from
    */
    const data = [
      {
        name: "foo",
        // age: 13,
      }, 
      {
        name: "bar",
        // age: 27,
      },
    ];
    const mapData = map(data, (item) => item.name);
    // console.log(`Array.isArray(mapData)`, Array.isArray(mapData));
    console.log(`mapData`, mapData); // array ...
    
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
