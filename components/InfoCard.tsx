"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { WeatherData } from "@/types";
import { RISK_COLORS, RISK_LABELS } from "@/types";

interface InfoCardProps {
  data: WeatherData | null;
}

export default function InfoCard({ data }: InfoCardProps) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center p-4">
      <AnimatePresence>
        {data && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="pointer-events-auto flex items-center gap-5 rounded-lg border border-line bg-panel/90 px-5 py-3 font-mono text-xs text-paper shadow-[0_0_24px_rgba(0,0,0,0.4)] backdrop-blur"
          >
            <div>
              <p className="text-[10px] uppercase tracking-widest text-fog">
                região
              </p>
              <p>{data.name}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-fog">
                coordenadas
              </p>
              <p>
                {data.lat.toFixed(4)}°S {Math.abs(data.lng).toFixed(4)}°W
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-fog">
                chuva
              </p>
              <p>{data.rainfall_mm} mm</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-fog">
                vento
              </p>
              <p>{data.wind_kmh} km/h</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-fog">
                risco
              </p>
              <p
                className="flex items-center gap-1.5"
                style={{ color: RISK_COLORS[data.risk_level] }}
              >
                <span
                  className="relative inline-flex h-2 w-2 rounded-full"
                  style={{ backgroundColor: RISK_COLORS[data.risk_level] }}
                >
                  <span
                    className="risk-pulse absolute inset-0 rounded-full"
                    style={{ backgroundColor: RISK_COLORS[data.risk_level] }}
                  />
                </span>
                {RISK_LABELS[data.risk_level]}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
