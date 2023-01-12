"use client"
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";
import { group } from "d3";

// https://www.geeksforgeeks.org/d3-js-group-method/

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-189-group</title>
        <meta name="description" content="d3-189-group 예시 코드 페이지입니다." />
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
      d3.group 함수는 배열 요소들의 특정 키를 기준으로 Map 객체로 그룹핑 지어주는 함수임.
    */
    
    const data = [
      {name: "ABC", amount: "34.0",   date: "11/12/2015"},
      {name: "DEF", amount: "120.11", date: "11/12/2015"},
      {name: "MNO", amount: "12.01",  date: "01/04/2016"},
      {name: "XYZ", amount: "34.05",  date: "01/04/2016"},
    ];
    console.log(`data`, data);

    const grouped_data = group(data, d => d.date);
    console.log('grouped_data', grouped_data);
    /*
      위 예시는 date 를 key 로 잡고,
      value 에는 date 가 동일한 것들끼리의 요소가 배열로 담김.
      
      ex)
      key: "11/12/2015"
      value: [
        {name: 'ABC', amount: '34.0', date: '11/12/2015'},
        {name: 'DEF', amount: '120.11', date: '11/12/2015'},
      ]

      key: "01/04/2016"
      value: [
        {name: 'MNO', amount: '12.01', date: '01/04/2016'},
        {name: 'XYZ', amount: '34.05', date: '01/04/2016'},
      ]

      즉, 특정 키로 요소들을 그룹핑 지어주고 싶을 때 매우 유용한 함수임!
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
