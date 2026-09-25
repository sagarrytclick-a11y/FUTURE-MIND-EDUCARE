import { Fira_Sans } from "next/font/google";

// Fira Sans is a variable font, so no weight needs to be specified.
// Loaded once here and shared by all layouts to avoid duplicate font instances.
export const firaSans = Fira_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-fira-sans",
  display: "swap",
  preload: true,
});
