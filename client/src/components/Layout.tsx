import { ReactNode } from "react";
import { Link } from "wouter";
import { useLanguage } from "../contexts/LanguageContext";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
      {/* Brutalist Header: Just pure text, fixed or absolute */}
      <header className="fixed top-0 left-0 w-full z-50 p-4 md:p-8 flex justify-between items-start mix-blend-difference text-white pointer-events-none">
        <div className="flex flex-col gap-4 pointer-events-auto">
          <Link href="/" className="font-display text-xl md:text-2xl uppercase tracking-tighter hover:underline decoration-4 underline-offset-4">
            {t("nav.portfolio")}
          </Link>
          
          {/* Language Switcher */}
          <div className="flex gap-2 font-body text-sm">
            {(["ES", "EN", "CA"] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-1 transition-colors ${
                  language === lang 
                    ? "bg-white text-black font-bold" 
                    : "opacity-50 hover:opacity-100"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        <nav className="flex flex-col items-end gap-1 pointer-events-auto">
          <a href="https://www.linkedin.com/in/luca-carrubba/" target="_blank" rel="noopener noreferrer" className="font-body text-sm hover:bg-white hover:text-black px-1 transition-colors">
            {t("nav.contact")}
          </a>
          <Link href="/bio" className="font-body text-xs opacity-50 hover:opacity-100 hover:underline decoration-2 underline-offset-2 transition-all">
            {t("nav.bio")}
          </Link>
        </nav>
      </header>

      <main className="flex-grow pt-24 md:pt-32 pb-12 px-4 md:px-8">
        {children}
      </main>

      <footer className="p-4 md:p-8 border-t-4 border-foreground mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-4">
          <h2 className="font-display text-4xl md:text-6xl uppercase leading-none">
            {t("footer.creating")}<br />{t("footer.future")}
          </h2>
          <div className="text-right font-body text-xs md:text-sm">
            <p>© 2026 MANUS AI.</p>
            <p>{t("footer.designed")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
