"use client"
import { randomBates } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://www.geeksforgeeks.org/d3-js-randombates-function/

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-318-randomBates</title>
        <meta name="description" content="d3-318-randomBates 예시 코드 페이지입니다." />
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
      randomBates 함수는 난수 생성에 사용되는 함수를 반환합니다. 
      반환되는 이 함수는 Bates 분포를 기반으로 합니다.
    */
    
    console.log(`randomBates(0)()`, randomBates(0)());  
    console.log(`randomBates(1)()`, randomBates(1)());  
    console.log(`randomBates(2)()`, randomBates(2)());  
    console.log(`randomBates(3)()`, randomBates(3)());  
    console.log(`randomBates(4)()`, randomBates(4)());  
    console.log(`randomBates(5)()`, randomBates(5)());  
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
