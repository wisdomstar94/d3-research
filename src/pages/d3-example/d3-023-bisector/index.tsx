import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { bisector } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

interface Data {
  date: Date;
  value: number;
}

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-023-bisector</title>
        <meta name="description" content="d3-023-bisector 예시 코드 페이지입니다." />
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
      d3.bisector 함수는
      직접 비교기 함수를 사용하여 커스텀된 bisect 함수를 반환한다.
    */

    const data: Data[] = [
      { date: new Date(2011, 1, 1), value: 0.5 },
      { date: new Date(2012, 2, 1), value: 0.6 },
      { date: new Date(2013, 3, 1), value: 0.7 },
      { date: new Date(2014, 4, 1), value: 0.8 },
      { date: new Date(2015, 4, 1), value: 0.8 },
      { date: new Date(2017, 4, 1), value: 0.8 },
    ]; 

    const bisectDate = bisector<Data, Date>(function(d) { 
      return d.date; 
    }).left; 
    
    const targetDate = new Date(2014, 9, 2);
    console.log(`bisectDate(data, targetDate)`, bisectDate(data, targetDate)); 
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;