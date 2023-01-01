"use client"
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { FormatSpecifier, format } from 'd3';

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-003-format-specifier</title>
        <meta name="description" content="d3-003-format-specifier 예시 코드 페이지입니다." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContents />
    </>
  );
};

const PageContents = () => {
  const boxElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    boxElementRef.current?.childNodes.forEach((item) => {
      boxElementRef.current?.removeChild(item);
    });

    const w = 400;
    // const h = (w * 9) / 16;
    const h = 400;
    const canvas = document.createElement('canvas'); 
    const context = canvas.getContext('2d');
    canvas.width = w;
    canvas.height = h;

    /*
      [ fill ]
      fill 은 "{" 또는 "}" 이외의 모든 문자가 될 수 있습니다. 
      채우기 문자의 존재는 정렬 옵션 중 하나여야 하는 그 뒤에 오는 문자로 표시 됩니다.

      [ align ]
      ("<") : 사용 가능한 공간 내에서 필드가 왼쪽 정렬되도록 강제합니다.
      (">") : 사용 가능한 공간 내에서 필드가 오른쪽 정렬되도록 합니다. (기본값).
      ("^") : 사용 가능한 공간 내에서 필드가 중앙에 오도록 합니다.

      [ sign ]
      더하기("+") : 양수와 음수 모두에 부호를 사용해야 합니다.
      빼기("-") : 기호는 음수에만 사용해야 합니다. (기본값입니다.)
      공백(" ") : 양수에는 선행 공백을 사용하고 음수에는 빼기 기호를 사용해야 합니다.

      [ symbol ]
      통화("$") : 통화 기호는 로케일별로 접두사(또는 접미사)여야 합니다.
      기본("#") : 2진, 8진 또는 16진 출력의 경우 접두어에 각각 "0b", "0o" 또는 "0x"를 붙입니다.

      [ zero ] : boolean
      zero 옵션은 제로 패딩을 활성화합니다.

      [ width ] : number
      width 는 최소 필드 너비를 정의합니다. 지정하지 않으면 너비가 내용에 따라 결정됩니다.

      [ comma ] : boolean
      comma 옵션을 사용하면 천 단위 구분 기호에 쉼표를 사용할 수 있습니다.

      [ precision ]
      precision(정밀도)는 "f" 및 "%" 형식으로 형식이 지정된 값의 경우 
      소수점 뒤에 표시되어야 하는 자릿수 또는 "g", "r" 및 "p 형식으로 형식이 지정된 값의 경우 
      소수점 앞과 뒤에 표시되어야 하는 자릿수를 나타냅니다.

      [ type ]
      지수("e") : [[Number.toExponential|https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Number/toExponential]]
      일반("g") : [[Number.toPrecision|https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Number/toPrecision]]
      고정("f") : [[Number.toFixed|https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Number/toFixed]]
      정수("d") : [[Number.toString|https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Number/toString]]
                  정수가 아닌 값은 무시합니다.
      반올림("r") : 고정("f")과 유사한 방식으로 필요한 경우 0으로 채우고 정밀도 유효 숫자로 반올림합니다. 
                    정밀도가 지정 되지 않으면 일반 표기법으로 대체됩니다.
      백분율("%") : 고정된 것과 같지만 100을 곱하고 "%"를 접미사로 붙입니다.
      반올림 백분율("p") : 반올림과 비슷하지만 100을 곱하고 접미사에 "%"를 붙입니다.
      이진법("b") : 2진법의 숫자를 출력합니다.
      8진수("o") : 8진수로 숫자를 출력합니다.
      16진수("x") : 9보다 큰 숫자에 소문자를 사용하여 16진수로 숫자를 출력합니다.
      16진수("X") : 9보다 큰 숫자에 대문자를 사용하여 16진수로 숫자를 출력합니다.
      문자("c") : 인쇄하기 전에 정수를 해당 유니코드 문자로 변환합니다.
      SI 접두사("s") : 반올림과 비슷하지만 메가의 경우 "9.5M" 또는 마이크로의 경우 "1.00µ"와 같이 단위 접미사가 붙습니다.

    */

    const formatSpecifier = new FormatSpecifier({
      align: '^',  
      comma: true as any, // 원래 boolean 인데.. 왜 string 으로 type 지정이 되어 있는지 모르겠음.. 그래서 불가피하게 as any 를 붙임..
      fill: '',
      precision: '5',
      sign: '-',
      symbol: '#',
      trim: true as any, // 원래 boolean 인데.. 왜 string 으로 type 지정이 되어 있는지 모르겠음.. 그래서 불가피하게 as any 를 붙임..
      type: 'd',
      width: '8',
      zero: true as any, // 원래 boolean 인데.. 왜 string 으로 type 지정이 되어 있는지 모르겠음.. 그래서 불가피하게 as any 를 붙임..
    });
    console.log('formatSpecifier', formatSpecifier);

    const formatter1 = format(formatSpecifier.toString());
    console.log(`formatter1(2)`, formatter1(2));
    console.log(`formatter1(-2)`, formatter1(-2));
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;