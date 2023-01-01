"use client"
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { bin } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

interface ValueItem {
  label: string;
  data: number;
}

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-018-bin</title>
        <meta name="description" content="d3-018-bin 예시 코드 페이지입니다." />
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
      d3.bin 함수는 데이터를 범위별로 그룹핑 지어주는 역할을 한다.

      d3.bin 에서 반환되는 데이터는 주로 히스토그램 차트(주파수 막대 차트)로 많이 표시된다.
      예를들어, 각 막대가 버킷을 나타내고 각 막대의 높이는 포함된 요소의 수를 나타낸다.
    */

    const bin1 = bin<ValueItem, number>()
      .domain([0, 8]) // 0 부터 8까지의 데이터만 계산
      .thresholds([0, 5, 7, 15]) // 0 ~ 5 까지 그룹핑, 5 ~ 7 까지 그룹핑, 7 ~ 15 까지 그룹핑
      .value(d => d.data)
    ;

    const values1: ValueItem[] = [
      { label: 'title', data: 3.981781244277954, },
      { label: 'title', data: 2.450483798980713, },
      { label: 'title', data: 9.827144622802734, },
      { label: 'title', data: 9.219364166259766, },
      { label: 'title', data: 12.956393241882324, },
      { label: 'title', data: 14.597275733947754, },
      { label: 'title', data: 16.712446212768555, },
      { label: 'title', data: 10.836723327636719, },
      { label: 'title', data: 13.977787971496582, },
      { label: 'title', data: 5.487524032592773, },
      { label: 'title', data: 14.246294975280762, },
      { label: 'title', data: 4.209348678588867, },
      { label: 'title', data: 14.814165115356445, },
      { label: 'title', data: 12.64711856842041, },
      { label: 'title', data: 6.230096817016602, },
      { label: 'title', data: 10.05406665802002, },
      { label: 'title', data: 8.387655258178711, },
      { label: 'title', data: 13.486078262329102, },
      { label: 'title', data: 11.40385627746582, },
      { label: 'title', data: 6.676887035369873, },
      { label: 'title', data: 14.264885902404785, },
      { label: 'title', data: 6.358202934265137, },
      { label: 'title', data: 2.8366146087646484, },
      { label: 'title', data: 6.539297103881836, },
      { label: 'title', data: 8.632808685302734, },
      { label: 'title', data: 14.064751625061035, },
      { label: 'title', data: 1.7514710426330566, },
      { label: 'title', data: 9.534256935119629, },
      { label: 'title', data: 9.909202575683594, },
      { label: 'title', data: 0.743991494178772, },
      { label: 'title', data: 2.850419759750366, },
      { label: 'title', data: 9.340381622314453, },
      { label: 'title', data: 1.148579716682434, },
      { label: 'title', data: 15.892600059509277, },
      { label: 'title', data: 0.7289044260978699, },
      { label: 'title', data: 15.754449844360352, },
      { label: 'title', data: 9.831634521484375, },
      { label: 'title', data: 17.48567771911621, },
      { label: 'title', data: 15.248371124267578, },
      { label: 'title', data: 4.245459079742432, },
      { label: 'title', data: 13.7442045211792, },
      { label: 'title', data: 6.844335556030273, },
      { label: 'title', data: 10.503169059753418, },
      { label: 'title', data: 13.339251518249512, },
      { label: 'title', data: 2.594815969467163, },
      { label: 'title', data: 14.393998146057129, },
      { label: 'title', data: 4.02058744430542, },
      { label: 'title', data: 10.505962371826172, },
      { label: 'title', data: 13.876484870910645, },
      { label: 'title', data: 9.204805374145508, },
      { label: 'title', data: 1.0266621112823486, },
      { label: 'title', data: 15.476975440979004, },
      { label: 'title', data: 15.084249496459961, },
      { label: 'title', data: 16.59174346923828, },
      { label: 'title', data: 9.702230453491211, },
      { label: 'title', data: 14.312536239624023, },
      { label: 'title', data: 3.729066848754883, },
      { label: 'title', data: 7.013692855834961, },
      { label: 'title', data: 11.515159606933594, },
      { label: 'title', data: 15.749321937561035, },
    ];

    const bucket1 = bin1(values1);
    // x0 : 가장 낮은 값
    // x1 : 가장 높은 값

    console.log(`bucket1`, bucket1);
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;