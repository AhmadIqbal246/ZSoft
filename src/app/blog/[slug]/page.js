"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageBreadcrumbs from "@/components/seo/PageBreadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { getPostBySlug } from "@/data/blog";
import { articleSchema } from "@/lib/seo/schemas";

export default function BlogPostPage() {
    const { slug } = useParams();
    const post = getPostBySlug(slug);
    if (!post) {
        return (
            <main className="min-h-screen bg-canvas flex flex-col items-center justify-center p-6 text-center">
                <h1 className="text-3xl font-serif font-bold text-white mb-4">Article Not Found</h1>
                <Link href="/blog" className="text-accent cursor-pointer">Back to Blog</Link>
            </main>
        );
    }
    return (
        <main className="bg-transparent scroll-smooth min-h-screen">
            <JsonLd data={articleSchema(post)} />
            <section className="relative overflow-hidden">
                <Navbar />
                <article className="container mx-auto px-6 lg:px-12 pt-8 pb-20 max-w-3xl">
                    <PageBreadcrumbs items={[
                        { name: "Blog", path: "/blog" },
                        { name: post.title, path: `/blog/${post.slug}` },
                    ]} />
                    <time dateTime={post.date} className="text-xs font-mono text-muted uppercase tracking-widest">
                        {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                    </time>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mt-4 mb-8 leading-tight">
                        {post.title}
                    </h1>
                    <div className="prose prose-invert prose-lg max-w-none text-foreground/90">
                        <ReactMarkdown
                            components={{
                                a: ({ href, children }) => (
                                    <Link href={href || "#"} className="text-accent hover:underline cursor-pointer">{children}</Link>
                                ),
                                h2: ({ children }) => <h2 className="text-2xl font-serif font-bold text-foreground mt-10 mb-4">{children}</h2>,
                                p: ({ children }) => <p className="text-muted leading-relaxed mb-4">{children}</p>,
                            }}
                        >
                            {post.content}
                        </ReactMarkdown>
                    </div>
                </article>
                <Footer />
            </section>
        </main>
    );
}
