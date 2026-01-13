
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout is minimal and doesn't include the main admin header/nav
  return <>{children}</>;
}
