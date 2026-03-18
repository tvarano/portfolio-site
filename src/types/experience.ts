export interface Project {
  name: string;
  bullets: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  bullets: string[];
  projects?: Project[];
  accent?: string;
  tier?: "featured" | "minor";
}
