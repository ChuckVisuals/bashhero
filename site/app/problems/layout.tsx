import Taskbar from "@/components/Taskbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Taskbar />
      {children}
    </div>
  );
}
