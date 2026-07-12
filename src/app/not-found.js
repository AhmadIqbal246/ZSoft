import { pageMetadata } from "@/lib/seo/metadata";
import NotFoundView from "@/components/pages/NotFoundView";

export const metadata = pageMetadata.notFound;

export default function NotFound() {
    return <NotFoundView />;
}
