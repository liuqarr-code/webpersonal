import { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import projectsData from "@/data/projects.json";

interface Project {
  title: {
    ES: string;
    EN: string;
    CA: string;
  };
  category: {
    ES: string;
    EN: string;
    CA: string;
  };
  year: string;
  description: {
    ES: string;
    EN: string;
    CA: string;
  };
  link: string;
}

interface ProjectListProps {
  selectedCategory: string | null;
}

export default function ProjectList({ selectedCategory }: ProjectListProps) {
  const { language } = useLanguage();
  const [visibleProjects, setVisibleProjects] = useState<Project[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

  const ITEMS_PER_PAGE = 4;

  const getLocalizedText = (obj: { ES: string; EN: string; CA: string }) => {
    return obj[language as keyof typeof obj] || obj.ES;
  };

  // Filter projects when category changes
  useEffect(() => {
    const allProjects = projectsData as unknown as Project[];
    let filtered = allProjects;

    if (selectedCategory) {
      filtered = allProjects.filter(project => {
        // Compare localized category strings directly
        // The selectedCategory comes from Home.tsx which extracts it from the same JSON
        // so it matches the current language value
        const projectCat = getLocalizedText(project.category);
        return projectCat === selectedCategory;
      });
    }
    
    setFilteredProjects(filtered);
    setPage(1);
    
    // Initial load for new filter
    const initialItems = filtered.slice(0, ITEMS_PER_PAGE);
    setVisibleProjects(initialItems);
    setHasMore(filtered.length > ITEMS_PER_PAGE);
    
  }, [selectedCategory, language]); // Re-run when category OR language changes

  const loadMoreProjects = () => {
    const nextPage = page + 1;
    const nextItems = filteredProjects.slice(0, nextPage * ITEMS_PER_PAGE);
    setVisibleProjects(nextItems);
    setPage(nextPage);
    
    if (nextItems.length >= filteredProjects.length) {
      setHasMore(false);
    }
  };

  return (
    <div className="flex flex-col">
      {visibleProjects.length === 0 ? (
        <div className="py-12 text-center font-body opacity-50">
          {language === 'ES' ? 'No hay proyectos en esta categoría.' : 
           language === 'CA' ? 'No hi ha projectes en aquesta categoria.' : 
           'No projects in this category.'}
        </div>
      ) : (
        visibleProjects.map((project, index) => (
          <a 
            key={index} 
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative border-b border-foreground py-8 md:py-12 transition-all duration-300 hover:bg-foreground hover:text-background px-2 md:px-4 block cursor-pointer"
          >
            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 relative z-10">
              <div className="flex items-baseline gap-4 md:gap-8">
                {/* Auto-numbering: index + 1 padded with leading zero */}
                <span className="font-body text-xs md:text-sm opacity-60 group-hover:opacity-100">
                  {(index + 1).toString().padStart(2, '0')}
                </span>
                <h3 className="font-display text-3xl md:text-7xl uppercase leading-none group-hover:translate-x-4 transition-transform duration-300">
                  {getLocalizedText(project.title)}
                </h3>
              </div>
              
              <div className="flex items-center justify-between md:justify-end gap-8 md:w-1/2">
                <span className="font-body text-xs md:text-sm uppercase tracking-widest">
                  {getLocalizedText(project.category)}
                </span>
                <span className="font-body text-xs md:text-sm">{project.year}</span>
                <ArrowUpRight className="w-6 h-6 md:w-12 md:h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
            
            {/* Description reveal on hover (Desktop) - Positioned below title */}
            <div className="hidden md:block absolute bottom-4 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-difference text-white w-full text-center z-20">
              <p className="font-body text-lg italic max-w-2xl mx-auto px-4">
                {getLocalizedText(project.description)}
              </p>
            </div>
          </a>
        ))
      )}
      
      {/* Manual Load More Button */}
      {hasMore && visibleProjects.length > 0 && (
        <div className="py-8 flex justify-center">
          <button 
            onClick={loadMoreProjects}
            className="font-body text-sm opacity-50 hover:opacity-100 transition-opacity uppercase tracking-widest border border-transparent hover:border-foreground px-4 py-2"
          >
            {language === 'ES' ? 'CARGAR MÁS' : language === 'CA' ? 'CARREGAR MÉS' : 'LOAD MORE'}
          </button>
        </div>
      )}
      
      {!hasMore && visibleProjects.length > 0 && (
        <div className="py-8 text-center font-body text-sm opacity-50 uppercase tracking-widest">
          {language === 'ES' ? 'FIN DEL ARCHIVO' : language === 'CA' ? 'FI DE L\'ARXIU' : 'END OF ARCHIVE'}
        </div>
      )}
    </div>
  );
}
