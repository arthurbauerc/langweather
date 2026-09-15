"use client";

import { Polygon, Tooltip } from "react-leaflet";
import type { DerivedRegion } from "@/lib/risk";
import type { WeatherData } from "@/types";
import { RISK_COLORS, RISK_LABELS } from "@/types";

interface FloodingHeatmapProps {
  items: DerivedRegion[];
  onHoverRegion: (data: WeatherData | null) => void;
}

export default function FloodingHeatmap({
  items,
  onHoverRegion,
}: FloodingHeatmapProps) {
  return (
    <>
      {items.map(({ region, rain, wind }) => {
        const color = RISK_COLORS[rain.risk];
        return (
          <Polygon
            key={region.id}
            positions={region.polygon}
            pathOptions={{
              color,
              weight: 1.5,
              fillColor: color,
              fillOpacity: 0.35,
            }}
            eventHandlers={{
              mouseover: (e) => {
                e.target.setStyle({ fillOpacity: 0.6, weight: 2.5 });
                onHoverRegion({
                  lat: region.center[0],
                  lng: region.center[1],
                  rainfall_mm: Math.round(rain.effective_mm),
                  wind_kmh: Math.round(wind.effective_kmh),
                  risk_level: rain.risk,
                  name: region.name,
                });
              },
              mouseout: (e) => {
                e.target.setStyle({ fillOpacity: 0.35, weight: 1.5 });
                onHoverRegion(null);
              },
            }}
          >
            <Tooltip sticky className="font-mono text-xs">
              {region.name} · risco {RISK_LABELS[rain.risk]}
            </Tooltip>
          </Polygon>
        );
      })}
    </>
  );
}
