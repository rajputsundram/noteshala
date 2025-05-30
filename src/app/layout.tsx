import React from "react";
import { AuthProvider } from '../../context/Authcontext'
import Authprovider from '../components/Authprovider/Authprovider'

import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    <html lang="en" className="dark" >
      <body>
        <Authprovider>
      <AuthProvider>
      <ToastContainer theme="dark"/>
        <ThemeProviderWrapper>
        <Header/>
        {children}
        <Footer/>
        </ThemeProviderWrapper>
        </AuthProvider>
        </Authprovider>
      </body>
    </html>
  );
}
