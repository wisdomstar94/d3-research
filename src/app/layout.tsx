'use client';
import Head from "next/head";
import { RecoilRoot } from "recoil";
import RootComponent from "./_root";
import '../styles/globals.scss';
import CommonLayout from "../components/layouts/common-layout/common-layout.component";

// root layout (필수)
export default function RootLayout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <Head>
        <title>d3-research</title>
        <meta name="description" content="d3-research 페이지 입니다." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body data-name="commom-layout">
        <RecoilRoot>
          <RootComponent>
            <CommonLayout>
              {children}
            </CommonLayout>
          </RootComponent>
        </RecoilRoot>
      </body>
    </html>
  );
}
