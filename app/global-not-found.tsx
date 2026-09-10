import "./globals.css";
export const metadata = {
  title: "Page not found · SleepLike",
  robots: { index: false, follow: false },
};
export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <main className="not-found">
          <p className="eyebrow">404 · SLEEPLIKE</p>
          <h1>This page is resting elsewhere.</h1>
          <p>Find your bedtime or explore a sleep guide.</p>
          <p>
            <a href="/">Open the calculator</a> ·{" "}
            <a href="/calculadora-de-sueno" lang="es">
              Calculadora en español
            </a>
          </p>
        </main>
      </body>
    </html>
  );
}
