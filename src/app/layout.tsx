import "./globals.css";

export const metadata = {
  title: "CV Generator",
  description: "Generate ATS-Friendly CV with AI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="bg-white text-gray-900">{children}</body>
    </html>
  );
}
