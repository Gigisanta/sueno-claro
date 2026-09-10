import { SitePage } from "../../../components/SitePage";
import { pageMetadata } from "../../../lib/metadata";
export const metadata = pageMetadata("/contact");
export default function Page() {
  return <SitePage path="/contact" />;
}
