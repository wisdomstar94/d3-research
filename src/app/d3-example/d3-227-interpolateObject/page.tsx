"use client"
import { interpolateObject } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://www.geeksforgeeks.org/d3-js-interpolateobject-function/

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-227-interpolateObject</title>
        <meta name="description" content="d3-227-interpolateObject 예시 코드 페이지입니다." />
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
      d3.interpolateObject 함수는 주어진 두 객체 사이의 보간기 함수를 반환하는 데 사용됩니다. 
      "a"에 "b"의 속성이 있으면 보간을 사용하여 "a"와 "b" 모두에 대해 일반 보간기가 생성됩니다.
    */
      const obj1={
        a: 10,
        b: 20,
        c: 30
      }; 
      const obj2={
        a: 40,
        b: 50,
        d: 60,
        e: 70
      };
      const interpolationFunction = interpolateObject(obj1, obj2);
      /* Note the property d and e will not change
         as they are not present in obj1*/
      console.log(`interpolationFunction(0)`, { ...interpolationFunction(0) });
      console.log(`interpolationFunction(0.5)`, { ...interpolationFunction(0.5) });
      console.log(`interpolationFunction(1)`, { ...interpolationFunction(1) });
      console.log(`interpolationFunction(1.5)`, { ...interpolationFunction(1.5) });
      console.log(`interpolationFunction(2)`, { ...interpolationFunction(2) });
      console.log(`interpolationFunction(2.5)`, { ...interpolationFunction(2.5) });
      console.log(`interpolationFunction(3)`, { ...interpolationFunction(3) });
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
