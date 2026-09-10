import { SitePage } from "../../../components/SitePage";
import { pageMetadata } from "../../../lib/metadata";
export const metadata = pageMetadata("/acerca-de");
export default function Page() {
  return <SitePage path="/acerca-de" />;
}
