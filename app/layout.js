import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Head from "next/head"; // Import Head for adding meta and script tags

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SenTools-Your URL management tool",
  description:
    "SenTools is a URL management tool that allows you to manage your links and QR codes. It is a free and open-source URL management tool that allows you to manage your links and QR codes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        {/* Add Google AdSense verification meta tag */}
        <meta
          name="google-site-verification"
          content="your-verification-code"
        />
        
        {/* Load Google AdSense script */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2939320826714458"
          crossorigin="anonymous"
        ></script>
      </Head>
      <link rel="shortcut icon" href="/SenTools.png" type="image/png" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
