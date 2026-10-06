import {
    ArrowDown,
    ArrowUpRight,
    Code2,
  
    Mail,
    Download,
} from "lucide-react";
import profile from '../assets/illustration2.png'

const Hero = () => {
    return (
        <section
            id="home"
            className="relative flex min-h-screen items-center overflow-hidden px-6 pb-20 pt-32"
        >
            {/* Background glow */}
            <div className="pointer-events-none absolute left-[10%] top-[15%] h-72 w-72 rounded-full bg-violet-600/20 blur-[120px]" />

            <div className="pointer-events-none absolute bottom-[5%] right-[5%] h-80 w-80 rounded-full bg-indigo-600/10 blur-[130px]" />

            <div className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-[100px]" />

            {/* Content */}
            <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">

                {/* LEFT */}
                <div>

                    {/* Small badge */}
                    <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-xs font-medium text-violet-300 backdrop-blur-md">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-violet-400" />

                        Available for opportunities
                    </div>

                    {/* Heading */}
                    <h1 className="max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl">

                        Hi, I'm{" "}

                        <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                            Ruchi
                        </span>

                        <br />

                        <span className="text-slate-200">
                            Full Stack Developer
                        </span>

                    </h1>

                    {/* Description */}
                    <p className="mt-7 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
                        I build modern, scalable and user-focused web
                        applications using JavaScript, React, Node.js,
                        Express and MongoDB.
                    </p>

                    {/* Buttons */}
                    <div className="mt-9 flex flex-wrap gap-4">

                        <a
                            href="#projects"
                            className="group flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-violet-600/20 transition duration-300 hover:-translate-y-0.5 hover:bg-violet-500"
                        >
                            View Projects

                            <ArrowUpRight
                                size={17}
                                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                            />
                        </a>

                        <a
                            href="#contact"
                            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-slate-200 backdrop-blur-xl transition duration-300 hover:border-violet-400/30 hover:bg-white/[0.08]"
                        >
                            <Mail size={17} />

                            Contact Me
                        </a>

                    </div>

                    {/* Socials */}
                    <div className="mt-10 flex items-center gap-3">

                        <span className="mr-2 text-xs uppercase tracking-[0.2em] text-slate-600">
                            Connect
                        </span>

                        <a
                            href="#"
                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-400 backdrop-blur-md transition hover:border-violet-400/30 hover:bg-violet-500/10 hover:text-violet-300"
                        >
                            <Code2 size={18} />
                        </a>

                        <a
                            href="#"
                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-400 backdrop-blur-md transition hover:border-violet-400/30 hover:bg-violet-500/10 hover:text-violet-300"
                        >
                            <Code2 size={18} />
                        </a>

                    </div>
                </div>

                {/* RIGHT - PROFILE CARD */}
                <div className="relative flex justify-center lg:justify-end">

                    {/* Glow behind card */}
                    <div className="absolute h-72 w-72 rounded-full bg-violet-600/20 blur-[100px]" />

                    {/* Glass card */}
                    <div className="relative w-full max-w-[390px] rounded-[2rem] border border-white/10 bg-white/[0.05] p-3 shadow-2xl shadow-black/40 backdrop-blur-2xl">

                        {/* Image */}
                               <div className="flex justify-center">
  <div className="h-80 w-80 overflow-hidden rounded-full border-2 border-violet-400/30">
    <img
      src={profile}
      alt="Profile"
      className="h-full w-full object-cover"
    />
  </div>
</div>
                        {/* Bottom card */}
                        <div className="flex items-center justify-between px-3 py-4">

                            <div>
                                <p className="text-xs text-slate-500">
                                    Based in
                                </p>

                                <p className="mt-1 text-sm font-medium text-slate-200">
                                    India
                                </p>
                            </div>

                            <a
                                href="#"
                                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-slate-300 transition hover:bg-white/[0.08]"
                            >
                                <Download size={14} />
                                Resume
                            </a>

                        </div>
                    </div>
                </div>

            </div>

            {/* Scroll indicator */}
            <a
                href="#about"
                className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-slate-600 transition hover:text-violet-400 md:flex"
            >
                <span className="text-[10px] uppercase tracking-[0.3em]">
                    Scroll
                </span>

                <ArrowDown
                    size={16}
                    className="animate-bounce"
                />
            </a>
        </section>
    );
};

export default Hero;