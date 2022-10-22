import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { bisect, bisectLeft } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-021-bisectLeft</title>
        <meta name="description" content="d3-021-bisectLeft 예시 코드 페이지입니다." />
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
      d3.bisectLeft 함수는 숫자로 이루어진 배열에서
      인자로 받은 숫자와 가장 가까운 숫자가 위치한 인덱스를 계산하여 반환해준다.

      만약 배열이 아래와 같이 있다고 하고, 
      숫자 5 와 가장 가까운 숫자가 위치한 인덱스를 계산한다고 한다면

      [ 4, 5, 5, 5, 6, 7 ]
           †
           이 인덱스가 반환된다.

      숫자가 똑같다면 bisectLeft 는 가장 처음에 발견된 숫자의
      인덱스를 반환하고, bisect 는 가장 마지막으로 발견된 숫자의 그 다음 인덱스를 반환한다.
    */

    const array = [0, 1, 2, 3, 4, 5, 5, 5, 5, 5, 5, 5, 6, 7, 8];
    console.log('array', array);

    const index = bisect(array, 5);
    console.log(`bisect, target: 5, index`, index);

    const index2 = bisectLeft(array, 5);
    console.log(`bisectLeft, target: 5, index2`, index2);
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;