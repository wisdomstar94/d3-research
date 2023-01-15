"use client"
import { csv, stratify } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://www.geeksforgeeks.org/d3-js-stratify-function/

interface Item {
  x: number;
  y: number;
  name: string;
}

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-393-stratify</title>
        <meta name="description" content="d3-393-stratify 예시 코드 페이지입니다." />
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
      d3.stratify 함수는 기본 설정을 사용하여 새 계층화 연산자를 구성합니다.
    */

    csv('/csv/data.csv').then((links) => {
      console.log(`links`, links);
      const stratifyFn = 
        stratify()
        .id((d: any) => {
          return d.child;
        })
        .parentId((d: any) => {
          return d.parent;
        })
      ;
      const root = stratifyFn(links)
      console.log(`root`, root);
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
