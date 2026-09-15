export type RiskLevel = "baixo" | "medio" | "alto" | "critico";

export interface DrainageLine {
  id: string;
  path: [number, number][];
  description: string;
  priority: RiskLevel;
}

export interface Region {
  id: string;
  name: string;
  center: [number, number];
  polygon: [number, number][];
  rainfall_mm: number;
  wind_kmh: number;
  terrain: string;
  flood_threshold_mm: number;
  wind_threshold_kmh: number;
  suggested_drainage: DrainageLine[];
}

export interface WeatherData {
  lat: number;
  lng: number;
  rainfall_mm: number;
  wind_kmh: number;
  risk_level: RiskLevel;
  name: string;
}

export interface FilterState {
  rain: boolean;
  wind: boolean;
  drainage: boolean;
  rainIntensity: number;
  windIntensity: number;
}

export const RISK_COLORS: Record<RiskLevel, string> = {
  baixo: "#3DDC84",
  medio: "#F2C744",
  alto: "#F2884B",
  critico: "#E5484D",
};

export const RISK_LABELS: Record<RiskLevel, string> = {
  baixo: "Baixo",
  medio: "Médio",
  alto: "Alto",
  critico: "Crítico",
};

// Cores por causa (independente do nível de risco, para diferenciar
// chuva de vento nos ícones e sobreposições do mapa).
export const RAIN_COLOR = "#3AA0FF";
export const WIND_COLOR = "#B98CF2";
export const DRAINAGE_COLOR = "#FF3B57";
