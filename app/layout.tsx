import type { Metadata } from "next";
import "./globals.css";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
export const metadata: Metadata = {
  title: "Rock Paper Scissors",
  description: "Rock Paper Scissors Game",
  icons: {
    icon: "../public/assets/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen">
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
