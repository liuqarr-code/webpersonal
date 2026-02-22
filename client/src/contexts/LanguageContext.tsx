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
    ES: "Trabajo en el cruce entre arte, ciencia, tecnología y sociedad, con un foco especial en la cultura digital y los videojuegos como lenguajes contemporáneos.  Diseño exposiciones, programas públicos y laboratorios para activar aprendizaje, pensamiento crítico y participación, y asesoro a instituciones en estrategias de fomento del videojuego y la cultura digital, conectando mediación cultural, educación y diseño de impacto social.",
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
    ES: "MÉTODO",
    EN: "METHOD",
    CA: "MÈTODE"
  },
  "philosophy.text": {
    ES: "Empiezo por la pregunta correcta y combino análisis de contexto, investigación acedémica y diseño de producción. Mi diferencial es una mirada crítica apoyada en conocimiento técnico de tecnología abierta, que facilita decisiones sostenibles, replicables y con impacto social. ",
    CA: "Començo des de la pregunta i combino anàlisi de context, recerca academica i disseny de producció. El meu diferencial és una mirada crítica sustentada en coneixement tècnic de tecnologia oberta, que facilita decisions sostenibles, replicables i amb impacte social.",
    EN: "I start from the right question combining contextual analysis, academic research, and production design. My strength lies in my critical perspective, backed by technical knowledge of open technology, which facilitates sustainable, replicable decisions with social impact.",
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
    ES: "DISEÑADO CON AMOR Y AYUDA DE LA IA.",
    EN: "DESIGNED WITH LOVE AND ALITTLE HELP FROM AI.",
    CA: "DISSENYAT AMB AMOR I AJUDA DE LA IA."
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
