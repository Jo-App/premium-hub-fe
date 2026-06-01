import FloatingCTAClient from "./FloatingCTAClient";
import { getContactConfig } from "@/app/lib/api";

export default async function FloatingCTA() {
  const config = await getContactConfig();
  return <FloatingCTAClient phone={config.main_phone} />;
}
