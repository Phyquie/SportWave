import { Geist, Geist_Mono } from "next/font/google";
import QueryProvider from "./QueryProvider";
import "./globals.css";
import { Montserrat } from 'next/font/google'
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400'] })
import Header from "./components/Header";
import { Footer } from "./components/Footer";
import { Toaster } from "react-hot-toast";


import "leaflet/dist/leaflet.css";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Create a QueryClient instance

export const metadata = {
  title: "Sportwave",
  description: "Sportwave is a platform for sports enthusiasts to connect and share their passion for sports.",
  openGraph: {
    title: "Sportwave",
    description: "Sportwave is a platform for sports enthusiasts to connect and share their passion for sports.",
    url: "https://sport-wave-beta.vercel.app/",
    siteName: "Sportwave",
    images: [
      {
        url: "https://wallpaper-house.com/data/out/8/wallpaper2you_238141.jpg",
        width: 800,
        height: 600,
        alt: "Sportwave Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${montserrat.className}`}
      >
        <QueryProvider>
          <Toaster />
          <Header />
          {children}
          <Footer />
        </QueryProvider>

      </body>
    </html>
  );
}
