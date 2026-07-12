import { getPostBySlug, getAllPostSlugs } from "@/data/blog";
import { buildBlogPostMetadata } from "@/lib/seo/metadata";

export async function generateStaticParams() {
    return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
    const post = getPostBySlug(params.slug);
    if (!post) {
        return { title: "Article Not Found | Protonixs", robots: { index: false, follow: false } };
    }
    return buildBlogPostMetadata(post);
}

export default function BlogPostLayout({ children }) {
    return children;
}
