import { services } from "@/data/services";
import { SiteHeaderClient } from "./SiteHeaderClient";
import { buildSolutionNavGroups } from "./site-navigation";

export function SiteHeader() {
  return <SiteHeaderClient solutionGroups={buildSolutionNavGroups(services)} />;
}
