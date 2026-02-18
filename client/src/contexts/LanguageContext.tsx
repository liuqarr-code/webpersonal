import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type Language = "ES" | "EN" | "CA";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Dictionary of translations
const translations: Record<string, Record<Language, string>> = {
  // Navigation
  "nav.portfolio": {
    ES: "LUCA CARRUBBA",
    EN: "LUCA CARRUBBA",
    CA: "LUCA CARRUBBA"
  },
  "nav.contact": {
    ES: "LINKEDIN",
    EN: "LINKEDIN",
    CA: "LINKEDIN"
  },
  "nav.bio": {
    ES: "BIO COMPLETA",
    EN: "FULL BIO",
    CA: "BIO COMPLETA"
  },
  
  // Hero
  "hero.line2": {
    ES: "En Cultura",
    EN: "In Culture",
    CA: "En Cultura"
  },
  "hero.line3": {
    ES: "Digital.",
    EN: "Digital.",
    CA: "Digital."
  },
  "hero.intro": {
    ES: "Mi práctica se sitúa en la intersección crítica entre arte, tecnología y sociedad. Utilizo la investigación académica, el comisariado y la docencia como herramientas intercambiables para decodificar la cultura digital contemporánea. No distingo entre crear una exposición, diseñar un plan de estudios o asesorar una estrategia tecnológica: todos son procesos para construir futuros más legibles.",
    EN: "My practice sits at the critical intersection of art, technology, and society. I use academic research, curating, and teaching as interchangeable tools to decode contemporary digital culture. I make no distinction between creating an exhibition, designing a curriculum, or advising on a tech strategy: all are processes for building more legible futures.",
    CA: "La meva pràctica se situa a la intersecció crítica entre art, tecnologia i societat. Utilitzo la recerca acadèmica, el comissariat i la docència com a eines intercanviables per descodificar la cultura digital contemporània. No distingeixo entre crear una exposició, dissenyar un pla d'estudis o assessorar una estratègia tecnològica: tots són processos per construir futurs més llegibles."
  },

  // Projects Section
  "projects.title": {
    ES: "PROYECTOS",
    EN: "PROJECTS",
    CA: "PROJECTES"
  },
  "projects.selection": {
    ES: "(SELECCIÓN 2023-2026)",
    EN: "(SELECTION 2023-2026)",
    CA: "(SELECCIÓ 2023-2026)"
  },
  
  // Philosophy Section
  "philosophy.title": {
    ES: "FILOSOFÍA DE TRABAJO",
    EN: "WORK PHILOSOPHY",
    CA: "FILOSOFIA DE TREBALL"
  },
  "philosophy.text": {
    ES: "Creo en la simplicidad radical. Eliminar lo innecesario hasta que solo quede lo esencial. No decoro, diseño. Cada píxel tiene un propósito.",
    EN: "I believe in radical simplicity. Removing the unnecessary until only the essential remains. I do not decorate, I design. Every pixel has a purpose.",
    CA: "Crec en la simplicitat radical. Eliminar allò innecessari fins que només quedi l'essencial. No decoro, dissenyo. Cada píxel té un propòsit."
  },

  // Footer
  "footer.creating": {
    ES: "CREANDO",
    EN: "CREATING",
    CA: "CREANT"
  },
  "footer.future": {
    ES: "FUTURO",
    EN: "FUTURE",
    CA: "FUTUR"
  },
  "footer.designed": {
    ES: "DISEÑADO CON PRECISIÓN.",
    EN: "DESIGNED WITH PRECISION.",
    CA: "DISSENYAT AMB PRECISIÓ."
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("ES");

  const t = (key: string): string => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[language] || entry["ES"];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
