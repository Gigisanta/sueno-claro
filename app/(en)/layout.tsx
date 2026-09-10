import type { Viewport } from "next";
import "../globals.css";
import { RootDocument } from "../../components/RootDocument";
export const viewport: Viewport = {
  themeColor: "#161918",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
