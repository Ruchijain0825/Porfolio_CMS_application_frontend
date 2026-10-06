import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import Education from "../components/Education";
import Contact from "../components/Contact";

const Portfolio = () => {
    return (
        <div className="min-h-screen bg-[#070711] text-white">
            <Navbar />

            <main>
                <Hero />
                <About />
                <Skills />
                <Experience/>
                 <Projects />
                 <Education/>
                 <Contact/>
            </main>
        </div>
    );
};

export default Portfolio;