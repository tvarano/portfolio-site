export interface Project {
  id: string;
  title: string;
  category: "Personal" | "School" | "Intern" | "Competition";
  year: string;
  description: string;
  bullets?: string[];
  tech: string[];
  href?: string;
}
