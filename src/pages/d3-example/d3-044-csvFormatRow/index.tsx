import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { csvFormatRow } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-044-csvFormatRow</title>
        <meta name="description" content="d3-044-csvFormatRow 예시 코드 페이지입니다." />
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
      d3.csvFormatRow 는 csv 데이터의 특정 row 에 해당하는 데이터를 csv 포맷으로 변환해 주는 함수입니다.
    */
    const csvFormatRow1 = csvFormatRow(['name', 'price']);
    console.log('csvFormatRow1');
    console.log(csvFormatRow1); // name,price

    const csvFormatRow2 = csvFormatRow(['apple', '1,000']);
    console.log('csvFormatRow2');
    console.log(csvFormatRow2); // apple,"1,000"

    const csvFormatRow3 = csvFormatRow(['banana', '75,300']);
    console.log('csvFormatRow3');
    console.log(csvFormatRow3); // banana,"75,300"
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
