import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import ProjectList from "@/components/ProjectList";

// Define role types for translations
type Role = {
  line1: { ES: string; EN: string; CA: string };
  line2: { ES: string; EN: string; CA: string };
};

// Define roles with translations
const roles: Role[] = [
  {
    line1: { ES: "GESTOR", EN: "CULTURAL", CA: "GESTOR" },
    line2: { ES: "CULTURAL", EN: "MANAGER", CA: "CULTURAL" }
  },
  {
    line1: { ES: "COMISARIO", EN: "ART", CA: "COMISSARI" },
    line2: { ES: "ARTE DIGITAL", EN: "CURATOR", CA: "ART DIGITAL" }
  },
  {
    line1: { ES: "CONSULTOR", EN: "CONSULTANT", CA: "CONSULTOR" },
    line2: { ES: "TECNOLOGÍA Y CULTURA", EN: "TECH & CULTURE", CA: "TECNOLOGIA I CULTURA" }
  }
];

export default function Home() {
  const { t, language } = useLanguage();
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [fade, setFade] = useState(true);

  // Rotate roles every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Start fade out
      setTimeout(() => {
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        setFade(true); // Fade in new text
      }, 300); // Wait for fade out animation
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const currentRole = roles[currentRoleIndex];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="min-h-[70vh] flex flex-col justify-center mb-24">
        <h1 className="text-massive font-display uppercase leading-[0.85] tracking-tighter break-words min-h-[3em]">
          <span className={`block transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'}`}>
            {currentRole.line1[language]}<br />
            <span className="outline-text">
              {currentRole.line2[language]}
            </span>
          </span>
        </h1>
        <div className="mt-8 md:mt-12 max-w-3xl ml-auto">
          <p className="font-body text-lg md:text-xl leading-relaxed border-l-4 border-foreground pl-6">
            {t("hero.intro")}
          </p>
        </div>
      </section>

      {/* Projects List */}
      <section className="mb-24">
        <div className="flex items-baseline justify-between border-b-4 border-foreground pb-4 mb-8">
          <h2 className="font-display text-4xl md:text-6xl uppercase">{t("projects.title")}</h2>
          <span className="font-body text-sm md:text-base">{t("projects.selection")}</span>
        </div>

        <ProjectList />
      </section>

      {/* About / Philosophy Section */}
      <section className="grid md:grid-cols-2 gap-12 items-start border-t-4 border-foreground pt-12">
        <div>
          <h2 className="font-display text-5xl md:text-8xl uppercase leading-none mb-8">
            {t("philosophy.title")}
          </h2>
        </div>
        <div className="space-y-8 font-body text-base md:text-lg">
          <p>
            {t("philosophy.text")}
          </p>

        </div>
      </section>
    </Layout>
  );
}
