"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FAQ from "@/components/sections/FAQ";
import PageBreadcrumbs from "@/components/seo/PageBreadcrumbs";

export default function FAQPage() {
    return (
        <main className="bg-transparent scroll-smooth min-h-screen">
            <section className="relative overflow-hidden">
                <Navbar />
                <div className="container mx-auto px-6 lg:px-12 pt-4 pb-8">
                    <PageBreadcrumbs items={[{ name: "FAQ", path: "/faq" }]} />
                    <div className="max-w-4xl mx-auto text-center mb-4">
                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-4">
                            Frequently Asked Questions
                        </h1>
                        <p className="text-muted text-lg">
                            Everything you need to know about Protonixs AI chatbot development, web development services, and working with our Lahore-based team.
                        </p>
                    </div>
                </div>
                <FAQ hideHeader />
                <Footer />
            </section>
        </main>
    );
}
