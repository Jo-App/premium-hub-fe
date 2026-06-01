import HeaderClient from "./HeaderClient";
import { getSiteMenus } from "@/app/lib/api";

export default async function Header() {
  const menus = await getSiteMenus().catch(() => []);
  return <HeaderClient menus={menus} />;
}
