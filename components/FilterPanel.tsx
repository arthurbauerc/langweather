"use client";

import { AnimatePresence, motion } from "framer-motion";
import Checkbox from "@/components/Checkbox";
import { severityColor } from "@/lib/risk";
import type { FilterState, RiskLevel } from "@/types";
import { DRAINAGE_COLOR, RAIN_COLOR, RISK_COLORS, RISK_LABELS, WIND_COLOR } from "@/types";

interface FilterPanelProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

const RISK_ORDER: RiskLevel[] = ["critico", "alto", "medio", "baixo"];

function Gauge({
  label,
  unit,
  value,
  max,
  onChange,
}: {
  label: string;
  unit: string;
  value: number;
  max: number;
  onChange: (v: number) => void;
}) {
  const ratio = value / max;
  const color = severityColor(ratio);

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      className="overflow-hidden"
    >
      <div className="mb-2 mt-3 flex items-center justify-between font-mono text-xs text-fog">
        <span>intensidade simulada · {label}</span>
        <motion.span
          key={value}
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.15 }}
          className="font-semibold"
          style={{ color }}
        >
          +{value}
          {unit}
        </motion.span>
      </div>
      <input
        type="range"
        min={0}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="gauge-slider"
        style={
          {
            "--fill": `${ratio * 100}%`,
            "--fill-color": color,
            "--glow": `${2 + ratio * 10}px`,
          } as React.CSSProperties
        }
      />
    </motion.div>
  );
}

export default function FilterPanel({ filters, onChange }: FilterPanelProps) {
  const set = (patch: Partial<FilterState>) =>
    onChange({ ...filters, ...patch });

  return (
    <div className="flex flex-col gap-5 p-5">
      <section className="rounded-xl border border-line bg-ink/40 p-4">
        <h2 className="mb-3 font-mono text-xs font-semibold tracking-[0.15em] text-fog">
          FILTROS
        </h2>

        <Checkbox
          checked={filters.rain}
          onChange={(v) => set({ rain: v })}
          label="Chuva"
          accentColor={RAIN_COLOR}
        />
        <AnimatePresence>
          {filters.rain && (
            <Gauge
              label="chuva"
              unit="mm"
              value={filters.rainIntensity}
              max={150}
              onChange={(v) => set({ rainIntensity: v })}
            />
          )}
        </AnimatePresence>

        <div className="pt-2" />

        <Checkbox
          checked={filters.wind}
          onChange={(v) => set({ wind: v })}
          label="Vento"
          accentColor={WIND_COLOR}
        />
        <AnimatePresence>
          {filters.wind && (
            <Gauge
              label="vento"
              unit="km/h"
              value={filters.windIntensity}
              max={60}
              onChange={(v) => set({ windIntensity: v })}
            />
          )}
        </AnimatePresence>

        <div className="pt-2" />

        <Checkbox
          checked={filters.drainage}
          onChange={(v) => set({ drainage: v })}
          label="Valetas (sugestões de drenagem)"
          accentColor={DRAINAGE_COLOR}
        />
      </section>

      <section className="rounded-xl border border-line bg-ink/40 p-4">
        <h2 className="mb-3 font-mono text-xs font-semibold tracking-[0.15em] text-fog">
          LEGENDA
        </h2>

        <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-fog">
          risco de alagamento
        </p>
        <ul className="mb-4 flex flex-col gap-2">
          {RISK_ORDER.map((level) => (
            <li key={level} className="flex items-center gap-2 text-sm text-paper">
              <span
                className="h-3 w-3 shrink-0 rounded-full"
                style={{
                  backgroundColor: RISK_COLORS[level],
                  boxShadow: `0 0 6px 1px ${RISK_COLORS[level]}66`,
                }}
              />
              {RISK_LABELS[level]}
            </li>
          ))}
        </ul>

        <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-fog">
          camadas
        </p>
        <ul className="flex flex-col gap-2 text-sm text-paper">
          <li className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: RAIN_COLOR }} />
            Ícone de chuva
          </li>
          <li className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: WIND_COLOR }} />
            Ícone / área de vulnerabilidade a vento
          </li>
          <li className="flex items-center gap-2">
            <span
              className="h-0.5 w-4 shrink-0 rounded-full"
              style={{ backgroundColor: DRAINAGE_COLOR }}
            />
            Sugestão de valeta / drenagem
          </li>
        </ul>

        <p className="mt-4 border-t border-line pt-3 text-[11px] italic leading-relaxed text-fog">
          * Dados fictícios — cenário hipotético para fins de demonstração,
          sem origem em medições reais.
        </p>
      </section>
    </div>
  );
}
