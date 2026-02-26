import Layout from "@/components/Layout";
import { useState, useEffect, useRef, useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import ProjectList from "@/components/ProjectList";
import { ChevronDown } from "lucide-react";
import projectsData from "@/data/projects.json";

// Define role types for translations
type Role = {
  line1: { ES: string; EN: string; CA: string };
  line2: { ES: string; EN: string; CA: string };
};

// Define roles with translations
const roles: Role[] = [
  {
    line1: { ES: "GESTOR", EN: "MANAGER", CA: "GESTOR" },
    line2: { ES: "CULTURAL", EN: "CULTURAL", CA: "CULTURAL" }
  },
  {
    line1: { ES: "COMISARIO", EN: "CURATOR", CA: "COMISSARI" },
    line2: { ES: "ARTE DIGITAL", EN: "DIGITAL ART", CA: "ART DIGITAL" }
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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const categoryMenuRef = useRef<HTMLDivElement>(null);

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

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (categoryMenuRef.current && !categoryMenuRef.current.contains(event.target as Node)) {
        setIsCategoryMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentRole = roles[currentRoleIndex];

  // Extract unique categories dynamically from JSON
  const categories = useMemo(() => {
    // Get all categories in current language
    const allCats = projectsData.map(p => {
      // Access category by current language key, fallback to ES
      return (p.category as any)[language] || (p.category as any).ES;
    });
    
    // Deduplicate
    const uniqueCats = Array.from(new Set(allCats)).sort();
    
    // Format for dropdown
    return [
      { key: null, label: t("projects.all") },
      ...uniqueCats.map(cat => ({
        key: cat as string,
        label: cat as string
      }))
    ];
  }, [language, t]); // Re-calculate when language changes

  const handleCategorySelect = (categoryKey: string | null) => {
    setSelectedCategory(categoryKey);
    setIsCategoryMenuOpen(false);
  };

  // Find label for current selection
  const currentCategoryLabel = selectedCategory 
    ? selectedCategory 
    : t("projects.selection");

  return (
    <Layout>
      {/* Hero Section */}
      <section className="min-h-[70vh] flex flex-col justify-center mb-24 relative">
        <div className="relative">
          {/* Invisible placeholder to reserve maximum height based on longest role */}
          <h1 className="text-massive font-display uppercase leading-[0.85] tracking-tighter break-words opacity-0 pointer-events-none" aria-hidden="true">
            CONSULTOR<br />
            <span className="outline-text">TECNOLOGÍA Y CULTURA</span>
          </h1>
          
          {/* Absolute positioned active role */}
          <h1 className="text-massive font-display uppercase leading-[0.85] tracking-tighter break-words absolute top-0 left-0 w-full">
            <span className={`block transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'}`}>
              {currentRole.line1[language]}<br />
              <span className="outline-text">
                {currentRole.line2[language]}
              </span>
            </span>
          </h1>
        </div>
        
        <div className="mt-8 md:mt-12 max-w-3xl ml-auto relative z-10">
          <p className="font-body text-lg md:text-xl leading-relaxed border-l-4 border-foreground pl-6">
            {t("hero.intro")}
          </p>
        </div>
      </section>

      {/* Projects List */}
      <section className="mb-24">
        <div className="flex flex-col md:flex-row md:items-baseline justify-between border-b-4 border-foreground pb-4 mb-8 gap-4">
          <h2 className="font-display text-4xl md:text-6xl uppercase">{t("projects.title")}</h2>
          
          {/* Category Filter Dropdown */}
          <div className="relative z-50" ref={categoryMenuRef}>
            <button 
              onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
              className="font-body text-sm md:text-base uppercase tracking-widest flex items-center gap-2 hover:opacity-70 transition-opacity border border-transparent hover:border-foreground px-4 py-2"
            >
              {currentCategoryLabel}
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isCategoryMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Dropdown Menu */}
            {isCategoryMenuOpen && (
              <div className="absolute right-0 top-full mt-2 bg-background border-2 border-foreground w-64 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all duration-300 origin-top-right max-h-64 overflow-y-auto">
                <ul className="py-2">
                  {categories.map((cat, index) => (
                    <li key={index}>
                      <button
                        onClick={() => handleCategorySelect(cat.key)}
                        className={`w-full text-left px-6 py-3 font-body text-sm uppercase hover:bg-foreground hover:text-background transition-colors ${selectedCategory === cat.key ? 'bg-foreground/10 font-bold' : ''}`}
                      >
                        {cat.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Pass the selected category directly */}
        <ProjectList selectedCategory={selectedCategory} />
      </section>

      {/* About / Philosophy Section */}
      <section className="grid md:grid-cols-2 gap-12 items-start border-t-4 border-foreground pt-12">
        <div className="flex flex-col gap-8">
          <h2 className="font-display text-5xl md:text-8xl uppercase leading-none mb-8">
            {t("philosophy.title")}
          </h2>
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-foreground transition-all duration-500">
             <img 
               src="/profile.png" 
               alt="Luca Carrubba" 
               className="w-full h-full object-cover"
             />
          </div>
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
