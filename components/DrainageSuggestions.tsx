"use client";

import { Polyline, Tooltip } from "react-leaflet";
import type { Region } from "@/types";
import { DRAINAGE_COLOR, RISK_LABELS } from "@/types";

interface DrainageSuggestionsProps {
  regions: Region[];
}

export default function DrainageSuggestions({
  regions,
}: DrainageSuggestionsProps) {
  return (
    <>
      {regions.flatMap((region) =>
        region.suggested_drainage.map((line) => (
          <Polyline
            key={line.id}
            positions={line.path}
            pathOptions={{
              color: DRAINAGE_COLOR,
              weight: 4,
              lineCap: "round",
              className: "valeta-line",
            }}
            eventHandlers={{
              mouseover: (e) => e.target.setStyle({ weight: 6 }),
              mouseout: (e) => e.target.setStyle({ weight: 4 }),
            }}
          >
            <Tooltip sticky className="font-mono text-xs">
              <div>
                <p className="font-semibold">{region.name}</p>
                <p>{line.description}</p>
                <p className="text-fog">
                  prioridade: {RISK_LABELS[line.priority]}
                </p>
              </div>
            </Tooltip>
          </Polyline>
        ))
      )}
    </>
  );
}
