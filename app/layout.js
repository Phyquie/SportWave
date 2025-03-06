import { Geist, Geist_Mono } from "next/font/google";
import QueryProvider from "./QueryProvider";
import "./globals.css";


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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          {children}
        </QueryProvider>
        
      </body>
    </html>
  );
}
