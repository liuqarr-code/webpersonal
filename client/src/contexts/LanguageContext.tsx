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
    ES: "Soy investigador, artista y comisario. Mi formación entre la sociología de la comunicación y el arte ha dado forma a una práctica transdisciplinaria donde la investigación, la curaduría, la creación y el activismo trecnopolítico se articulan para pensar críticamente la cultura digital contemporánea. Desarrollo actividades docentes y colaboro en el diseño de programas con organizaciones públicas y privadas de Europa y América Latina, abordando las transformaciones que las nuevas tecnologías imprimen sobre la industria cultural, los modelos de producción y las políticas del conocimiento.",
    EN: "I am a researcher, artist and curator. My background in the sociology of communication and the arts has shaped a transdisciplinary practice in which research, curating, creation and technopolitics activism converge to critically examine contemporary digital culture. I teach and collaborate in the design of programmes with public and private organisations across Europe and Latin America, addressing the transformations that new technologies impose on the cultural industries, models of production and the politics of knowledge.",
    CA: "Soc investigador, artista i comissari. La meva formació entre la sociologia de la comunicació i l'art ha donat forma a una pràctica transdisciplinària on la recerca, la comissaria, la creació i l'activisme tecnopolítico s'articulen per pensar críticament la cultura digital contemporània. Desenvolupo activitats docents i col·laboro en el disseny de programes amb organitzacions públiques i privades d'Europa i Amèrica Llatina, abordant les transformacions que les noves tecnologies imprimeixen sobre la indústria cultural, els models de producció i les polítiques del coneixement."
  },

  // Projects Section
  "projects.title": {
    ES: "PROYECTOS",
    EN: "PROJECTS",
    CA: "PROJECTES"
  },
  "projects.selection": {
    ES: "SELECCIÓN 2020-2026",
    EN: "SELECTION 2020-2026",
    CA: "SELECCIÓ 2020-2026"
  },
  "projects.all": {
    ES: "TODOS",
    EN: "ALL",
    CA: "TOTS"
  },
  "category.research": {
    ES: "INVESTIGACIÓN",
    EN: "RESEARCH",
    CA: "RECERCA"
  },
  "category.curation": {
    ES: "COMISARIADO",
    EN: "CURATION",
    CA: "COMISSARIAT"
  },
  "category.teaching": {
    ES: "DOCENCIA",
    EN: "TEACHING",
    CA: "DOCÈNCIA"
  },
  "category.innovation": {
    ES: "INNOVACIÓN",
    EN: "INNOVATION",
    CA: "INNOVACIÓ"
  },
  "category.art": {
    ES: "ARTE",
    EN: "ART",
    CA: "ART"
  },
  
  // Philosophy Section
  "philosophy.title": {
    ES: "MÉTODO",
    EN: "METHOD",
    CA: "MÈTODE"
  },
  "philosophy.text": {
    ES: "Empiezo por una pregunta y combino análisis de contexto, investigación académica y diseño de producción. Mi diferencial es una enfoque crítico apoyado en conocimiento técnico de tecnología abierta, que facilita decisiones sostenibles, replicables y con impacto social. ",
    CA: "Començo des de una pregunta i combino anàlisi de context, recerca academica i disseny de producció. El meu diferencial és una mirada crítica sustentada en coneixement tècnic de tecnologia oberta, que facilita decisions sostenibles, replicables i amb impacte social.",
    EN: "I start from a question combining contextual analysis, academic research, and production design. My strength lies in my critical approach, backed by technical knowledge of open technology, which facilitates sustainable, replicable decisions with social impact.",
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
