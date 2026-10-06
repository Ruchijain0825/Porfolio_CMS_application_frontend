import { useEffect, useState } from "react";
import {
  MapPin,
  Mail,
  Briefcase,
  Code2,
  Download,

  
} from "lucide-react";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const About = () => {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

useEffect(() => {
  const fetchAbout = async () => {
    try {
      setLoading(true);
      setError("");

      const url = `${API_URL}/admin/about`;

      console.log("API URL:", url);

      const response = await fetch(url);

      console.log("STATUS:", response.status);

      const text = await response.text();

      console.log("RAW RESPONSE:", text);

      let result = {};

      try {
        result = text ? JSON.parse(text) : {};
      } catch {
        throw new Error("Backend returned invalid JSON");
      }

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch about");
      }
       console.log("FULL ABOUT RESPONSE:", result);
console.log("PROFILE IMAGE FROM API:", result.about?.profile_image);
      setAbout(result.about);
    } catch (err) {
      console.error("ABOUT FETCH ERROR:", err);
      setError(err.message || "Failed to load about");
    } finally {
      setLoading(false);
    }
  };

  fetchAbout();
}, []);

  if (loading) {
    return (
      <section
        id="about"
        className="relative overflow-hidden px-5 py-24 md:px-8 md:py-32"
      >
        <div className="mx-auto max-w-6xl">
          <div className="animate-pulse">
            <div className="h-4 w-24 rounded bg-white/10" />
            <div className="mt-5 h-12 w-96 max-w-full rounded bg-white/10" />

            <div className="mt-14 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
              <div className="h-[500px] rounded-[2rem] bg-white/[0.035]" />
              <div className="h-[500px] rounded-[2rem] bg-white/[0.035]" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="about"
        className="px-5 py-24 md:px-8 md:py-32"
      >
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl border border-red-400/20 bg-red-500/5 p-6 text-sm text-red-300">
            {error}
          </div>
        </div>
      </section>
    );
  }

  if (!about) {
    return (
      <section
        id="about"
        className="px-5 py-24 md:px-8 md:py-32"
      >
        <div className="mx-auto max-w-6xl text-center text-slate-400">
          About information is not available.
        </div>
      </section>
    );
  }

  return (
    <section
      id="about"
      className="relative overflow-hidden px-5 py-24 md:px-8 md:py-32"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-0 top-1/3 h-80 w-80 rounded-full bg-violet-600/10 blur-[140px]" />

      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-indigo-600/10 blur-[150px]" />

      <div className="relative mx-auto max-w-6xl">
        {/* ================= HEADING ================= */}
        <div className="mb-14">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-violet-400">
            About Me
          </p>

          <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            A little bit{" "}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              about me.
            </span>
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400 md:text-lg">
            {about.shortbio ||
              about.shortBio ||
              "I'm a passionate developer focused on building clean, scalable and meaningful digital experiences."}
          </p>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          {/* ================= LEFT CARD ================= */}
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-7 shadow-2xl shadow-black/20 backdrop-blur-2xl md:p-8">
         {/* Profile */}
                                   <div className="flex items-center gap-5">
  <div className="h-32 w-32 shrink-0 overflow-hidden rounded-full border-2 border-violet-400/30 bg-violet-500/10 shadow-xl shadow-violet-500/10">
    {about?.profile_image ? (
      <img
        src={about.profile_image}
        alt={about.name || "Profile"}
        className="h-full w-full object-cover"
        onLoad={() => console.log("PROFILE IMAGE LOADED")}
        onError={(e) => {
          console.error("IMAGE FAILED:", e.currentTarget.src);
        }}
      />
    ) : (
      <div className="flex h-full w-full items-center justify-center text-slate-500">
        No Image
      </div>
    )}
  </div>

  <div>
    <h3 className="text-2xl font-semibold text-white">
      {about.name}
    </h3>

    <p className="mt-1 text-sm font-medium text-violet-400">
      {about.title}
    </p>
  </div>
</div>
            {/* Intro */}
            <p className="mt-7 text-sm leading-7 text-slate-400">
              {about.content}
            </p>

            {/* Information */}
            <div className="mt-7 space-y-3">
              {/* Location */}
              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/10 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10">
                  <MapPin
                    size={18}
                    className="text-violet-400"
                  />
                </div>

                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-slate-500">
                    Location
                  </p>

                  <p className="mt-1 text-sm text-slate-300">
                    {about.location}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/10 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10">
                  <Mail
                    size={18}
                    className="text-violet-400"
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-slate-500">
                    Email
                  </p>

                  <p className="mt-1 truncate text-sm text-slate-300">
                    {about.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="mt-7 flex gap-3">
              {about.github_url && (
                <a
                  href={about.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-400 transition hover:border-violet-400/30 hover:bg-violet-500/10 hover:text-violet-300"
                >
                  <Code2 size={18} />
                </a>
              )}

              {about.linked_url && (
                <a
                  href={about.linked_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-400 transition hover:border-violet-400/30 hover:bg-violet-500/10 hover:text-violet-300"
                >
                  <Code2 size={18} />
                </a>
              )}

              {about.website && (
                <a
                  href={about.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-400 transition hover:border-violet-400/30 hover:bg-violet-500/10 hover:text-violet-300"
                >
                  <Code2 size={18} />
                </a>
              )}
            </div>
          </div>

          {/* ================= RIGHT CARD ================= */}
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-7 shadow-2xl shadow-black/20 backdrop-blur-2xl md:p-8">
            {/* Top Cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Specialization */}
              <div className="rounded-2xl border border-white/10 bg-black/10 p-5 transition hover:border-violet-400/20 hover:bg-white/[0.04]">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10">
                  <Code2
                    size={19}
                    className="text-violet-400"
                  />
                </div>

                <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-slate-500">
                  Specialization
                </p>

                <p className="mt-2 text-sm font-semibold text-white">
                  {about.title || "Full Stack Development"}
                </p>
              </div>

              {/* Experience */}
              <div className="rounded-2xl border border-white/10 bg-black/10 p-5 transition hover:border-violet-400/20 hover:bg-white/[0.04]">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10">
                  <Briefcase
                    size={19}
                    className="text-violet-400"
                  />
                </div>

                <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-slate-500">
                  Experience
                </p>

                <p className="mt-2 text-sm font-semibold text-white">
                  Web Development
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="my-8 h-px bg-white/10" />

            {/* Who I Am */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-400">
                Who I Am
              </p>

              <h3 className="mt-3 text-2xl font-semibold leading-tight text-white md:text-3xl">
                Building things that are useful.
              </h3>

              <p className="mt-5 max-w-2xl whitespace-pre-line text-sm leading-7 text-slate-400">
                {about.content}
              </p>

              {/* Buttons */}
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#projects"
                  className="rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition hover:bg-violet-500"
                >
                  View My Work
                </a>

                {about.website && (
                  <a
                    href={about.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-slate-300 transition hover:border-white/20 hover:bg-white/[0.08]"
                  >
                    <Download size={16} />
                    Visit Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;