import "./globals.css";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";

export const metadata = {
  title: {
    default: "LearnIND | Learn Then Earn",
    template: "%s | LearnIND",
  },
  description:
    "LearnIND Affiliate Training: a focused place to begin learning affiliate marketing.",
  applicationName: "LearnIND",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="site-layout">
          <SiteHeader />
          <div className="site-main">{children}</div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
