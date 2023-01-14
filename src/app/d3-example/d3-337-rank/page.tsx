"use client"
import { descending, rank } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-337-rank</title>
        <meta name="description" content="d3-337-rank 예시 코드 페이지입니다." />
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
      d3.rank 함수는 테이블에 있는 각 값의 순위를 가진 배열을 반환합니다. 
      즉, 테이블이 정렬될 때 값의 0 기반 인덱스를 반환합니다. 
      Nullish 값은 끝으로 정렬되고 순위가 NaN입니다. 
      선택적인 비교기 또는 접근자 함수를 지정할 수 있습니다. 
      후자는 순위를 계산하기 전에 array.map(접근자)을 호출하는 것과 같습니다. 
      비교기를 지정하지 않으면 기본적으로 오름차순으로 설정됩니다. 
      동점(동일한 값)은 값이 처음 발견될 때 정의되는 동일한 순위를 가집니다.
    */

    const arr1 = [
      { x: 1 }, 
      { }, 
      { x: 2 }, 
      { x: 0 },
    ];
    console.log(`arr1`, arr1);
    console.log(`rank(arr1, (d) => d.x)`, rank(arr1, (d: any) => d.x)); // [1, NaN, 2, 0]
      
    const arr2 = [
      "b", "c", "b", "a"
    ];
    console.log(`arr2`, arr2);
    console.log(`rank(arr2)`, rank(arr2 as any)); // [1, 3, 1, 0]
    
    const arr3 = [
      1, 2, 3,
    ];
    console.log(`arr3`, arr3);
    console.log(`rank(arr3, descending)`, rank(arr3, descending)); // [2, 1, 0]
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
