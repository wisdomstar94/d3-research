import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { csvFormatBody } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-043-csvFormatBody</title>
        <meta name="description" content="d3-043-csvFormatBody 예시 코드 페이지입니다." />
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
      d3.csvFormatBody 는 데이터를 csv 포맷으로 변환은 하되 타이틀 부분은 제외하여 반환
    */

    const data = [
      { name: "apple", price: "2,000" }, 
      { name: "melon", price: "7,500" },
    ];
    console.log('data', data);
    const dataToCsvBody = csvFormatBody(data);
    console.log('dataToCsvBody');
    console.log(dataToCsvBody);
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
