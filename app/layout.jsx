import "./globals.css";

export const metadata = {
  title: "Shiftcove — Rota, without the group chat",
  description: "Build schedules, approve swaps, track hours, and send payroll-ready timesheets.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
