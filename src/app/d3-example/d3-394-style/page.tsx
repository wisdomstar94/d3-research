"use client"
import { style } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

interface Item {
  x: number;
  y: number;
  name: string;
}

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-394-style</title>
        <meta name="description" content="d3-394-style 예시 코드 페이지입니다." />
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
      d3.style 함수는 지정한 노드에 대해 지정한 이름을 가진 스타일 속성의 값을 반환합니다. 
      노드에 지정된 이름의 인라인 스타일이 있으면 값이 반환되고, 
      그렇지 않으면 계산된 속성 값이 반환됩니다. selection.style도 참조하십시오.
    */
    const display = style(boxElementRef.current!, 'display');
    console.log(`display`, display);
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
