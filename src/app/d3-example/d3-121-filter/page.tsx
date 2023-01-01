"use client"
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { filter } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://devdocs.io/d3~7/d3-array#filter

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-121-filter</title>
        <meta name="description" content="d3-121-filter 예시 코드 페이지입니다." />
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
      d3.filter 는 주어진 테스트 함수가 true를 반환하는 iterable의 값을 순서대로 포함하는 새 배열을 반환합니다. 
      array.filter 와 동일합니다.
    */
    
    const arr = [
      { name: 'hi', age: 3 },
      { name: 'hello', age: 6 },
      { name: 'good', age: 8 },
    ];
    console.log(`arr`, arr);

    const newArr = filter(arr, (value, index) => {
      return value.age % 3 === 0;
    });

    console.log(`newArr`, newArr);
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
