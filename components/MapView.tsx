"use client";

import "leaflet/dist/leaflet.css";
import { useMemo } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import FloodingHeatmap from "@/components/FloodingHeatmap";
import WeatherOverlay from "@/components/WeatherOverlay";
import DrainageSuggestions from "@/components/DrainageSuggestions";
import { rainRisk, windVulnerability } from "@/lib/risk";
import type { FilterState, Region, WeatherData } from "@/types";

interface MapViewProps {
  regions: Region[];
  filters: FilterState;
  onHoverRegion: (data: WeatherData | null) => void;
}

const RARANGUA_CRICIUMA_CENTER: [number, number] = [-28.92, -49.62];

export default function MapView({
  regions,
  filters,
  onHoverRegion,
}: MapViewProps) {
  const derived = useMemo(
    () =>
      regions.map((region) => ({
        region,
        rain: rainRisk(region, filters.rain ? filters.rainIntensity : 0),
        wind: windVulnerability(region, filters.wind ? filters.windIntensity : 0),
      })),
    [regions, filters.rain, filters.rainIntensity, filters.wind, filters.windIntensity]
  );

  const floodedRegions = filters.rain
    ? derived.filter((d) => d.rain.visible)
    : [];

  return (
    <MapContainer
      center={RARANGUA_CRICIUMA_CENTER}
      zoom={10}
      className="h-full w-full"
      zoomControl
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FloodingHeatmap items={floodedRegions} onHoverRegion={onHoverRegion} />
      <WeatherOverlay
        items={derived}
        showRain={filters.rain}
        showWind={filters.wind}
      />
      {filters.drainage && <DrainageSuggestions regions={regions} />}
    </MapContainer>
  );
}
