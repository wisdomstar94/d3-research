"use client"
import { ascending, groupSort } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://github.com/d3/d3-array/blob/main/README.md#groupSort

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-190-groupSort</title>
        <meta name="description" content="d3-190-groupSort 예시 코드 페이지입니다." />
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
      d3.groupSort 함수는 지정된 키 함수에 따라 지정된 요소의 목록을 그룹화하고 
      지정된 비교기에 따라 그룹을 정렬한 다음 정렬된 순서로 키 배열을 반환합니다. 
    */

    const data = [
      {name: "ABC", amount: "34.0",   date: "2015-11-12"},
      {name: "DEF", amount: "120.11", date: "2015-11-12"},
      {name: "MNO", amount: "12.01",  date: "2016-01-04"},
      {name: "XYZ", amount: "34.05",  date: "2016-01-04"},
      {name: "SST", amount: "57.44",  date: "2017-05-21"},
    ];
    console.log(`data`, data);

    const grouped_sort_data = groupSort(
      data, 
      (a, b) => { 
        // console.log('a', a);
        // console.log('b', b);
        return ascending(a[0].date, b[0].date);
      }, 
      d => d.date
    );
    console.log('grouped_sort_data', grouped_sort_data);
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
