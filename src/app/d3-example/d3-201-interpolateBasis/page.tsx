"use client"
import { interpolateBasis } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://observablehq.com/@d3/d3-interpolatebasis
// https://snyk.io/advisor/npm-package/d3-interpolate/functions/d3-interpolate.interpolateBasis

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-201-interpolateBasis</title>
        <meta name="description" content="d3-201-interpolateBasis 예시 코드 페이지입니다." />
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
      d3.interpolateBasis 함수는 숫자여야 하는 지정된 값 배열을 통해 균일한 비합리적 B-스플라인 보간기를 반환합니다. 
      암시적 제어점은 인터폴레이터가 
      t = 0에서 값[0]을 반환하고 
      t = 1에서 값[values.length - 1]을 반환하도록 생성됩니다.
    */

    const arr1 = [0, 0.3, 0.5, 20];
    const arr2 = [0, 20];
    {
      const linearInterpolator = interpolateBasis(arr1);
      console.log(`linearInterpolator(0)`, linearInterpolator(0));
      console.log(`linearInterpolator(0.1)`, linearInterpolator(0.1));
      console.log(`linearInterpolator(0.3)`, linearInterpolator(0.3));
      console.log(`linearInterpolator(0.5)`, linearInterpolator(0.5));
      console.log(`linearInterpolator(0.7)`, linearInterpolator(0.7));
      console.log(`linearInterpolator(0.9)`, linearInterpolator(0.9));
      console.log(`linearInterpolator(1)`, linearInterpolator(1));
    }
    {
      const linearInterpolator = interpolateBasis(arr2);
      console.log(`linearInterpolator(0)`, linearInterpolator(0));
      console.log(`linearInterpolator(0.1)`, linearInterpolator(0.1));
      console.log(`linearInterpolator(0.3)`, linearInterpolator(0.3));
      console.log(`linearInterpolator(0.5)`, linearInterpolator(0.5));
      console.log(`linearInterpolator(0.7)`, linearInterpolator(0.7));
      console.log(`linearInterpolator(0.9)`, linearInterpolator(0.9));
      console.log(`linearInterpolator(1)`, linearInterpolator(1));
    }
    /*
      배열의 요소가 일종의 좌표이고 해당 좌표로 그려진 선에서, 0일 때의 값, 0.5 일 때의 값, 1일 때의 값.. 등의
      값을 반환해주는 용도인듯!
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
