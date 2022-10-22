import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { buffer } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-029-buffer</title>
        <meta name="description" content="d3-029-buffer 예시 코드 페이지입니다." />
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
      d3.buffer함수는
      인자로 입력된 URL 에서 파일을 가져와 buffer 타입을 반환하는
      Promise 를 반환하는 함수임.
    */

    buffer('https://demo.ckan.org/dataset/c322307a-b871-44fe-a602-32ee8437ff04/resource/b53c9e72-6b59-4cda-8c0c-7d6a51dad12a/download/sample.csv')
      .then((data) => {
        console.log('buffers', data);
        const enc = new TextDecoder('utf-8');
        console.log(`enc.decode(buffer)`, enc.decode(data));
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
