"use client"
import { image } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://www.geeksforgeeks.org/d3-js-image-function/

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-196-image</title>
        <meta name="description" content="d3-196-image 예시 코드 페이지입니다." />
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
      d3.image 함수는  주어진 이미지 URL에서 이미지를 가져오는 데 사용되는 요청 API의 일부입니다. 
      함수에 init도 지정되어 있으면 이미지를 로드하기 전에 이미지에 추가 속성을 설정합니다.  
    */
    
    image(
      "/favicon.ico", 
      { 
        alt: 'test',
        crossOrigin: "anonymous", 
      },
    ).then((img) => {
      console.log(`typeof img`, typeof img);
      console.log(`img`, img); // element 가 반환됨.
      boxElementRef.current?.appendChild(img);
    });
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
