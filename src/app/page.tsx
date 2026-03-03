import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Coursework from "@/components/sections/Coursework";
import Resume from "@/components/sections/Resume";
import Connect from "@/components/sections/Connect";
import CustomCursor from "@/components/layout/CustomCursor";
import SectionScroller from "@/components/layout/SectionScroller";
import WavyDivider from "@/components/ui/WavyDivider";

export default function Home() {
  return (
    <>
      <SectionScroller />
      <CustomCursor />

      {/* Hero — cream */}
      <Hero />

      {/* cream → teal-soft */}
      <WavyDivider from="#FEFAE0" to="#E0F2F3" />

      {/* About — teal-soft (includes mini skills panel) */}
      <About />

      {/* teal-soft → amber-soft */}
      <WavyDivider from="#E0F2F3" to="#FDF3D9" />

      {/* Experience — amber-soft */}
      <Experience />

      {/* amber-soft → magenta-soft */}
      <WavyDivider from="#FDF3D9" to="#FCE4F8" />

      {/* Coursework — magenta-soft */}
      <Coursework />

      {/* magenta-soft → emerald-soft */}
      <WavyDivider from="#FCE4F8" to="#E0F5EA" flip />

      {/* Resume — emerald-soft */}
      <Resume />

      {/* emerald-soft → ink */}
      <WavyDivider from="#E0F5EA" to="#14213D" />

      {/* Connect — ink (dark) */}
      <Connect />
    </>
  );
}
