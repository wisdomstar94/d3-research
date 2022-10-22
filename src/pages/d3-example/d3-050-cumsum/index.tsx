import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { cumsum } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://www.geeksforgeeks.org/d3-js-cumsum-method/
// https://observablehq.com/@d3/d3-cumsum

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-050-cumsum</title>
        <meta name="description" content="d3-050-cumsum 예시 코드 페이지입니다." />
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
      d3.cumsum 함수는 인자로 받은 배열의 모든 값의 누적 합계를 배열로 반환하는 함수입니다.
    */
    const array = [5, 4, 3, 2, 1];
    console.log(`array`, array);
    const gfg = cumsum(array);
    console.log(`gfg`, gfg);
    /*
      0: 5   --> array[0] 부터 [0]까지 합한 값 == 5 
      1: 9   --> array[0] 부터 [1]까지 합한 값 == 5 + 4
      2: 12  --> array[0] 부터 [2]까지 합한 값 == 5 + 4 + 3
      3: 14  --> array[0] 부터 [3]까지 합한 값 == 5 + 4 + 3 + 2
      4: 15  --> array[0] 부터 [4]까지 합한 값 == 5 + 4 + 3 + 2 + 1
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
