"use client";

import L from "leaflet";
import { Circle, Marker, Tooltip } from "react-leaflet";
import type { DerivedRegion } from "@/lib/risk";
import { RAIN_COLOR, WIND_COLOR } from "@/types";

interface WeatherOverlayProps {
  items: DerivedRegion[];
  showRain: boolean;
  showWind: boolean;
}

function rainIcon(effective_mm: number) {
  const drops = Math.min(5, Math.max(1, Math.round(effective_mm / 30)));
  const bars = Array.from({ length: drops })
    .map(
      (_, i) =>
        `<span class="rain-drop" style="left:${i * 6}px;animation-delay:${
          i * 0.15
        }s"></span>`
    )
    .join("");
  const width = drops * 6 + 4;
  return L.divIcon({
    className: "",
    html: `<div style="position:relative;width:${width}px;height:16px;pointer-events:none">
      <style>.rain-drop{position:absolute;top:0;width:2px;height:8px;background:${RAIN_COLOR};border-radius:2px}</style>
      ${bars}
    </div>`,
    iconSize: [width, 16],
    iconAnchor: [width / 2, 8],
  });
}

function windIcon(effective_kmh: number) {
  const lines = Math.min(4, Math.max(1, Math.round(effective_kmh / 15)));
  const bars = Array.from({ length: lines })
    .map(
      (_, i) =>
        `<span class="wind-line" style="top:${i * 5}px;animation-delay:${
          i * 0.2
        }s"></span>`
    )
    .join("");
  const height = lines * 5 + 4;
  return L.divIcon({
    className: "",
    html: `<div style="position:relative;width:22px;height:${height}px;pointer-events:none">
      <style>.wind-line{position:absolute;left:0;width:22px;height:2px;background:${WIND_COLOR};border-radius:2px}</style>
      ${bars}
    </div>`,
    iconSize: [22, height],
    iconAnchor: [11, height / 2],
  });
}

export default function WeatherOverlay({
  items,
  showRain,
  showWind,
}: WeatherOverlayProps) {
  return (
    <>
      {showWind &&
        items
          .filter((d) => d.wind.visible)
          .map(({ region, wind }) => (
            <Circle
              key={`wind-vuln-${region.id}`}
              center={region.center}
              radius={400 + wind.ratio * 900}
              pathOptions={{
                color: WIND_COLOR,
                weight: 1,
                fillColor: WIND_COLOR,
                fillOpacity: 0.12 + Math.min(wind.ratio, 1) * 0.15,
                dashArray: "4 5",
              }}
              interactive={false}
            />
          ))}

      {showRain &&
        items.map(({ region, rain }) => (
          <Marker
            key={`rain-${region.id}`}
            position={[region.center[0] - 0.012, region.center[1] - 0.016]}
            icon={rainIcon(rain.effective_mm)}
          >
            <Tooltip direction="top" offset={[0, -4]} className="font-mono text-xs">
              chuva simulada: {Math.round(rain.effective_mm)}mm
            </Tooltip>
          </Marker>
        ))}

      {showWind &&
        items.map(({ region, wind }) => (
          <Marker
            key={`wind-${region.id}`}
            position={[region.center[0] + 0.012, region.center[1] + 0.016]}
            icon={windIcon(wind.effective_kmh)}
          >
            <Tooltip direction="top" offset={[0, -4]} className="font-mono text-xs">
              vento simulado: {Math.round(wind.effective_kmh)}km/h
            </Tooltip>
          </Marker>
        ))}
    </>
  );
}
