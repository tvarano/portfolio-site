import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Coursework from "@/components/sections/Coursework";
import Resume from "@/components/sections/Resume";
import Connect from "@/components/sections/Connect";
import CustomCursor from "@/components/layout/CustomCursor";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Coursework />
      <Resume />
      <Connect />
    </>
  );
}
