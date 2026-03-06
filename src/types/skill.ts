export interface Skill {
  name: string;
  tier: "primary" | "secondary" | "tertiary" | "soft" | "tools";
  color?: string;
}
