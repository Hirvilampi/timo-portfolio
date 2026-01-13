import type { Metadata } from "next";
import { Geist, Geist_Mono, Lato } from "next/font/google";
import { Poppins, Montserrat } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato", // vapaaehtoinen, mutta suositeltava
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Timo's Portfolio",
  description: "Timo Lampinen's portfolio on software development and television directing/writing",
  icons: { icon: "/favicon.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
          // className={`${poppins.variable} ${montserrat.variable}`}
                      // className={`${poppins.variable} `}
                    // className={`$ ${montserrat.variable}`}
        className={`${lato.variable} antialiased`} 
              //  className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
