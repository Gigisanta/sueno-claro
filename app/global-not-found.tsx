import "./globals.css";
import { RootDocument } from "../components/RootDocument";
import { PageChrome } from "../components/PageChrome";
import { NightPicture } from "../components/NightPicture";
import { localeCopy } from "../lib/locales";
export const metadata = {
  title: "Page not found · SleepLike",
  robots: { index: false, follow: false },
};
export default function NotFound() {
  return (
    <RootDocument locale="en">
      <PageChrome lang="en" pageKey="home">
        <div className="page-content not-found">
          <h1>This page is resting elsewhere.</h1>
          <p>404 · SleepLike</p>
          <p>Find your bedtime or explore a sleep guide.</p>
          <p>
            <a className="calculate-button" href="/">Open the calculator</a>
            <a href="/calculadora-de-sueno" lang="es">
              Calculadora en español
            </a>
          </p>
          <NightPicture alt={localeCopy.en.taste.nightAlt} />
        </div>
      </PageChrome>
    </RootDocument>
  );
}
