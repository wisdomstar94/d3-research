import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { Delaunay, Voronoi, hsl } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

export declare namespace ID3VOronoi {
  export interface PointData {
    x: number;
    y: number;
  }
}

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-006-voronoi</title>
        <meta name="description" content="d3-006-voronoi 예시 코드 페이지입니다." />
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
    boxElementRef.current?.childNodes.forEach((item) => {
      boxElementRef.current?.removeChild(item);
    });

    // canvas 의 크기입니다.
    const w = 400;
    const h = 400;

    // canvas element 를 생성합니다.
    const canvas = document.createElement('canvas'); 

    // canvas context 를 가져옵니다.
    const context = canvas.getContext('2d');
    if (context === null) {
      return;
    }

    // canvas의 너비, 높이를 지정합니다.
    canvas.width = w;
    canvas.height = h;

    // canvas 에 표시될 좌표 데이터 입니다.  
    const pointsData: ID3VOronoi.PointData[] = [
      { x: 14, y: 23 }, 
      { x: 100, y: 100 }, 
      { x: 30, y: 250 },
      { x: 222, y: 65 },
      { x: 301, y: 274 },
      { x: 274, y: 288 },
      { x: 274, y: 351 },
      { x: 300, y: 300 },
      { x: 400, y: 380 },
    ];

    // d3.Voronoi 는 d3.Delaunay 의 voronoi 함수를 사용하는 방식의 다른 적용 방식입니다. d3-delaunay 을 참조하세요.
    const voronoi: d3.Voronoi<ID3VOronoi.PointData> = new (Voronoi as any)( // 원래 d3.Voronoi 의 constructor 에 인자가 필요하나 이상하게 type 에는 정의가 되어 있지 않아 ts 에서 에러가 발생하여 as any 를 붙여주었습니다.
      Delaunay.from(
        pointsData, 
        (d) => {
          // x 좌표에 해당하는 값 리턴
          return d.x;
        },
        (d) => {
          // y 좌표에 해당하는 값 리턴
          return d.y;
        },
      ),
      [0, 0, 400, 400]
    );

    console.log('voronoi.render()', voronoi.render());

    const pathInfo = voronoi.render();
    for (const path of pathInfo.split('M').slice(1)) {
      context.beginPath();
      context.strokeStyle = hsl(360 * Math.random(), 0.7, 0.5).toString(); // 선 색상은 랜덤
      context.stroke(new Path2D('M' + path));
      context.closePath();
    }

    canvas.style.border = '1px solid #ccc';
    boxElementRef.current?.appendChild(canvas);
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;