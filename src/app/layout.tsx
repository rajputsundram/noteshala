
import type { Metadata } from "next";
import "./globals.css";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

import ThemeProviderWrapper from "../components/ThemeProviderWrapper";


export const metadata: Metadata = {
  title: "Noteshala",
  description: "Generated by Noteshala",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProviderWrapper attribute="class">
      
        <Header/>
     
        {children}
        <Footer/>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
