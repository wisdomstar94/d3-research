"use client"
import { hierarchy } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://runebook.dev/ko/docs/d3/d3-hierarchy
// https://observablehq.com/@jonghunpark/d3-hierarchy

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-193-hierarchy</title>
        <meta name="description" content="d3-193-hierarchy 예시 코드 페이지입니다." />
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
      d3.hierarchy 함수는 지정된 계층 적 데이터 로부터 루트 노드를 구성합니다. 
      지정된 데이터 는 루트 노드를 나타내는 객체 여야합니다. 

      쉽게 말해, 이미 계층 구조로 되어 있는 객체를 가공해서 반환해주는 함수이다.
      (계층 구조란, name, value, children 프로퍼티를 갖는 객체를 말함.)
    */

    const data = {
      name: "Eve",
      value: "001",
      children: [
        {
          name: "Cain",
          value: "002",
        },
        {
          name: "Seth",
          value: "003",
          children: [
            {
              name: "Enos",
              value: "004",
            },
            {
              name: "Noam",
              value: "005",
            },
          ],
        },
        {
          name: "Abel",
          value: "006",
        },
        {
          name: "Awan",
          value: "007",
          children: [
            {
              name: "Enoch",
              value: "008",
              children: [
                {
                  name: "Wow",
                  value: "020",
                },
              ],
            },
          ],
        },
        {
          name: "Azura",
          value: "009",
        },
      ],
    };
    console.log(`data`, data);

    const data_hierarchy = hierarchy(data);
    console.log(`data_hierarchy`, data_hierarchy);
    /*
      여기서 반환되는 Node 객체의 depth 값은 해당 Node 객체가 최상위 노드 기준 몇번째 depth 인가를 나타냄.
    */
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
