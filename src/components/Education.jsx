import { useEffect, useState } from "react";
import {
    GraduationCap,
    CalendarDays,
    MapPin,
    ArrowUpRight,
} from "lucide-react";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const Education = () => {
    const [education, setEducation] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEducation = async () => {
            try {
                const response = await fetch(`${API_URL}/education`);

                if (!response.ok) {
                    throw new Error("Failed to fetch education");
                }

                const data = await response.json();

                setEducation(
                    Array.isArray(data) ? data : data.data || []
                );
            } catch (error) {
                console.error("Education fetch error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEducation();
    }, []);

    return (
        <section
            id="education"
            className="relative overflow-hidden px-5 py-24 md:px-8 md:py-32"
        >
            {/* Background glow */}
            <div className="pointer-events-none absolute left-[-10%] top-[20%] h-80 w-80 rounded-full bg-violet-600/10 blur-[140px]" />

            <div className="pointer-events-none absolute bottom-0 right-[-10%] h-96 w-96 rounded-full bg-indigo-600/10 blur-[150px]" />

            <div className="relative mx-auto max-w-6xl">

                {/* ================= HEADER ================= */}

                <div className="mb-16">

                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-violet-400">
                        Education
                    </p>

                    <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
                        My academic{" "}
                        <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                            journey.
                        </span>
                    </h2>

                    <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400 md:text-lg">
                        My educational background and the foundation behind
                        my technical journey.
                    </p>

                </div>

                {/* ================= LOADING ================= */}

                {loading && (
                    <div className="flex justify-center py-20">
                        <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-violet-500" />
                    </div>
                )}

                {/* ================= EMPTY ================= */}

                {!loading && education.length === 0 && (
                    <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-10 text-center backdrop-blur-2xl">

                        <GraduationCap
                            size={38}
                            className="mx-auto mb-4 text-violet-400"
                        />

                        <p className="text-slate-400">
                            No education details added yet.
                        </p>

                    </div>
                )}

                {/* ================= EDUCATION ================= */}

                {!loading && education.length > 0 && (
                    <div className="relative">

                        {/* Timeline */}
                        <div className="absolute left-[18px] top-0 hidden h-full w-px bg-gradient-to-b from-violet-500/50 via-white/10 to-transparent md:block" />

                        <div className="space-y-8">

                            {education.map((item, index) => (

                                <div
                                    key={item.id || index}
                                    className="relative md:pl-16"
                                >

                                    {/* Timeline dot */}
                                    <div className="absolute left-[10px] top-9 hidden h-[17px] w-[17px] rounded-full border-4 border-[#080812] bg-violet-500 shadow-lg shadow-violet-500/40 md:block" />

                                    {/* Card */}
                                    <div className="group rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/20 backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:border-violet-400/20 hover:bg-white/[0.05] md:p-8">

                                        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">

                                            {/* Degree */}
                                            <div className="flex gap-4">

                                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-violet-400/10 bg-violet-500/10">

                                                    <GraduationCap
                                                        size={25}
                                                        className="text-violet-400"
                                                    />

                                                </div>

                                                <div>

                                                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-violet-400">
                                                        Academic Background
                                                    </p>

                                                    <h3 className="mt-1 text-2xl font-semibold text-white">
                                                        {item.degree ||
                                                            item.course ||
                                                            item.title}
                                                    </h3>

                                                    {item.institution && (
                                                        <p className="mt-1 text-base font-medium text-slate-300">
                                                            {item.institution}
                                                        </p>
                                                    )}

                                                </div>

                                            </div>

                                            {/* Duration */}
                                            {(item.start_date ||
                                                item.end_date) && (

                                                <div className="flex items-center gap-2 text-sm text-slate-400">

                                                    <CalendarDays size={16} />

                                                    <span>
                                                        {item.start_date}
                                                        {" — "}
                                                        {item.end_date ||
                                                            "Present"}
                                                    </span>

                                                </div>
                                            )}

                                        </div>

                                        {/* Location */}
                                        {item.location && (

                                            <div className="mt-5 flex items-center gap-2 text-sm text-slate-500">

                                                <MapPin size={15} />

                                                <span>
                                                    {item.location}
                                                </span>

                                            </div>
                                        )}

                                        {/* Description */}
                                        {item.description && (

                                            <div className="mt-6 border-t border-white/[0.07] pt-6">

                                                <p className="max-w-4xl whitespace-pre-line text-[15px] leading-7 text-slate-400">
                                                    {item.description}
                                                </p>

                                            </div>
                                        )}

                                        {/* Grade */}
                                        {item.grade && (

                                            <div className="mt-5 inline-flex items-center rounded-full border border-violet-400/10 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300">

                                                Grade: {item.grade}

                                            </div>
                                        )}

                                        {/* Bottom */}
                                        <div className="mt-6 flex items-center gap-2 text-sm text-slate-500 transition group-hover:text-violet-400">

                                            <span>
                                                Academic milestone
                                            </span>

                                            <ArrowUpRight
                                                size={15}
                                                className="transition group-hover:translate-x-1 group-hover:-translate-y-1"
                                            />

                                        </div>

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

export default Education;