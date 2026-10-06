import { useEffect, useMemo, useState } from "react";
import {
  Code2,
  Database,
  Server,
  Cloud,
  Wrench,
  Sparkles,
} from "lucide-react";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const categoryConfig = {
  Frontend: {
    icon: Code2,
    description: "Building responsive and interactive user interfaces.",
  },
  Backend: {
    icon: Server,
    description: "Developing APIs, business logic and server-side systems.",
  },
  Database: {
    icon: Database,
    description: "Working with databases and data-driven applications.",
  },
  "Tools & Cloud": {
    icon: Cloud,
    description: "Development tools, deployment and cloud technologies.",
  },
  Tools: {
    icon: Wrench,
    description: "Development tools and workflow technologies.",
  },
};

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/skill`);

        const text = await response.text();

        let result = {};

        try {
          result = text ? JSON.parse(text) : {};
        } catch {
          throw new Error("Invalid response received from server");
        }

        if (!response.ok) {
          throw new Error(result.message || "Failed to fetch skills");
        }

        setSkills(result.skills || []);
      } catch (err) {
        console.error("SKILLS FETCH ERROR:", err);
        setError(err.message || "Failed to load skills");
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        skills
          .filter((skill) => skill.is_active)
          .map((skill) => skill.category)
          .filter(Boolean)
      ),
    ];

    return ["All", ...uniqueCategories];
  }, [skills]);

  const filteredSkills = useMemo(() => {
    return skills
      .filter((skill) => skill.is_active)
      .filter(
        (skill) =>
          activeCategory === "All" ||
          skill.category === activeCategory
      )
      .sort(
        (a, b) =>
          Number(a.display_order || 0) -
          Number(b.display_order || 0)
      );
  }, [skills, activeCategory]);

  const getIcon = (category) => {
    const Icon = categoryConfig[category]?.icon || Code2;
    return Icon;
  };

  if (loading) {
    return (
      <section
        id="skills"
        className="relative overflow-hidden px-5 py-24 md:px-8 md:py-32"
      >
        <div className="mx-auto max-w-6xl">
          <div className="animate-pulse">
            <div className="h-4 w-20 rounded bg-white/10" />

            <div className="mt-5 h-12 w-80 max-w-full rounded bg-white/10" />

            <div className="mt-5 h-5 w-[500px] max-w-full rounded bg-white/10" />

            <div className="mt-12 flex gap-3">
              <div className="h-10 w-20 rounded-xl bg-white/10" />
              <div className="h-10 w-28 rounded-xl bg-white/10" />
              <div className="h-10 w-28 rounded-xl bg-white/10" />
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="h-36 rounded-2xl bg-white/[0.035]"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="skills"
        className="px-5 py-24 md:px-8 md:py-32"
      >
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl border border-red-400/20 bg-red-500/5 p-5 text-sm text-red-300">
            {error}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="skills"
      className="relative overflow-hidden px-5 py-24 md:px-8 md:py-32"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-0 top-1/4 h-80 w-80 rounded-full bg-violet-600/10 blur-[140px]" />

      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-indigo-600/10 blur-[150px]" />

      <div className="relative mx-auto max-w-6xl">

        {/* ================= HEADER ================= */}
        <div className="max-w-3xl">
          <div className="mb-3 flex items-center gap-2">
            <Sparkles
              size={16}
              className="text-violet-400"
            />

            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-400">
              Skills
            </p>
          </div>

          <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            Technologies I{" "}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              work with.
            </span>
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-400 md:text-lg">
            A collection of technologies and tools I use to build
            modern, scalable and user-friendly applications.
          </p>
        </div>

        {/* ================= CATEGORY FILTER ================= */}
        <div className="mt-10 flex flex-wrap gap-3">
          {categories.map((category) => {
            const active = activeCategory === category;

            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                  active
                    ? "border-violet-400/30 bg-violet-500/15 text-violet-300 shadow-lg shadow-violet-500/10"
                    : "border-white/10 bg-white/[0.035] text-slate-400 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* ================= SKILLS ================= */}
        {filteredSkills.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.035] p-8 text-center text-slate-400">
            No skills available in this category.
          </div>
        ) : (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredSkills.map((skill) => {
              const Icon = getIcon(skill.category);

              const proficiency = Math.min(
                100,
                Math.max(0, Number(skill.proficiency) || 0)
              );

              return (
                <div
                  key={skill.id}
                  className="group rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/25 hover:bg-white/[0.055]"
                >
                  {/* Top */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {/* Icon */}
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-violet-400/10 bg-violet-500/10">
                        {skill.icon_url ? (
                          <img
                            src={skill.icon_url}
                            alt={skill.name}
                            className="h-7 w-7 object-contain"
                          />
                        ) : (
                          <Icon
                            size={21}
                            className="text-violet-400"
                          />
                        )}
                      </div>

                      <div>
                        <h3 className="text-base font-semibold text-white">
                          {skill.name}
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                          {skill.category}
                        </p>
                      </div>
                    </div>

                    {/* Percentage */}
                    <span className="text-sm font-semibold text-violet-300">
                      {proficiency}%
                    </span>
                  </div>

                  {/* Progress */}
                  <div className="mt-5">
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-400 transition-all duration-700"
                        style={{
                          width: `${proficiency}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="mt-4 flex items-center justify-between text-xs">
                    <span className="text-slate-500">
                      Experience
                    </span>

                    <span className="text-slate-300">
                      {skill.experience_years || 0}{" "}
                      {Number(skill.experience_years) === 1
                        ? "year"
                        : "years"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ================= SUMMARY ================= */}
        {skills.length > 0 && (
          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span>
              Showing{" "}
              <span className="font-semibold text-slate-300">
                {filteredSkills.length}
              </span>{" "}
              skills
            </span>

            <span className="h-1 w-1 rounded-full bg-slate-600" />

            <span>
              {activeCategory === "All"
                ? "All categories"
                : activeCategory}
            </span>
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;