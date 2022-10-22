import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { select, chordDirected, ascending, arc, ribbon } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-031-chordDirected</title>
        <meta name="description" content="d3-031-chordDirected 예시 코드 페이지입니다." />
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

    const data = [
      [10, 15, 20, 25, 30],
      [35, 40, 45, 50, 55],
      [60, 65, 70, 75, 80],
      [85, 90, 95, 100, 105],
      [110, 115, 120, 125, 130],
    ];
  
    const svg = select(boxElementRef.current)
      .append('svg')
      .attr("width", 300)
      .attr("height", 300)
      .append("g")
      .attr("transform", "translate(150,150)")
    ;
  
    const chord = chordDirected()
      .padAngle(0.5)
      .sortGroups(ascending)
      .sortSubgroups(ascending)
      .sortChords(ascending)
      (data)
    ;
  
    console.log('chord', chord);
  
    /*
      [ d3.datum 이란? ]
      - 선택 항목의 첫 번째 요소에 바인딩된 데이터를 반환하는 것으로 정의되므로 단일 선택 항목에만 의미가 있습니다.
      - 측정 또는 연구에서 파생된 사실 정보 항목 (단수 데이터)
  
      [ d3.data 이란? ]
      - 선택 항목의 각 요소에 대한 바인딩된 데이터를 가져와 반환되는 배열로 결합합니다.
      - 결론을 도출할 수 있는 사실의 모음 (데이터의 복수형)
  
      [ d3.chord 이란? ]
      - 데이터를 기반으로 원형 레이아웃을 그리도록 좌표 값 정보를 반환해주는 역할을 합니다.
      - 주로 d3.arc 와 d3.ribbon 과 같이 사용됩니다.
  
      [ d3.chordDirected ]
      - d3.chordDirected 로 반환된 source, target 데이터는 value 가 자기 자신에서 자기 자신으로 향합니다.
    */
  
    // 바깥에 arc 를 그리는 코드
    svg
      .datum(chord) // svg 밑의 g 요소(첫번째 요소)에 chord 값(배열)이 바인딩 됨.
      .append("g") // g 요소 밑에 g 요소를 추가하고 해당 g 요소를 선택함.
      .selectAll("g") // g 요소를 전체 선택함. (이 때 선택된 g 요소는 1개)
      .data(function (d) { // data 에서 datum 에서 바인딩된 chord 값(배열)을 d 라는 변수로 받는 함수를 호출하여 반환되는 값(d.groups)을 데이터로써 받아들인다.
        console.log('one.data.d', d);
        console.log('one.data.d.groups', d.groups);
        return d.groups; 
        /*
          [
            { endAngle: 0.82, index: 0, startAngle: 0, value: 100 },
            ...
          ]
        */
      })
      .enter() // 위 data 에서 받아들인 배열데이터 중에 바인딩 되지 못한 아이템만큼의 가상 요소들을 선택한다. (3개의 가상의 g 요소)
      .append("g") // 위 enter 에서 가상요소를 선택한 부분에 실제 g 요소를 추가한다. (이 때 총 4개의 g 요소가 선택된 상태)
      .append("path") // 4개의 g 요소 각각의 밑에 path 요소를 추가한다.
      .style("fill", "black") // 4개의 g 요소 각각의 밑에 추가된 path 들에 style 을 지정한다.
      .style("stroke", "black") // 4개의 g 요소 각각의 밑에 추가된 path 들에 style 을 지정한다.
      .attr("d", arc().innerRadius(140).outerRadius(160) as any) // 4개의 g 요소 각각의 밑에 추가된 path 들에 attr 을 지정한다.
    ;
  
    // arc 를 기준으로 ribbon 을 그리는 코드
    svg
      .datum(chord) // svg 요소(첫번째 요소)에 chord 값(배열)이 바인딩 됨.
      .append("g") // svg 요소 밑에 g 요소를 추가한다.
      .selectAll("path") // g 요소 밑의 path 요소를 선택한다. (이 때 선택된 path 요소는 0개)
      .data(function (d) { // data 에서 datum 에서 바인딩된 chord 값(배열)을 d 라는 변수로 받는 함수를 호출하여 반환되는 값(d)을 데이터로써 받아들인다.
        console.log('two.data.d', d);
        return d; 
        /*
          [
            {
              source: { endAngle: 0.08, index: 0, startAngle: 0, value: 10 },
              target: { endAngle: 0.08, index: 0, startAngle: 0, value: 10 },
            },
            ...
          ]
        */
      })
      .enter() // 위 data 에서 받아들인 배열데이터 중에 바인딩 되지 못한 아이템만큼의 가상 요소들을 선택한다. (10개의 가상의 path 요소)
      .append("path") // 위 enter 에서 가상요소를 선택한 부분에 실제 path 요소를 추가한다. (이 때 총 10개의 path 요소가 선택된 상태)
      .attr("d", ribbon().radius(150) as any) // 각각의 path 요소에 attr 을 지정한다.
      .style("fill", "#32a852") // 각각의 path 요소에 style 을 지정한다.
      .style("stroke", "black") // 각각의 path 요소에 style 을 지정한다.
    ;
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
