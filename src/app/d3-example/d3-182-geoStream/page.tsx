"use client"
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// 

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-182-geoStream</title>
        <meta name="description" content="d3-182-geoStream 예시 코드 페이지입니다." />
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
      geoStream 함수는 지정한 GeoJSON 개체를 지정한 투영 스트림으로 스트리밍합니다. 
      피쳐와 지오메트리 객체가 모두 입력으로 지원되는 동안 스트림 인터페이스는 지오메트리만 설명하므로 추가 피쳐 속성은 스트림에 표시되지 않습니다.
    */

    
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
      <div>
        관련 예제 찾지 못함.
      </div>
    </>
  );
};

export default Index;
