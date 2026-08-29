import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Taskers | Your accounts. Our hands. A 50/50 split.",
  description: "Create your AI training accounts, then let AI Taskers handle the training tasks and day-to-day workload for a straightforward 50/50 split.",
  metadataBase: new URL("https://ai-taskers.nopt.in"),
  icons: { icon: "/icon.png", apple: "/ai-taskers-mark.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
