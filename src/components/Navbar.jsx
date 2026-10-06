import { useEffect, useState } from "react";
import {
    Menu,
    X,
    Home,
    UserRound,
    Code2,
    BriefcaseBusiness,
    FolderKanban,
    GraduationCap,
    FileText,
    Mail,
} from "lucide-react";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [about, setAbout] = useState(null);

    useEffect(() => {
        const fetchAbout = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/admin/about`
                );

                const data = await response.json();

                console.log("NAVBAR ABOUT:", data);

                if (data.success) {
                    setAbout(data.about);
                }
            } catch (error) {
                console.error("NAVBAR ABOUT ERROR:", error);
            }
        };

        fetchAbout();
    }, []);

    const navItems = [
        { name: "Home", id: "home", icon: Home },
        { name: "About", id: "about", icon: UserRound },
        { name: "Skills", id: "skills", icon: Code2 },
        { name: "Experience", id: "experience", icon: BriefcaseBusiness },
        { name: "Projects", id: "projects", icon: FolderKanban },
        { name: "Education", id: "education", icon: GraduationCap },
        { name: "Blog", id: "blog", icon: FileText },
    ];

    const handleClick = (id) => {
        document.getElementById(id)?.scrollIntoView({
            behavior: "smooth",
        });

        setOpen(false);
    };

    return (
        <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 md:px-8">

            <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-3 shadow-2xl shadow-black/20 backdrop-blur-xl">

                {/* LOGO */}

                <button
                    onClick={() => handleClick("home")}
                    className="group flex items-center gap-3"
                >
                    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-violet-400/30 bg-violet-500/10 shadow-lg shadow-violet-500/20">
                        {about?.profile_image ? (
                            <img
                                src={about.profile_image}
                                alt={about?.name || "Profile"}
                                className="h-full w-full object-cover"
                                onLoad={() =>
                                    console.log(
                                        "NAVBAR IMAGE LOADED:",
                                        about.profile_image
                                    )
                                }
                                onError={(e) =>
                                    console.error(
                                        "NAVBAR IMAGE ERROR:",
                                        e.currentTarget.src
                                    )
                                }
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center text-lg font-bold text-violet-400">
                                R
                            </div>
                        )}
                    </div>

                    <div className="hidden sm:block">
                        <p className="text-sm font-semibold text-white">
                            {about?.name || "Portfolio"}
                        </p>

                        <p className="text-[9px] uppercase tracking-[0.25em] text-slate-500">
                            Developer
                        </p>
                    </div>
                </button>

                {/* DESKTOP LINKS */}

                <div className="hidden items-center gap-1 lg:flex">
                    {navItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <button
                                key={item.id}
                                onClick={() => handleClick(item.id)}
                                className="group flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-400 transition-all duration-200 hover:bg-white/[0.06] hover:text-white"
                            >
                                <Icon
                                    size={15}
                                    className="text-slate-500 transition group-hover:text-violet-400"
                                />

                                {item.name}
                            </button>
                        );
                    })}
                </div>

                {/* CONTACT */}

                <button
                    onClick={() => handleClick("contact")}
                    className="hidden items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition hover:bg-violet-500 md:flex"
                >
                    <Mail size={16} />
                    Contact
                </button>

                {/* MOBILE */}

                <button
                    onClick={() => setOpen(!open)}
                    className="rounded-xl border border-white/10 bg-white/[0.05] p-2 text-slate-300 lg:hidden"
                >
                    {open ? <X size={21} /> : <Menu size={21} />}
                </button>
            </nav>

            {/* MOBILE MENU */}

            {open && (
                <div className="mx-auto mt-2 max-w-7xl rounded-2xl border border-white/10 bg-[#0c0b18]/95 p-3 shadow-2xl backdrop-blur-xl lg:hidden">

                    {navItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <button
                                key={item.id}
                                onClick={() => handleClick(item.id)}
                                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-white/[0.06] hover:text-white"
                            >
                                <Icon
                                    size={17}
                                    className="text-violet-400"
                                />

                                {item.name}
                            </button>
                        );
                    })}

                    <button
                        onClick={() => handleClick("contact")}
                        className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white"
                    >
                        <Mail size={17} />
                        Contact Me
                    </button>
                </div>
            )}
        </header>
    );
};

export default Navbar;