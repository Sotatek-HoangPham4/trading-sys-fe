import { HistogramData } from "lightweight-charts";

export function covertVolumeData(candleData: any[]): HistogramData[] {
  return candleData.map((c) => ({
    time: c.time,
    value: Math.abs(c.close - c.open),
    color:
      c.close >= c.open ? "rgba(38, 166, 154, 0.5)" : "rgba(239, 83, 80, 0.5)",
  }));
}
