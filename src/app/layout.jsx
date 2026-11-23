import "./globals.css";
import { portfolio } from "@/data/portfolio";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Krishnaraj R. | Full Stack Developer — React & MERN",
  description:
    "Portfolio of Krishnaraj R., a Full Stack Developer specializing in React, Next.js, Node.js and the MERN ecosystem. Building responsive, production-grade web applications.",
  keywords: [
    "Krishnaraj R",
    "Full Stack Developer",
    "React developer",
    "MERN developer",
    "Next.js",
    "Node.js",
    "Web portfolio",
  ],
  authors: [{ name: "Krishnaraj R." }],
  creator: "Krishnaraj R.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    title: "Krishnaraj R. | Full Stack Developer",
    description:
      "Selected projects, skills and experience from full stack developer Krishnaraj R., specializing in React, Next.js and the MERN ecosystem.",
    siteName: "Krishnaraj R. Portfolio",
    images: [
      {
        url: "/images/Npm registry.png",
        width: 1200,
        height: 675,
        alt: "Krishnaraj R. portfolio preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Krishnaraj R. | Full Stack Developer",
    description:
      "Selected projects, skills and experience from full stack developer Krishnaraj R.",
    images: ["/images/Npm registry.png"],
  },
  icons: { icon: "/images/krishnaraj-portrait.png" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Krishnaraj R.",
  jobTitle: "Full Stack Developer",
  url: siteUrl,
  email: portfolio.email,
  telephone: portfolio.phone,
  address: {
    "@type": "PostalAddress",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  sameAs: [
    "https://github.com/krishnaraj180",
    "https://linkedin.com/in/krishnaraj180",
  ],
  knowsAbout: [
    "React",
    "Next.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "JavaScript",
    "TypeScript",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      style={{
        "--color-background": portfolio.theme.background,
        "--color-surface": portfolio.theme.surface,
        "--color-raised": portfolio.theme.raised,
        "--color-text": portfolio.theme.text,
        "--color-muted": portfolio.theme.muted,
        "--color-subtle": portfolio.theme.subtle,
        "--accent-color": portfolio.theme.accent,
        "--secondary-color": portfolio.theme.secondary,
      }}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
