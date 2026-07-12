import { siteConfig, servicesSchema } from "./site-config";

export function organizationSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: siteConfig.name,
        legalName: siteConfig.legalName,
        url: siteConfig.url,
        email: siteConfig.email,
        telephone: siteConfig.phone,
        founder: { "@type": "Person", name: siteConfig.owner },
        sameAs: siteConfig.sameAs,
        logo: `${siteConfig.url}/og-default.png`,
    };
}

export function localBusinessSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: siteConfig.name,
        url: siteConfig.url,
        email: siteConfig.email,
        telephone: siteConfig.phone,
        image: `${siteConfig.url}/og-default.png`,
        priceRange: "$$",
        address: {
            "@type": "PostalAddress",
            streetAddress: siteConfig.address.streetAddress,
            addressLocality: siteConfig.address.addressLocality,
            addressRegion: siteConfig.address.addressRegion,
            postalCode: siteConfig.address.postalCode,
            addressCountry: siteConfig.address.addressCountry,
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: siteConfig.geo.latitude,
            longitude: siteConfig.geo.longitude,
        },
        areaServed: ["PK", "US", "GB", "SA", "AE"],
        sameAs: siteConfig.sameAs,
    };
}

export function serviceSchemas() {
    return servicesSchema.map((service) => ({
        "@context": "https://schema.org",
        "@type": "Service",
        name: service.name,
        description: service.description,
        provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
        url: `${siteConfig.url}${service.url}`,
        areaServed: "Worldwide",
    }));
}

export function faqPageSchema(faqs) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
    };
}

export function breadcrumbSchema(items) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: `${siteConfig.url}${item.path}`,
        })),
    };
}

export function articleSchema(post) {
    return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.updated || post.date,
        author: { "@type": "Person", name: siteConfig.owner },
        publisher: {
            "@type": "Organization",
            name: siteConfig.name,
            logo: { "@type": "ImageObject", url: `${siteConfig.url}/og-default.png` },
        },
        mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
    };
}

export function globalSchemas() {
    return [organizationSchema(), localBusinessSchema(), ...serviceSchemas()];
}
