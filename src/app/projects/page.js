"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Projects from "@/components/sections/Projects";
import PageBreadcrumbs from "@/components/seo/PageBreadcrumbs";

export default function ProjectsPage() {
    return (
        <main className="bg-transparent scroll-smooth min-h-screen">
            <section className="relative overflow-hidden">
                <Navbar />
                <div className="container mx-auto px-6 lg:px-12 pt-4">
                    <PageBreadcrumbs items={[{ name: "Projects", path: "/projects" }]} />
                </div>
                <Projects />
                <Footer />
            </section>
        </main>
    );
}
