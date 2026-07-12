import { siteConfig } from "@/lib/seo/site-config";
import { projects } from "@/data/content";
import { getAllPostSlugs } from "@/data/blog";

export default function sitemap() {
    const staticRoutes = ["", "/about", "/services", "/team", "/contact", "/faq", "/projects", "/blog"];
    const now = new Date();
    const staticEntries = staticRoutes.map((route) => ({
        url: `${siteConfig.url}${route}`,
        lastModified: now,
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1 : 0.8,
    }));
    const projectEntries = projects.map((p) => ({
        url: `${siteConfig.url}/projects/${p.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
    }));
    const blogEntries = getAllPostSlugs().map((slug) => ({
        url: `${siteConfig.url}/blog/${slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
    }));
    return [...staticEntries, ...projectEntries, ...blogEntries];
}
