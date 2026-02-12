import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { blogPosts } from "./blogPosts";

const NewsBlogSingle = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const post = blogPosts.find((item) => item.id === Number(id));

    if (!post) {
        return (
            <div className="p-10 text-center">
                <h2 className="text-2xl font-bold">Blog not found</h2>
                <button
                    onClick={() => navigate(-1)}
                    className="text-[var(--color-accent)] font-medium"
                >
                    ← Back
                </button>
            </div>
        );
    }

    return (
        <main className="bg-slate-100 min-h-screen py-10">
            <article className="max-w-4xl mx-auto bg-white rounded-2xl p-6 sm:p-10">

                {/* ================= BLOG HEADER ================= */}
                <header className="mb-8">
                    {post.category && (
                        <span className="text-green-600 font-semibold text-sm">
                            {post.category}
                        </span>
                    )}

                    {post.heading && (
                        <h1 className="text-3xl sm:text-4xl font-bold mt-2 text-gray-900 leading-tight">
                            {post.heading}
                        </h1>
                    )}

                    {post.date && (
                        <div className="text-sm text-gray-500 mt-4">{post.date}</div>
                    )}
                </header>

                {/* ================= FEATURE IMAGE ================= */}
                {post.image && (
                    <div className="mb-10 flex justify-center">
                        <img
                            src={post.image}
                            alt={post.heading}
                            className="w-96 rounded-xl object-cover shadow-md"
                        />
                    </div>
                )}

                {/* ================= INTRO ================= */}
                <section className="prose prose-lg max-w-none prose-green">
                    {post.Hparagraph1 && <p>{post.Hparagraph1}</p>}
                    {post.Hparagraph2 && <p>{post.Hparagraph2}</p>}
                </section>

                {/* ================= SECTION 1 ================= */}
                {post.title1 && (
                    <section className="mt-10 prose prose-lg max-w-none">
                        <h2>{post.title1}</h2>
                        {post.Tparagraph1 && <p>{post.Tparagraph1}</p>}
                        {post.Tparagraph2 && <p>{post.Tparagraph2}</p>}
                    </section>
                )}

                {/* ================= SECTION 2 ================= */}
                {post.title2 && (
                    <section className="mt-10 prose prose-lg max-w-none">
                        <h2>{post.title2}</h2>

                        {[21, 22, 23, 24, 25].map((num) => {
                            const title = post[`subtitle${num}`];
                            const para = post[`paragraph${num}`];

                            return (
                                title && (
                                    <div key={num} className="mt-4">
                                        <h3 className="font-semibold text-gray-900">
                                            {title}
                                        </h3>
                                        {para && <p>- {para}</p>}
                                    </div>
                                )
                            );
                        })}
                    </section>
                )}

                {/* ================= BULLET / LISTING SECTION ================= */}
                {post.title3 && (
                    <section className="mt-10">
                        <h2 className="text-2xl font-bold mb-3">{post.title3}</h2>
                        {post.titleparagraph3 && (
                            <p className="text-gray-600 mb-4">{post.titleparagraph3}</p>
                        )}

                        <ul className="space-y-3">
                            {[31, 32, 33, 34, 35].map((num) => {
                                const title = post[`bullettitle${num}`];
                                const para = post[`bulletparagraph${num}`];

                                return (
                                    title && (
                                        <li
                                            key={num}
                                            className="flex items-start gap-3 bg-green-50 p-4 rounded-xl"
                                        >
                                            <span className="mt-1 w-3 h-3 bg-green-600 rounded-full" />
                                            <p>
                                                <strong className="text-gray-900">{title}:</strong>{" "}
                                                <span className="text-gray-700">{para}</span>
                                            </p>
                                        </li>
                                    )
                                );
                            })}
                        </ul>
                    </section>
                )}

                {/* ================= SUMMARY (RED TITLE) ================= */}
                {post.summarytitle && (
                    <section className="mt-12 border-t pt-8">
                        <h2 className="text-2xl font-bold text-red-600 mb-3">
                            {post.summarytitle}
                        </h2>

                        {post.summaryparagraph1 && (
                            <p className="text-gray-700 mb-3">
                                {post.summaryparagraph1}
                            </p>
                        )}

                        {post.summaryparagraph2 && (
                            <p className="text-gray-700">
                                {post.summaryparagraph2}
                            </p>
                        )}
                    </section>
                )}

                {/* ================= BACK BUTTON ================= */}
                <div className="mt-10">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-[var(--color-accent)] font-medium"
                    >
                        ← Back
                    </button>
                </div>

            </article>
        </main>
    );
};

export default NewsBlogSingle;
