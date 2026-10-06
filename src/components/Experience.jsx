import { useEffect, useState } from "react";
import {
  Briefcase,
  MapPin,
  CalendarDays,
  Code2,
  Sparkles,
} from "lucide-react";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/experience`);

        const text = await response.text();

        let result = {};

        try {
          result = text ? JSON.parse(text) : {};
        } catch {
          throw new Error("Invalid response received from server");
        }

        if (!response.ok) {
          throw new Error(
            result.message || "Failed to fetch experiences"
          );
        }

        setExperiences(result.experiences || []);
      } catch (err) {
        console.error("EXPERIENCE FETCH ERROR:", err);
        setError(
          err.message || "Failed to load experiences"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  const calculateDuration = (start, end, isCurrent) => {
    if (!start) return "";

    const startDate = new Date(start);
    const endDate = isCurrent || !end ? new Date() : new Date(end);

    let months =
      (endDate.getFullYear() - startDate.getFullYear()) * 12 +
      (endDate.getMonth() - startDate.getMonth());

    if (months < 1) months = 1;

    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    if (years > 0 && remainingMonths > 0) {
      return `${years} yr ${remainingMonths} mo`;
    }

    if (years > 0) {
      return `${years} yr`;
    }

    return `${remainingMonths} mo`;
  };

  if (loading) {
    return (
      <section
        id="experience"
        className="relative overflow-hidden px-5 py-24 md:px-8 md:py-32"
      >
        <div className="mx-auto max-w-6xl animate-pulse">
          <div className="h-4 w-28 rounded bg-white/10" />

          <div className="mt-5 h-12 w-96 max-w-full rounded bg-white/10" />

          <div className="mt-5 h-5 w-[500px] max-w-full rounded bg-white/10" />

          <div className="mt-12 space-y-6">
            <div className="h-64 rounded-3xl bg-white/[0.035]" />
            <div className="h-64 rounded-3xl bg-white/[0.035]" />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="experience"
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

  const activeExperiences = experiences
    .filter((experience) => experience.is_active)
    .sort(
      (a, b) =>
        Number(a.display_order || 0) -
        Number(b.display_order || 0)
    );

  return (
    <section
      id="experience"
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
              Experience
            </p>
          </div>

          <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            My professional{" "}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              journey.
            </span>
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-400 md:text-lg">
            My experience, responsibilities and technologies
            I've worked with throughout my development journey.
          </p>
        </div>

        {/* ================= EXPERIENCE LIST ================= */}
        {activeExperiences.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.035] p-8 text-center text-slate-400">
            No experience available.
          </div>
        ) : (
          <div className="relative mt-12">

            {/* Timeline */}
            <div className="absolute left-[19px] top-0 hidden h-full w-px bg-gradient-to-b from-violet-500/50 via-white/10 to-transparent md:block" />

            <div className="space-y-8">
              {activeExperiences.map((experience) => (
                <div
                  key={experience.id}
                  className="relative md:pl-16"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-2.5 top-8 hidden h-4 w-4 rounded-full border-4 border-slate-950 bg-violet-500 shadow-lg shadow-violet-500/30 md:block" />

                  {/* Card */}
                  <div className="group rounded-3xl border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/25 hover:bg-white/[0.055] md:p-8">

                    {/* Top Section */}
                    <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">

                      <div className="flex gap-4">

                        {/* Icon */}
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-violet-400/10 bg-violet-500/10">
                          <Briefcase
                            size={21}
                            className="text-violet-400"
                          />
                        </div>

                        <div>
                          <h3 className="text-xl font-semibold text-white md:text-2xl">
                            {experience.job_title}
                          </h3>

                          <p className="mt-1 text-base font-medium text-violet-400">
                            {experience.company_name}
                          </p>
                        </div>
                      </div>

                      {/* Employment Type */}
                      <span className="w-fit rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1.5 text-xs font-medium text-violet-300">
                        {experience.employment_type}
                      </span>
                    </div>

                    {/* Meta */}
                    <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-400">

                      {/* Location */}
                      {experience.location && (
                        <div className="flex items-center gap-2">
                          <MapPin
                            size={15}
                            className="text-violet-400"
                          />

                          <span>
                            {experience.location}
                          </span>
                        </div>
                      )}

                      {/* Date */}
                      <div className="flex items-center gap-2">
                        <CalendarDays
                          size={15}
                          className="text-violet-400"
                        />

                        <span>
                          {formatDate(experience.start_date)}
                          {" — "}
                          {experience.is_current
                            ? "Present"
                            : formatDate(experience.end_date)}
                        </span>
                      </div>

                      {/* Duration */}
                      <span className="text-slate-500">
                        (
                        {calculateDuration(
                          experience.start_date,
                          experience.end_date,
                          experience.is_current
                        )}
                        )
                      </span>
                    </div>

                    {/* Divider */}
                    <div className="my-6 h-px bg-white/10" />

                    {/* Description */}
                    {experience.description && (
                      <p className="text-sm leading-7 text-slate-400 md:text-base">
                        {experience.description}
                      </p>
                    )}

                    {/* Responsibilities */}
                    {experience.responsibility && (
                      <div className="mt-6">
                        <div className="mb-3 flex items-center gap-2">
                          <Code2
                            size={16}
                            className="text-violet-400"
                          />

                          <h4 className="text-sm font-semibold text-white">
                            Responsibilities
                          </h4>
                        </div>

                        {Array.isArray(
                          experience.responsibility
                        ) ? (
                          <ul className="space-y-2">
                            {experience.responsibility.map(
                              (item, index) => (
                                <li
                                  key={index}
                                  className="flex gap-3 text-sm leading-6 text-slate-400"
                                >
                                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />

                                  <span>{item}</span>
                                </li>
                              )
                            )}
                          </ul>
                        ) : (
                          <p className="whitespace-pre-line text-sm leading-7 text-slate-400">
                            {experience.responsibility}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Technologies */}
                    {experience.technologies &&
                      experience.technologies.length > 0 && (
                        <div className="mt-6">
                          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                            Technologies
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {experience.technologies.map(
                              (technology, index) => (
                                <span
                                  key={index}
                                  className="rounded-lg border border-white/10 bg-black/10 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-violet-400/20 hover:text-violet-300"
                                >
                                  {technology}
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;