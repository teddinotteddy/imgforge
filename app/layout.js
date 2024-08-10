import { GeistSans } from "geist/font/sans";
import Footer from "./components/footer";
import Header from "./components/header";
import "./globals.css";

export const metadata = {
  title: "ImgForge",
  description: "Generate images at the speed of light.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="flex h-screen flex-col justify-between">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
