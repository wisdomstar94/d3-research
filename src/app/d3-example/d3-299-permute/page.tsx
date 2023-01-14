"use client"
import { permute } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-299-permute</title>
        <meta name="description" content="d3-299-permute 예시 코드 페이지입니다." />
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
      d3.permute 함수는 지정한 키 테이블을 사용하여 지정한 소스 개체(또는 배열)의 순열을 반환합니다. 
      반환된 배열에는 키의 각 키에 대한 소스 개체의 해당 속성이 순서대로 포함됩니다.
    */

    console.log(`permute(["a", "b", "c"], [1, 2, 0])`, permute(["a", "b", "c"], [1, 2, 0])); // returns ["b", "c", "a"]
    // 인덱스로 원본 요소의 순서를 지정할 수 있음

    const object = {
      yield: 27, 
      variety: "Manchuria", 
      year: 1931, 
      site: "University Farm"
    };
    const fields = [
      "site", 
      "variety", 
      "yield"
    ];

    console.log(`permute(object, fields)`, permute<string>(object, fields as any)); // returns ["University Farm", "Manchuria", 27]
    // 프로퍼티 키 명으로 요소 순서 지정 가능!
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
