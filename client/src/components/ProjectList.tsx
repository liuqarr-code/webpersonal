import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import projectsData from "@/data/projects.json";

interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  description: {
    ES: string;
    EN: string;
    CA: string;
  };
  link: string;
}

export default function ProjectList() {
  const { language } = useLanguage();
  const [visibleProjects, setVisibleProjects] = useState<Project[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  const ITEMS_PER_PAGE = 4;

  // Initial load
  useEffect(() => {
    loadMoreProjects();
  }, []);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreProjects();
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, page]);

  const loadMoreProjects = () => {
    const nextItems = projectsData.slice(0, page * ITEMS_PER_PAGE);
    setVisibleProjects(nextItems);
    
    if (nextItems.length >= projectsData.length) {
      setHasMore(false);
    } else {
      setPage(prev => prev + 1);
    }
  };

  return (
    <div className="flex flex-col">
      {visibleProjects.map((project, index) => (
        <a 
          key={project.id} 
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative border-b border-foreground py-8 md:py-12 transition-all duration-300 hover:bg-foreground hover:text-background px-2 md:px-4 block cursor-pointer"
          onMouseEnter={() => setHoveredProject(project.id)}
          onMouseLeave={() => setHoveredProject(null)}
        >
          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 relative z-10">
            <div className="flex items-baseline gap-4 md:gap-8">
              {/* Auto-numbering: index + 1 padded with leading zero */}
              <span className="font-body text-xs md:text-sm opacity-60 group-hover:opacity-100">
                {(index + 1).toString().padStart(2, '0')}
              </span>
              <h3 className="font-display text-3xl md:text-7xl uppercase leading-none group-hover:translate-x-4 transition-transform duration-300">
                {project.title}
              </h3>
            </div>
            
            <div className="flex items-center justify-between md:justify-end gap-8 md:w-1/2">
              <span className="font-body text-xs md:text-sm uppercase tracking-widest">{project.category}</span>
              <span className="font-body text-xs md:text-sm">{project.year}</span>
              <ArrowUpRight className="w-6 h-6 md:w-12 md:h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
          
          {/* Description reveal on hover (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-difference text-white w-full text-center">
            <p className="font-body text-lg italic max-w-xl mx-auto">
              {project.description[language as keyof typeof project.description] || project.description.ES}
            </p>
          </div>
        </a>
      ))}
      
      {/* Loader / Trigger for infinite scroll */}
      {hasMore && (
        <div ref={loaderRef} className="py-8 text-center font-body text-sm opacity-50 animate-pulse">
          LOADING MORE...
        </div>
      )}
      
      {!hasMore && (
        <div className="py-8 text-center font-body text-sm opacity-50">
          END OF ARCHIVE
        </div>
      )}
    </div>
  );
}
