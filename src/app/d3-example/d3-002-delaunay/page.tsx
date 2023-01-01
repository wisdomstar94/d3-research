"use client"
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { Delaunay, hsl, rgb } from 'd3';
import { usePathname, useSearchParams } from "next/navigation";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-002-delaunay</title>
        <meta name="description" content="d3-002-delaunay 예시 코드 페이지입니다." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContents />      
    </>
  );
};

const PageContents = () => {
  const boxElementRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // console.log('pathname', pathname);
    const t = searchParams.get('t');
    // console.log('t', t);
    // console.log('@@@@@@@@'); 
    if (pathname === null) {
      return;
    }

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

    // 400 x 400 크기의 canvas 에 표시될 좌표 데이터 입니다.  
    const pointsData = [
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

    // canvas 에 좌표를 그립니다.
    for (const point of pointsData) {
      console.log('point', point);
      // 좌표 위치에 좌표의 x, y 값의 텍스트를 그립니다.
      context.beginPath();
      context.font = '12px serif';
      context.fillStyle = '#000';
      context.fillText(`(${point.x}, ${point.y})`, point.x + 5, point.y);
      context.closePath();

      // 좌표 위치에 원을 그립니다.
      context.beginPath();
      context.arc(point.x, point.y, 2, 0, Math.PI * 2);
      context.strokeStyle = '#f00';
      context.fillStyle = '#f00';
      context.stroke();
      context.fill();
      context.closePath();
    }

    // d3.Delaunay 의 from 함수를 통해 delaunay 객체를 가져옵니다.
    const delaunay = Delaunay.from(
      pointsData, 
      (d) => {
        // x 좌표에 해당하는 값 리턴
        return d.x;
      },
      (d) => {
        // y 좌표에 해당하는 값 리턴
        return d.y;
      },
    );

    // delaunay 객체의 voronoi 함수를 통해 voronoi 객체를 가져옵니다.
    const voronoi = delaunay.voronoi([0, 0, 400, 400]); // x 좌표의 최소값, y 좌표의 최소값, x 좌표의 최대값, y 좌표의 최대값
    
    // voronoi 다이어그램을 이루는 다각형의 선들을 그립니다.
    const pathInfo = voronoi.render();
    for (const path of pathInfo.split('M').slice(1)) {
      context.beginPath();
      context.strokeStyle = hsl(360 * Math.random(), 0.7, 0.5).toString(); // 선 색상은 랜덤
      context.stroke(new Path2D('M' + path));
      context.closePath();
    }

    // voronoi 다이어그램을 이루는 다격형에 색을 입힙니다.
    pointsData.forEach((point, index) => {
      const cellPolygonPoints = voronoi.cellPolygon(index); // i 번째 좌표를 기준으로 형성된 다각형의 선 좌표 정보
      const randomColor = rgb(Math.random() * 255, Math.random() * 255, Math.random() * 255, 0.5); // 랜덤 색상
      
      context.beginPath();
      context.strokeStyle = 'rgba(255, 255, 255, 0)';
      cellPolygonPoints.forEach((cellPolygonPoint, cellPolygonPointIndex) => {
        if (cellPolygonPointIndex === 0) {
          context.moveTo(cellPolygonPoint[0], cellPolygonPoint[1]);
        } else {
          context.lineTo(cellPolygonPoint[0], cellPolygonPoint[1]);
        }
      });
      context.fillStyle = `rgba(${randomColor.r}, ${randomColor.g}, ${randomColor.b}, ${randomColor.opacity})`;
      context.stroke();
      context.fill();
      context.closePath();
    });

    // canvas 를 특정 element 안에 추가합니다.
    boxElementRef.current?.appendChild(canvas);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;