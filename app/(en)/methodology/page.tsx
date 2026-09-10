import { SitePage } from "../../../components/SitePage";
import { pageMetadata } from "../../../lib/metadata";
export const metadata = pageMetadata("/methodology");
export default function Page() {
  return <SitePage path="/methodology" />;
}
