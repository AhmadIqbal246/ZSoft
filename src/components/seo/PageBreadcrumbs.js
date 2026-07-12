import Link from "next/link";
import JsonLd from "./JsonLd";
import { breadcrumbSchema } from "@/lib/seo/schemas";

export default function PageBreadcrumbs({ items }) {
    const crumbs = [{ name: "Home", path: "/" }, ...items];
    return (
        <>
            <JsonLd data={breadcrumbSchema(crumbs)} />
            <nav aria-label="Breadcrumb" className="mb-8">
                <ol className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted">
                    {crumbs.map((crumb, i) => (
                        <li key={crumb.path} className="flex items-center gap-2">
                            {i > 0 && <span aria-hidden="true">/</span>}
                            {i === crumbs.length - 1 ? (
                                <span className="text-accent">{crumb.name}</span>
                            ) : (
                                <Link href={crumb.path} className="hover:text-accent transition-colors cursor-pointer">
                                    {crumb.name}
                                </Link>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>
        </>
    );
}
