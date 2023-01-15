"use client"
import { randomLcg, shuffler } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-378-shuffler</title>
        <meta name="description" content="d3-378-shuffler 예시 코드 페이지입니다." />
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
      d3.shuffler 함수는 지정된 임의 소스가 지정된 셔플 함수를 반환합니다.
    */
    
    const random = randomLcg(0.9051667019185816);
    const shuffle = shuffler(random);
    
    const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    console.log(`arr`, arr); 
    console.log(`shuffle(arr)`, shuffle(arr)); 
    console.log(`shuffle(arr)`, shuffle(arr)); 
    console.log(`shuffle(arr)`, shuffle(arr)); 
    console.log(`shuffle(arr)`, shuffle(arr)); 
    console.log(`shuffle(arr)`, shuffle(arr)); 
    console.log(`shuffle(arr)`, shuffle(arr)); 

    
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
