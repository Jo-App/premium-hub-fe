import FloorPlanClient from "./FloorPlanClient";
import { getFloorPlans } from "@/app/lib/api";

export default async function FloorPlanSection() {
  const plans = await getFloorPlans().catch(() => []);
  return <FloorPlanClient plans={plans} />;
}
