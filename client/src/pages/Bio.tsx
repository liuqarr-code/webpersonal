import Layout from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Bio() {
  const { language } = useLanguage();

  const bioContent = {
    ES: {
      title: "Biografía",
      text: [
        "Luca Carrubba es investigador, comisario y docente especializado en cultura digital.",
        "Su trabajo explora las intersecciones entre arte, tecnología y sociedad, con un enfoque particular en cómo las herramientas digitales moldean nuestra percepción y comportamiento.",
        "Como gestor cultural, ha liderado proyectos que buscan democratizar el acceso al conocimiento tecnológico y fomentar la creación crítica.",
        "Actualmente combina su práctica como consultor independiente con la docencia en diversas instituciones académicas."
      ]
    },
    EN: {
      title: "Biography",
      text: [
        "Luca Carrubba is a researcher, curator, and educator specializing in digital culture.",
        "His work explores the intersections between art, technology, and society, with a particular focus on how digital tools shape our perception and behavior.",
        "As a cultural manager, he has led projects aimed at democratizing access to technological knowledge and fostering critical creation.",
        "He currently combines his practice as an independent consultant with teaching at various academic institutions."
      ]
    },
    CA: {
      title: "Biografia",
      text: [
        "Luca Carrubba és investigador, comissari i docent especialitzat en cultura digital.",
        "El seu treball explora les interseccions entre art, tecnologia i societat, amb un enfocament particular en com les eines digitals modelen la nostra percepció i comportament.",
        "Com a gestor cultural, ha liderat projectes que busquen democratitzar l'accés al coneixement tecnològic i fomentar la creació crítica.",
        "Actualment combina la seva pràctica com a consultor independent amb la docència en diverses institucions acadèmiques."
      ]
    }
  };

  const content = bioContent[language as keyof typeof bioContent] || bioContent.ES;

  return (
    <Layout>
      <section className="min-h-[60vh] flex flex-col justify-center max-w-4xl mx-auto mt-12 md:mt-24">
        <h1 className="text-massive font-display uppercase leading-[0.85] tracking-tighter mb-12 break-words">
          {content.title}
        </h1>
        
        <div className="space-y-8 font-body text-lg md:text-xl leading-relaxed border-l-4 border-foreground pl-6 md:pl-12">
          {content.text.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </section>
    </Layout>
  );
}
