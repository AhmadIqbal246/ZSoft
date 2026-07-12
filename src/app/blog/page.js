import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageBreadcrumbs from "@/components/seo/PageBreadcrumbs";
import { getAllPosts } from "@/data/blog";

export default function BlogPage() {
    const posts = getAllPosts();
    return (
        <main className="bg-transparent scroll-smooth min-h-screen">
            <section className="relative overflow-hidden">
                <Navbar />
                <div className="container mx-auto px-6 lg:px-12 pt-8 pb-20">
                    <PageBreadcrumbs items={[{ name: "Blog", path: "/blog" }]} />
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-6">
                            Protonixs Engineering Blog
                        </h1>
                        <p className="text-muted text-lg">
                            Technical insights on RAG chatbots, Django + Next.js SaaS, AI automation, and enterprise security from our delivery team.
                        </p>
                    </div>
                    <div className="max-w-3xl mx-auto flex flex-col gap-8">
                        {posts.map((post) => (
                            <article key={post.slug} className="p-8 rounded-2xl bg-surface border border-white/5 hover:border-accent/20 transition-all">
                                <time dateTime={post.date} className="text-xs font-mono text-muted uppercase tracking-widest">
                                    {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                                </time>
                                <h2 className="text-2xl font-serif font-bold text-foreground mt-3 mb-3">
                                    <Link href={`/blog/${post.slug}`} className="hover:text-accent transition-colors cursor-pointer">
                                        {post.title}
                                    </Link>
                                </h2>
                                <p className="text-muted text-sm leading-relaxed mb-4">{post.description}</p>
                                <Link href={`/blog/${post.slug}`} className="text-accent text-sm font-bold uppercase tracking-widest hover:underline cursor-pointer">
                                    Read article →
                                </Link>
                            </article>
                        ))}
                    </div>
                </div>
                <Footer />
            </section>
        </main>
    );
}
