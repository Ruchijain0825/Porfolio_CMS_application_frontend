import { useState } from "react";
import { Mail, Send, User, MessageSquare, FileText } from "lucide-react";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const Contact = () => {
    const [formData, setFormData] = useState({
        sender_name: "",
        sender_email: "",
        subject: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setSuccess("");
        setError("");

        try {
            const response = await fetch(
                `${API_URL}/recruiter-message`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(formData),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Failed to send message"
                );
            }

            setSuccess(
                "Your message has been sent successfully. I'll get back to you soon."
            );

            setFormData({
                sender_name: "",
                sender_email: "",
                subject: "",
                message: "",
            });
        } catch (err) {
            console.error("CONTACT ERROR:", err);
            setError(
                err.message || "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <section
            id="contact"
            className="relative overflow-hidden px-5 py-24 md:px-8 md:py-32"
        >
            {/* Background Glow */}
            <div className="pointer-events-none absolute left-0 top-1/3 h-80 w-80 rounded-full bg-violet-600/10 blur-[140px]" />

            <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-indigo-600/10 blur-[150px]" />

            <div className="relative mx-auto max-w-6xl">

                {/* Heading */}
                <div className="mb-14">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-violet-400">
                        Contact
                    </p>

                    <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
                        Let's{" "}
                        <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                            connect.
                        </span>
                    </h2>

                    <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400 md:text-lg">
                        Have an opportunity, project, or just want to say hello?
                        Send me a message and I'll get back to you.
                    </p>
                </div>

                {/* Contact Card */}
                <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">

                    {/* Left */}
                    <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-7 shadow-2xl shadow-black/20 backdrop-blur-2xl md:p-8">

                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10">
                            <Mail
                                size={25}
                                className="text-violet-400"
                            />
                        </div>

                        <h3 className="mt-6 text-2xl font-semibold text-white">
                            Have an opportunity?
                        </h3>

                        <p className="mt-4 text-sm leading-7 text-slate-400">
                            I'm always open to discussing new opportunities,
                            interesting projects, and collaborations.
                        </p>

                        <div className="mt-8 rounded-2xl border border-white/10 bg-black/10 p-5">
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                                Email
                            </p>

                            <a
                                href="mailto:heya.ru1920@gmail.com"
                                className="mt-2 block break-all text-sm font-medium text-violet-300 hover:text-violet-200"
                            >
                                heya.ru1920@gmail.com
                            </a>
                        </div>

                        <div className="mt-4 rounded-2xl border border-white/10 bg-black/10 p-5">
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                                Response
                            </p>

                            <p className="mt-2 text-sm text-slate-300">
                                I'll get back to you as soon as possible.
                            </p>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-7 shadow-2xl shadow-black/20 backdrop-blur-2xl md:p-8">

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >

                            {/* Name */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Your Name
                                </label>

                                <div className="relative">
                                    <User
                                        size={18}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                                    />

                                    <input
                                        type="text"
                                        name="sender_name"
                                        value={formData.sender_name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        required
                                        className="w-full rounded-xl border border-white/10 bg-black/20 py-3.5 pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-violet-400/50"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Email
                                </label>

                                <div className="relative">
                                    <Mail
                                        size={18}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                                    />

                                    <input
                                        type="email"
                                        name="sender_email"
                                        value={formData.sender_email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        required
                                        className="w-full rounded-xl border border-white/10 bg-black/20 py-3.5 pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-violet-400/50"
                                    />
                                </div>
                            </div>

                            {/* Subject */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Subject
                                </label>

                                <div className="relative">
                                    <FileText
                                        size={18}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                                    />

                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="Job Opportunity"
                                        required
                                        className="w-full rounded-xl border border-white/10 bg-black/20 py-3.5 pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-violet-400/50"
                                    />
                                </div>
                            </div>

                            {/* Message */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Message
                                </label>

                                <div className="relative">
                                    <MessageSquare
                                        size={18}
                                        className="absolute left-4 top-4 text-slate-500"
                                    />

                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell me about the opportunity..."
                                        required
                                        rows={6}
                                        className="w-full resize-none rounded-xl border border-white/10 bg-black/20 py-3.5 pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-violet-400/50"
                                    />
                                </div>
                            </div>

                            {/* Success */}
                            {success && (
                                <div className="rounded-xl border border-green-400/20 bg-green-500/10 p-4 text-sm text-green-300">
                                    {success}
                                </div>
                            )}

                            {/* Error */}
                            {error && (
                                <div className="rounded-xl border border-red-400/20 bg-red-500/10 p-4 text-sm text-red-300">
                                    {error}
                                </div>
                            )}

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <Send size={17} />

                                {loading
                                    ? "Sending..."
                                    : "Send Message"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;