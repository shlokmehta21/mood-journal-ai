import "./globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ChakraUIProvider } from "@/providers/ChakraUIProvider";
import { getCurrentScheme } from "@/utils/getCurrentTheme";
import NextTopLoader from "nextjs-toploader";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mood AI ✨",
  description: "The best Journal App.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const color = await getCurrentScheme();

  return (
    <ClerkProvider
      appearance={{
        baseTheme: color === "dark" ? dark : undefined,
      }}
    >
      <html
        lang="en"
        className={color === "dark" ? "dark" : "light"}
        data-theme={color === "dark" ? "dark" : "light"}
      >
        <body className={inter.className}>
          <NextTopLoader />
          <ChakraUIProvider>{children}</ChakraUIProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
