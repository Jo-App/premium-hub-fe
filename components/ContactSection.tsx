import ContactClient from "./ContactClient";
import { getContactConfig } from "@/app/lib/api";

export default async function ContactSection() {
  const config = await getContactConfig();
  return <ContactClient phone={config.main_phone} />;
}
