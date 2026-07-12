export const caseStudyNarratives = {
    "rep-cloud": {
        problem: "AEC Construction needed a unified field service platform to replace fragmented spreadsheets, manual invoicing, and disconnected scheduling tools. Technicians lacked real-time job visibility and finance teams spent hours reconciling quotes with completed work.",
        solution: "Protonixs designed and built Rep Cloud as a multi-tenant FSM SaaS with Django REST API and Next.js frontend. We implemented automated quote-to-cash workflows, Celery-backed background jobs, QuickBooks sync, and role-based dashboards for dispatchers, technicians, and finance teams.",
        results: "Rep Cloud reduced operational overhead by consolidating scheduling, CRM, and invoicing into one platform. Automated PDF quotes, milestone invoicing, and real-time dispatch boards improved field team coordination and shortened billing cycles for the client.",
        stack: "Django 5.2, Next.js 16, PostgreSQL, Redis, Celery, Docker, AWS S3, Tailwind CSS",
    },
    "safe-bill": {
        problem: "A fintech startup needed a trusted escrow-style payment platform where clients and service providers could agree on milestones before funds were released. Disputes, manual support load, and lack of transparency were blocking growth.",
        solution: "Protonixs delivered Safe-Bill with Stripe Connect for split payouts, milestone approval gates, and a RAG-powered AI assistant using Gemini 2.0 and Pinecone. HubSpot integration automated dispute tickets while Redis and Celery handled high-volume notifications.",
        results: "Safe-Bill enabled transparent milestone payments with automated receipts, dual buyer/seller dashboards, and AI support that deflected repetitive queries. The platform launched production-ready with GDPR cookie controls and secure JWT authentication.",
        stack: "React, Django REST, Stripe Connect, Pinecone, Gemini 2.0, Redis, Celery, HubSpot",
    },
    "arabic-ai-law": {
        problem: "A Saudi legal tech client required an Arabic-first legal research platform combining precise statute retrieval with conversational AI. Generic search failed on Arabic legal terminology and multimodal input was needed for busy practitioners.",
        solution: "Protonixs built Arabic AI Law with a FastAPI RAG pipeline combining Pinecone vector search and BM25 keyword ranking, Whisper voice input, query enrichment agents, and tiered Stripe subscriptions. An RTL React frontend and case workspace organized research by matter.",
        results: "The platform delivered accurate Arabic legal retrieval, voice query support, and subscription monetization with admin-configurable models. Legal teams gained a dedicated workspace for case-based research with usage and cost monitoring built in.",
        stack: "FastAPI, Django, Pinecone, BM25, Whisper, React, Redux, Stripe, JWT",
    },
};
