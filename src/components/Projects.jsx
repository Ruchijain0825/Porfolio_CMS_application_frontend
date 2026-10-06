import { useEffect, useState } from "react";
import {
  ExternalLink,
  Code2,
  FolderKanban,
  Sparkles,
} from "lucide-react";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/project`);

        const text = await response.text();

        let result = {};

        try {
          result = text ? JSON.parse(text) : {};
        } catch {
          throw new Error("Invalid response received from server");
        }

        if (!response.ok) {
          throw new Error(
            result.message || "Failed to fetch projects"
          );
        }

        setProjects(result.projects || []);
      } catch (err) {
        console.error("PROJECT FETCH ERROR:", err);
        setError(err.message || "Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const activeProjects = projects
    .filter((project) => project.is_active)
    .sort(
      (a, b) =>
        Number(a.display_order || 0) -
        Number(b.display_order || 0)
    );

  if (loading) {
    return (
      <section
        id="projects"
        className="px-5 py-20 md:px-8 md:py-24"
      >
        <div className="mx-auto max-w-6xl animate-pulse">
          <div className="h-4 w-24 rounded bg-white/10" />

          <div className="mt-4 h-10 w-80 max-w-full rounded bg-white/10" />

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-[330px] rounded-2xl bg-white/[0.035]"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="projects"
        className="px-5 py-20 md:px-8 md:py-24"
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
      id="projects"
      className="relative overflow-hidden px-5 py-20 md:px-8 md:py-24"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-0 top-1/4 h-72 w-72 rounded-full bg-violet-600/10 blur-[130px]" />

      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-indigo-600/10 blur-[140px]" />

      <div className="relative mx-auto max-w-6xl">

        {/* HEADER */}
        <div className="max-w-2xl">
          <div className="mb-2 flex items-center gap-2">
            <Sparkles
              size={15}
              className="text-violet-400"
            />

            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-400">
              Projects
            </p>
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Things I've{" "}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              built.
            </span>
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-400 md:text-base">
            A selection of applications and projects I've built
            while working with modern web technologies.
          </p>
        </div>

        {/* PROJECTS */}
        {activeProjects.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.035] p-6 text-center text-sm text-slate-400">
            No projects available.
          </div>
        ) : (
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {activeProjects.map((project) => (
              <article
                key={project.id}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] shadow-xl shadow-black/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/25 hover:bg-white/[0.055]"
              >
                {/* IMAGE */}
                <div className="relative h-40 overflow-hidden bg-black/20">
                  {project.image_url ? (
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <FolderKanban
                        size={36}
                        className="text-violet-400/40"
                      />
                    </div>
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

                  {/* Category */}
                  {project.category && (
                    <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-md">
                      {project.category}
                    </span>
                  )}
                </div>

                {/* CONTENT */}
                <div className="p-4">

                  <h3 className="text-base font-semibold text-white">
                    {project.title}
                  </h3>

                  {project.role && (
                    <p className="mt-1 text-xs font-medium text-violet-400">
                      {project.role}
                    </p>
                  )}

                  {project.description && (
                    <p className="mt-2 line-clamp-3 text-xs leading-5 text-slate-400">
                      {project.description}
                    </p>
                  )}

                  {/* TECH STACK */}
                  {project.technologies &&
                    project.technologies.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {project.technologies.map(
                          (technology, index) => (
                            <span
                              key={index}
                              className="rounded-md border border-white/10 bg-black/10 px-2 py-1 text-[10px] font-medium text-slate-300"
                            >
                              {technology}
                            </span>
                          )
                        )}
                      </div>
                    )}

                  {/* LINKS */}
                  <div className="mt-4 flex flex-wrap gap-2">

                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-violet-500"
                      >
                        <ExternalLink size={13} />
                        Live Demo
                      </a>
                    )}

                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                      >
                        <Code2 size={13} />
                        GitHub
                      </a>
                    )}

                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;