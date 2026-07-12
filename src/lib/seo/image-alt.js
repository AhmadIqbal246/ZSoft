const altMap = {
    "rep-cloud": {
        default: "Rep Cloud field service management SaaS dashboard built with Django and Next.js",
        screens: [
            "Rep Cloud FSM platform main dashboard with job scheduling overview",
            "Rep Cloud invoicing and finance module interface",
            "Rep Cloud customer CRM and service ticket management screen",
            "Rep Cloud technician scheduling calendar view",
            "Rep Cloud quote-to-cash workflow PDF generation",
            "Rep Cloud admin analytics and reporting charts",
            "Rep Cloud multi-tenant settings and role management",
            "Rep Cloud mobile-responsive service dispatch board",
            "Rep Cloud QuickBooks integration settings panel",
        ],
    },
    "safe-bill": {
        default: "Safe-Bill fintech escrow platform dashboard built with React and Django",
        screens: [
            "Safe-Bill milestone payment escrow dashboard overview",
            "Safe-Bill Stripe Connect payout and transaction history",
            "Safe-Bill project milestone approval workflow interface",
            "Safe-Bill RAG AI assistant chat support panel",
            "Safe-Bill buyer and seller dual dashboard view",
            "Safe-Bill dispute resolution ticket management screen",
            "Safe-Bill invoice PDF generation and receipt download",
            "Safe-Bill project invitation and onboarding flow",
        ],
    },
    "arabic-ai-law": {
        default: "Arabic AI Law legal RAG platform built with FastAPI, Pinecone, and React",
        screens: [
            "Arabic AI Law legal search interface with RAG query results",
            "Arabic AI Law Pinecone vector and BM25 hybrid search results",
            "Arabic AI Law voice-to-text Whisper legal query input",
            "Arabic AI Law subscription tier and Stripe billing page",
            "Arabic AI Law legal case workspace and document organization",
        ],
    },
};

export function getProjectImageAlt(slug, index = -1) {
    const entry = altMap[slug];
    if (!entry) return "Protonixs software project screenshot";
    if (index < 0) return entry.default;
    return entry.screens[index] || `${entry.default} — screen ${index + 1}`;
}
