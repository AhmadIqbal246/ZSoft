import { siteConfig } from "./site-config";

export function buildMetadata({ title, description, path = "", keywords = [], noIndex = false }) {
    const url = `${siteConfig.url}${path}`;
    const image = `${siteConfig.url}${siteConfig.defaultOgImage}`;
    return {
        title,
        description,
        keywords: [...siteConfig.keywords, ...keywords],
        alternates: {
            canonical: url,
        },
        openGraph: {
            title,
            description,
            url,
            siteName: siteConfig.name,
            locale: siteConfig.locale,
            type: "website",
            images: [{ url: image, width: 1200, height: 630, alt: `${siteConfig.name} — AI & Web Development` }],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image],
        },
        robots: noIndex
            ? { index: false, follow: false }
            : { index: true, follow: true, googleBot: { index: true, follow: true } },
    };
}

export const pageMetadata = {
    home: buildMetadata({
        title: "Protonixs | AI & Web Development Agency, Lahore",
        description: "AI chatbots, RAG systems & custom web development. Protonixs builds production-grade software for growing businesses. Get a free quote.",
        path: "/",
    }),
    about: buildMetadata({
        title: "About Protonixs | Software & AI Development Team",
        description: "Learn about Protonixs — a Lahore-based team building AI-powered software, chatbots, and custom web applications for clients worldwide.",
        path: "/about",
    }),
    services: buildMetadata({
        title: "AI Chatbots, RAG & Web Development Services | Protonixs",
        description: "Explore Protonixs services: AI chatbots, RAG systems, Python/JavaScript web development, and enterprise-grade security solutions.",
        path: "/services",
    }),
    team: buildMetadata({
        title: "Our Team | Protonixs Software Engineers",
        description: "Meet the engineers behind Protonixs — specialists in AI, full-stack development, and secure enterprise software.",
        path: "/team",
    }),
    contact: buildMetadata({
        title: "Contact Protonixs | Get a Free Quote",
        description: "Get in touch with Protonixs for your next AI or web development project. Based in DHA Phase 8, Lahore.",
        path: "/contact",
    }),
    faq: buildMetadata({
        title: "FAQ | Protonixs AI & Web Development",
        description: "Answers about Protonixs services, pricing, tech stack, security, timelines, and support for AI and web development projects.",
        path: "/faq",
    }),
    projects: buildMetadata({
        title: "Case Studies & Recent Projects | Protonixs",
        description: "Explore Protonixs case studies: Rep Cloud FSM, Safe-Bill fintech, and Arabic AI Law — production software built with Django, Next.js, and RAG.",
        path: "/projects",
    }),
    blog: buildMetadata({
        title: "Blog | Protonixs Engineering Insights",
        description: "Technical articles on RAG chatbots, Django + Next.js SaaS architecture, AI automation, and enterprise security from the Protonixs team.",
        path: "/blog",
    }),
    notFound: buildMetadata({
        title: "Page Not Found | Protonixs",
        description: "The page you are looking for could not be found. Return to Protonixs for AI and web development services.",
        path: "/404",
        noIndex: true,
    }),
};

export function buildProjectMetadata(project) {
    const stack = project.tags.slice(0, 4).join(", ");
    return buildMetadata({
        title: `${project.title} Case Study | Protonixs`,
        description: `How Protonixs built ${project.title} using ${stack} — the problem, solution, and results.`,
        path: `/projects/${project.slug}`,
        keywords: project.tags.map((t) => `${t} development`),
    });
}

export function buildBlogPostMetadata(post) {
    return buildMetadata({
        title: `${post.title} | Protonixs Blog`,
        description: post.description,
        path: `/blog/${post.slug}`,
        keywords: post.keywords || [],
    });
}
