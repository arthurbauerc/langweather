import type { Region, RiskLevel } from "@/types";

export interface RainRisk {
  visible: boolean;
  risk: RiskLevel;
  effective_mm: number;
  ratio: number;
}

export interface WindVulnerability {
  visible: boolean;
  effective_kmh: number;
  ratio: number;
}

// ponytail: linear ratio-to-tier mapping, tune the cutoffs if real thresholds arrive
export function rainRisk(region: Region, addedIntensity: number): RainRisk {
  const effective_mm = region.rainfall_mm + addedIntensity;
  const ratio = effective_mm / region.flood_threshold_mm;
  let risk: RiskLevel = "baixo";
  if (ratio >= 1.6) risk = "critico";
  else if (ratio >= 1.15) risk = "alto";
  else if (ratio >= 0.8) risk = "medio";
  return { visible: ratio >= 0.5, risk, effective_mm, ratio };
}

export function windVulnerability(
  region: Region,
  addedIntensity: number
): WindVulnerability {
  const effective_kmh = region.wind_kmh + addedIntensity;
  const ratio = effective_kmh / region.wind_threshold_kmh;
  return { visible: ratio >= 0.5, effective_kmh, ratio };
}

export interface DerivedRegion {
  region: Region;
  rain: RainRisk;
  wind: WindVulnerability;
}

export function severityColor(ratio: number): string {
  if (ratio >= 0.75) return "#E5484D";
  if (ratio >= 0.5) return "#F2884B";
  if (ratio >= 0.25) return "#F2C744";
  return "#3DDC84";
}
