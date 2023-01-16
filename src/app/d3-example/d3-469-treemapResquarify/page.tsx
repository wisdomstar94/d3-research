"use client"
import { hierarchy, select, treemap, treemapResquarify } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-469-treemapResquarify</title>
        <meta name="description" content="d3-469-treemapResquarify 예시 코드 페이지입니다." />
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
      d3.treemapResquarify 함수는 d3.treemapSquarify와 마찬가지로 
      d3.treemapResquarify에 의해 계산된 이전 레이아웃의 토폴로지(노드 인접)를 보존하는 것을 제외하고 
      동일한 대상 가로 세로 비율을 사용했습니다. 
      이 타일링 방법은 노드 크기만 변경하고 상대적 위치는 변경하지 않으므로 
      산만한 셔플링과 폐색을 방지하기 때문에 트리 맵의 변경을 애니메이션화하는 데 좋다. 
      그러나 안정적인 업데이트의 단점은 후속 업데이트에 대한 차선의 레이아웃이다. 
      첫 번째 레이아웃만 Bruls 등의 제곱 알고리즘을 사용한다.
    */
  
    const svg = 
      select(boxElementRef.current)
      .append('svg')
      .attr("width", "300")
      .attr("height", "300")
    ;

    const data = {
      name: "diet",
      children:
        [
          {
            name: "aaa",
            children: [
                {
                name: "pesonA",
                ground: "100",
                building: "200",
                cash: "300",
                total: "600"
                },
                {
                name: "pesonB",
                ground: "10",
                building: "20",
                cash: "300",
                total: "330"
                }
              ]
            },
          {
          name: "bbb",
          children: [
            {
              name: "pesonC",
              ground: "200",
              building: "10",
              cash: "100",
              total: "310"
            },
            {
              name: "pesonD",
              ground: "50",
              building: "30",
              cash: "10",
              total: "90"
            }
          ]
        }
      ]
    };
    const treeLayout = treemap().size([400, 400]);
    const root = hierarchy(data);  // (*)
    const links = treeLayout(root).links();  // (*)
    treemapResquarify(links[0].source, 0, 0, 400, 400);
    // const linkPathGenerator = linkHorizontal()  // (*)
    //   .x((d: any) => isNaN(d.x0) ? 0 : d.x0)
    //   .y((d: any) => isNaN(d.y0) ? 0 : d.y0)
    // ;
    console.log(`links`, links);
  
    // 좀 더 연구 필요..

    // svg
    //   .selectAll('path')
    //   .data(links)
    //   .enter()
    //   .append('rect')
    //   .attr('d', d => {
    //     console.log(`d`, d);
    //     return '';
    //   })
    //   .attr('fill', 'none')
    //   .attr('stroke', '#333')
    // ;
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
