export interface MeterRow {
  id: string;
  lastValue?: string | null | undefined;
  valveState?: string | undefined;
  createdAt: string;
  readings: number;
}

export interface MetersResponse {
  data: MeterRow[];
  total: number;
}
