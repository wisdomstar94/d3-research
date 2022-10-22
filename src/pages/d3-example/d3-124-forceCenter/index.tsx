import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { select, forceSimulation, forceCollide, forceCenter } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://devdocs.io/d3~7/d3-force#forcecenter
// https://observablehq.com/@d3/forcecenter-strength
// https://www.tabnine.com/code/javascript/functions/d3/forceCenter
// https://www.d3indepth.com/force-layout/

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-124-forceCenter</title>
        <meta name="description" content="d3-124-forceCenter 예시 코드 페이지입니다." />
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
      d3.forceCenter 는 지정된 x 및 y 좌표로 새로운 중심력을 생성합니다. 
      x와 y를 지정하지 않으면 기본값은 ⟨0,0⟩ 입니다.

      d3.forceSimulation 은 지정된 노드 배열로 힘 없이 새 시뮬레이션을 만듭니다. 
      노드를 지정하지 않으면 기본적으로 빈 배열이 사용됩니다. 시뮬레이터가 자동으로 시작됩니다. 
      시뮬레이션이 실행될 때 틱 이벤트를 수신하려면 Simulation.on을 사용하십시오. 
      대신 수동으로 시뮬레이션을 실행하려면 Simulation.stop을 호출한 다음 원하는 대로 Simulation.tick을 호출합니다.

      d3.forceCollide 는 지정된 반경으로 새로운 원 충돌력을 생성합니다. 반경을 지정하지 않으면 모든 노드에 대해 기본적으로 상수로 설정됩니다.

      d3.forceManyBody 는 기본 매개변수를 사용하여 새로운 다물체 힘을 작성합니다.
    */

    const data = [
      { x: 10, y: 10 },
      { x: 15, y: 15 },
      { x: 20, y: 20 },
      { x: 25, y: 25 },
      { x: 30, y: 30 },
    ];
  
    const width = 300;
    const height = 300;
  
    const svg = select(boxElementRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height);
  
    const circle = svg
      .append('g')
      .selectAll("circle")
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', d => d.x + 110)
      .attr('cy', d => d.y + 110)
      .attr('r', d => 10)
      .attr('style', 'fill: #f00')
    ;
  
    const simulation = forceSimulation(data)
      .force("collide", forceCollide().radius(10))
      // .force("manyBody", d3.forceManyBody().strength(250))
      .force("center", forceCenter(width / 2, height / 2)) // 요소들이 해당 좌표로 끌어당겨짐.
      .alpha(0.1)
      .alphaDecay(0)
    ;
      
    simulation
      .on('tick', ticked)
      .on('end', tickEnded)
    ;
  
    function ticked() {
      // console.log('ticked');
      const u = circle
        .attr('cx', function(d) {
          return d.x;
        })
        .attr('cy', function(d) {
          return d.y;
        });
    }
  
    function tickEnded() {
      // console.log('tickEnded');
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
