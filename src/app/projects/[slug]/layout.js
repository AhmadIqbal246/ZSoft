import { projects } from "@/data/content";
import { buildProjectMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({ params }) {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) {
        return { title: "Project Not Found | Protonixs", robots: { index: false, follow: false } };
    }
    return buildProjectMetadata(project);
}

export default function ProjectSlugLayout({ children }) {
    return children;
}
