import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { extent } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://devdocs.io/d3~7/d3-array#extent
// https://observablehq.com/@d3/d3-extent

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-119-extent</title>
        <meta name="description" content="d3-119-extent 예시 코드 페이지입니다." />
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
      d3.extent 는 자연 순서를 사용하여 지정된 값의 최소값과 최대값을 반환합니다. 
      반복 테이블에 비교할 수 있는 값이 없으면 [정의되지 않음, 정의되지 않음]을 반환합니다. 
      익스텐트를 계산하기 전에 Array.를 호출하는 것과 같은 선택적 접근자 함수를 지정할 수 있습니다.
    */

    const arr = [100, 200, 300, 400, 500];
    const extents = extent(arr);
    console.log(`extents`, extents); // 첫번째 인덱스에 최소값이, 두번째 인덱스에 최대값이 담깁니다.
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
