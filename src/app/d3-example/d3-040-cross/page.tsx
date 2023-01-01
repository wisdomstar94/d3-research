"use client"
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { cross } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-040-cross</title>
        <meta name="description" content="d3-040-cross 예시 코드 페이지입니다." />
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
    boxElementRef.current?.childNodes?.forEach((item) => {
      boxElementRef.current?.removeChild(item);
    });

    /*
      d3.coross 는 2 개의 배열을 받아 2개 배열의 숫자를 조합하여 나올 수 있는 모든 경우의 수에 해당하는 값을 반환해주는 함수입니다.
    */

    const array1 = [10, 20, 30, 40];
    const array2 = [1, 2, 3, 4, 5];

    const crossArray = cross(array1, array2);

    console.log('crossArray', crossArray);



    const array3 = ["빨강","초록","파랑"];
    const array4 = ["s","m","l"];
    const array5 = ["무료배송","유료배송"];

    const crossArray2 = (cross as any)(array3, array4, array5);

    console.log('crossArray', crossArray);
    console.log('crossArray2', crossArray2);
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>

      </div>
    </>
  );
};

export default Index;
