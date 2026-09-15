"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import FilterPanel from "@/components/FilterPanel";
import InfoCard from "@/components/InfoCard";
import ThemeToggle from "@/components/ThemeToggle";
import regionsData from "@/data/mock-regions.json";
import type { FilterState, Region, WeatherData } from "@/types";

const MapView = dynamic(() => import("@/components/MapView"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-ink font-mono text-sm text-fog">
      carregando mapa…
    </div>
  ),
});

const regions = regionsData as Region[];

function Logo() {
  return (
    <svg width="22" height="22" viewBox="0 0 32 32" className="shrink-0">
      <circle cx="16" cy="20" r="4" fill="none" stroke="#3AA0FF" strokeWidth="1.4" opacity="0.5" />
      <circle cx="16" cy="20" r="7.5" fill="none" stroke="#3AA0FF" strokeWidth="1.2" opacity="0.35" />
      <path
        d="M16 3C16 3 8 14.5 8 20.5C8 25.19 11.58 29 16 29C20.42 29 24 25.19 24 20.5C24 14.5 16 3 16 3Z"
        fill="#3AA0FF"
      />
    </svg>
  );
}

export default function Home() {
  const [filters, setFilters] = useState<FilterState>({
    rain: true,
    wind: true,
    drainage: false,
    rainIntensity: 0,
    windIntensity: 0,
  });
  const [hovered, setHovered] = useState<WeatherData | null>(null);

  return (
    <main className="flex h-screen w-screen flex-col overflow-hidden bg-ink">
      <header className="flex shrink-0 items-center justify-between border-b border-line px-6 py-3">
        <div className="flex items-center gap-3">
          <Logo />
          <div>
            <h1 className="font-mono text-sm font-semibold tracking-[0.2em] text-paper">
              LANGWEATHER
            </h1>
            <p className="text-xs text-fog">
              Risco de alagamento · zona rural de Araranguá e Criciúma (SC) · dados hipotéticos
            </p>
          </div>
        </div>
        <ThemeToggle />
      </header>

      <div className="flex min-h-0 flex-1">
        <aside className="w-[30%] min-w-[280px] max-w-[380px] shrink-0 overflow-y-auto border-r border-line bg-panel">
          <FilterPanel filters={filters} onChange={setFilters} />
        </aside>

        <section className="relative min-w-0 flex-1">
          <MapView regions={regions} filters={filters} onHoverRegion={setHovered} />
          <InfoCard data={hovered} />
        </section>
      </div>
    </main>
  );
}
