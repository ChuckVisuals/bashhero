import Taskbar from "@/components/Taskbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body>
      <Taskbar />
      {children}
    </body>
  );
}
