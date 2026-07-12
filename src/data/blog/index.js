const posts = [
    {
        slug: "building-rag-chatbot-pinecone",
        title: "Building a RAG Chatbot with Pinecone: Lessons from Safe-Bill",
        description: "How Protonixs productionized a RAG support assistant with Gemini 2.0, Pinecone, Redis caching, and query enrichment for a fintech escrow platform.",
        date: "2026-06-15",
        updated: "2026-06-15",
        keywords: ["RAG chatbot", "Pinecone", "Gemini", "fintech AI"],
        content: `## Why RAG instead of fine-tuning

Safe-Bill needed support answers grounded in policy docs, milestone rules, and Stripe payout FAQs. Fine-tuning would stale quickly; RAG let us update embeddings when product copy changed.

## Architecture

We chunked documentation, embedded with Gemini, and stored vectors in Pinecone. User queries pass through a query-enrichment step that generates multiple search variants before hybrid retrieval. Redis caches conversation history for multi-turn context without re-hitting the LLM for every token.

## Production lessons

**Evaluation before launch:** We built a small golden set of support questions and measured retrieval precision before enabling the bot for all users.

**Latency budgets:** Parallel embedding + retrieval kept p95 under three seconds on warm cache.

**Guardrails:** System prompts restrict answers to retrieved context; fallback routes escalate to human support when confidence is low.

## Stack

React frontend, Django API, Pinecone, Gemini 2.0 Flash, Redis, Celery for async embedding jobs.

[View the Safe-Bill case study](/projects/safe-bill) or [contact Protonixs](/contact) for a similar build.`,
    },
    {
        slug: "django-nextjs-saas-architecture",
        title: "Django + Next.js Architecture for Production SaaS",
        description: "Protonixs breaks down the multi-tenant SaaS architecture used on Rep Cloud: Django REST, Next.js 16, Celery, PostgreSQL, and Docker deployment patterns.",
        date: "2026-05-20",
        updated: "2026-05-20",
        keywords: ["Django", "Next.js", "SaaS", "multi-tenant"],
        content: `## Separation of concerns

Rep Cloud splits Django REST Framework for business logic and Next.js for UX. TanStack Query on the frontend keeps server state predictable; JWT auth flows through httpOnly cookies on production.

## Multi-tenancy

Tenant isolation lives at the database row level with middleware-enforced tenant context on every queryset. Background Celery tasks inherit tenant ID from job metadata to prevent cross-tenant leaks.

## Async work

Invoicing PDFs, QuickBooks sync, and email notifications run in Celery workers. Beat schedules recurring jobs like report generation and subscription renewals.

## Deployment

Docker Compose for staging; production uses containerized API + worker pools with PostgreSQL and Redis as managed services. Media switches between local disk and S3 via environment config.

[Explore Rep Cloud](/projects/rep-cloud) · [Our services](/services)`,
    },
    {
        slug: "ai-automation-small-business",
        title: "AI Automation for Small Businesses: What's Actually Worth Building",
        description: "Practical AI automation priorities for SMBs — support bots, document search, and workflow triggers — from Protonixs delivery experience.",
        date: "2026-04-10",
        updated: "2026-04-10",
        keywords: ["AI automation", "small business", "chatbot ROI"],
        content: `## Start with repetitive support volume

If your team answers the same 20 questions weekly, a grounded RAG chatbot often pays back within one quarter. Avoid generic ChatGPT wrappers without your data.

## Document search beats generic chat

Legal, finance, and ops teams benefit from search-over-docs with citations. Arabic AI Law is an example: hybrid vector + BM25 retrieval beats a single embedding index for precise statute lookup.

## Automate handoffs, not decisions

Milestone approvals, ticket routing, and CRM sync are high-value automation targets. Fully autonomous financial decisions rarely belong in v1.

## How Protonixs scopes projects

We run a one-week discovery: map data sources, define success metrics, and ship a thin vertical slice before expanding scope.

[Read our FAQ](/faq) · [Get a quote](/contact)`,
    },
    {
        slug: "arabic-ai-law-production",
        title: "How We Built Arabic AI Law: RAG + BM25 + Whisper in Production",
        description: "Deep dive into Arabic legal RAG: hybrid retrieval, RTL UX, Whisper voice input, and subscription tiers for a Saudi legal tech platform.",
        date: "2026-03-28",
        updated: "2026-03-28",
        keywords: ["Arabic RAG", "BM25", "Whisper", "legal tech"],
        content: `## Hybrid retrieval for Arabic legal text

Pure vector search missed exact article references. We combined Pinecone similarity with BM25 keyword ranking and merge scores before passing context to GPT-4o.

## Voice and RTL

Whisper handles Arabic audio queries; the React frontend is fully RTL with accessible typography for long legal passages.

## Monetization

Stripe subscription tiers gate advanced models and case workspace limits. Admin dashboard toggles prompts and model selection without redeploys.

## Case workspaces

Users organize research per legal matter, isolating embeddings and chat history from other cases — critical for firm confidentiality.

[Case study](/projects/arabic-ai-law) · [AI services](/services)`,
    },
    {
        slug: "enterprise-security-ai-apps",
        title: "Enterprise Security Checklist for AI-Powered Applications",
        description: "JWT, RBAC, prompt injection mitigation, audit logs, and data retention patterns Protonixs applies to production AI and fintech builds.",
        date: "2026-02-18",
        updated: "2026-02-18",
        keywords: ["AI security", "enterprise", "JWT", "RBAC"],
        content: `## Authentication and authorization

Every Protonixs production app uses JWT or session auth with role-based access. AI endpoints inherit the same permission checks as REST routes — never expose LLM tools without user context.

## Prompt injection and data leakage

RAG contexts are filtered by tenant and user role before injection. System prompts forbid executing instructions found inside retrieved documents.

## Audit and compliance

Log prompt hashes, retrieval IDs, and model versions for dispute investigation. Fintech clients require immutable audit trails on payment state changes separate from AI logs.

## Infrastructure

Encrypt secrets via environment variables, rotate API keys quarterly, and run dependency scanning in CI. GDPR cookie consent and data export endpoints are standard on EU-facing products.

[Contact Protonixs](/contact) for a security review of your AI stack.`,
    },
];

export function getAllPosts() {
    return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getPostBySlug(slug) {
    return posts.find((p) => p.slug === slug) || null;
}

export function getAllPostSlugs() {
    return posts.map((p) => p.slug);
}
