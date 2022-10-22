import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { select, forceSimulation, forceCollide, forceManyBody, forceCenter, forceLink } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://devdocs.io/d3~7/d3-force#forcelink
// https://www.d3indepth.com/force-layout/
// https://medium.com/@bryony_17728/d3-js-two-v-4-network-charts-compared-8d3c66b0499c
// https://bl.ocks.org/rsk2327/2ebd7f00d43b492e64eee14f35babeac

interface Data {
  id: number;
  x: number;
  y: number;
  name: string;
}

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-126-forceLink</title>
        <meta name="description" content="d3-126-forceLink 예시 코드 페이지입니다." />
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
      d3.forceLink 지정된 링크와 기본 매개변수를 사용하여 새 링크 강제를 만듭니다. 링크를 지정하지 않으면 기본적으로 빈 배열이 사용됩니다.

      d3.forceSimulation 은 지정된 노드 배열로 힘 없이 새 시뮬레이션을 만듭니다. 
      노드를 지정하지 않으면 기본적으로 빈 배열이 사용됩니다. 시뮬레이터가 자동으로 시작됩니다. 
      시뮬레이션이 실행될 때 틱 이벤트를 수신하려면 Simulation.on을 사용하십시오. 
      대신 수동으로 시뮬레이션을 실행하려면 Simulation.stop을 호출한 다음 원하는 대로 Simulation.tick을 호출합니다.
    */

    const data: Data[] = [
      { id: 1, x: 10, y: 10, name: 'name1' },
      { id: 2, x: 15, y: 15, name: 'name2' },
      { id: 3, x: 20, y: 20, name: 'name3' },
      { id: 4, x: 25, y: 25, name: 'name4' },
      { id: 5, x: 30, y: 30, name: 'name5' },
    ];

    setInterval(() => {
      console.log('...data', data);
    }, 1000);

    const width = 300;
    const height = 300;

    var nodeLinks = [
      { source: 1, target: 1, x: 10, y: 10, distance: 10 },
      { source: 2, target: 2, x: 15, y: 15, distance: 20 },
      { source: 3, target: 3, x: 20, y: 20, distance: 30 },
      { source: 4, target: 4, x: 25, y: 25, distance: 40 },
      { source: 5, target: 5, x: 30, y: 30, distance: 50 },
    ];

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

    const text = svg
      .append('g')
      .selectAll('text')
      .data(data)
      .enter()
      .append('text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('fill', '#fff')
      .attr('dominant-baseline', 'middle')
      .text(function(d) {
        return d.id + '';
      });

    // 이 simulation 에 의해 data 의 x, y 값이 지속적으로 바뀜. 값이 바뀔 때마다 simulation.on('tick') 에 설정한 콜백함수가 호출됨.
    const simulation = forceSimulation(data)
      .force("collide", forceCollide().radius(10).strength(3)) // strength 값이 높을수록 요소들이 더 멀리 떨어짐.
      .force("manyBody", forceManyBody().strength(250))
      .force("center", forceCenter(width / 2, height / 2))
      .force(
        'link', 
        forceLink()
          .id((d: any) => { 
            console.log('forceLink.id.d', d); 
            return d.id!;
          })
          .distance(10)
          .strength(800)
          /*
            링크가 지정된 경우 이 힘과 연관된 링크 배열을 설정하고 각 링크에 대한 거리 및 강도 매개 변수를 다시 계산한 다음 이 힘을 반환합니다. 
            링크가 지정되지 않은 경우 현재 링크 배열을 반환합니다. 이 배열은 기본적으로 빈 배열로 설정됩니다.

            각 링크는 다음 속성을 가진 개체이어야 합니다.
            ※ source : 링크의 소스 노드. 시뮬레이션을 참조하십시오.
            ※ target : 링크의 대상 노드. 시뮬레이션을 참조하십시오.
            ※ index : 이 메서드에 의해 할당된 0 기반 인덱스를 링크로 지정합니다.

            편의를 위해 링크의 소스(source) 및 대상(target) 속성은 개체 참조 대신 숫자 또는 문자열 식별자를 사용하여 초기화할 수 있습니다. link.id 를 참조하십시오. 
            링크 힘이 초기화(또는 노드 또는 링크가 변경될 때처럼 다시 초기화)될 때 모든 링크개체가 아닌 source 또는 link.target 속성은 지정된 식별자로 해당 노드에 대한 개체 참조로 대체됩니다.

            링크가 시뮬레이션에 추가되거나 시뮬레이션에서 제거되는 경우와 같이 지정된 링크 배열이 수정되는 경우, 이 메서드를 새(또는 변경된) 배열로 다시 호출하여 변경 내용을 알려야 합니다.
          */
          .links(nodeLinks)
        ,
      ) 
      .alpha(0.1)
      .alphaDecay(0)
    ;
    
    simulation
      .on('tick', ticked)
      .on('end', tickEnded)
    ;

    function ticked() {
      // 이미 circle 요소들에 data 를 바인딩했으므로, function (d) 의 값은 simulation 에 의해 변경된 값이 참조됨.
      circle
        .attr('cx', function(d) {
          // console.log('cx.d', d);
          return d.x; // simulation 에 의해 변경된 값으로 cx 값을 변경.
        })
        .attr('cy', function(d) {
          // console.log('cy.d', d);
          return d.y; // simulation 에 의해 변경된 값으로 cy 값을 변경.
        });

      text
        .attr('x', function(d) {
          // console.log('cx.d', d);
          return d.x - 4; // simulation 에 의해 변경된 값으로 cx 값을 변경.
        })
        .attr('y', function(d) {
          // console.log('cy.d', d);
          return d.y + 4; // simulation 에 의해 변경된 값으로 cy 값을 변경.
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
