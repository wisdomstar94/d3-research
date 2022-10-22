import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { ticks, bisect } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-019-bisect</title>
        <meta name="description" content="d3-019-bisect 예시 코드 페이지입니다." />
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
      d3.bisect 함수는 숫자로 이루어진 배열에서
      인자로 받은 숫자와 가장 가까운 숫자가 위치한 인덱스를 계산하여 반환해준다.
    */

    const array = ticks(0, 5, 100);
    console.log('array', array);

    {
      const index = bisect(array, Math.PI);
      console.log(`target: ${Math.PI}, index`, index);
    }

    {
      const index = bisect(array, Math.PI, 70, 80); // 최소 70 인덱스와 최대 80 인덱스 사이에서 찾겠다는 의미.
      console.log('target: ${Math.PI}, range: [70, 80], index', index);    
    }
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;