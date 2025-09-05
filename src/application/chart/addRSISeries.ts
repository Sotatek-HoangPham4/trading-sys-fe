import {
  LineSeries,
  IChartApi,
  ISeriesApi,
  UTCTimestamp,
  DeepPartial,
  LineWidth,
  CandlestickData,
} from "lightweight-charts";
import { calculateRSI } from "@/domain/services/indicators";

export function addRSISeries(
  chart: IChartApi,
  candleData: CandlestickData<UTCTimestamp>[],
  period: number = 14,
  color: string = "purple",
  lineWidth: DeepPartial<LineWidth> | 2,
  show: boolean
): ISeriesApi<"Line"> | null {
  if (!show) return null;

  const rsiSeries = chart.addSeries(LineSeries, {
    priceScaleId: "rsi",
    color,
    lineWidth,
  });

  chart.priceScale("rsi").applyOptions({
    scaleMargins: { top: 0.8, bottom: 0 },
  });

  rsiSeries.setData(calculateRSI(candleData, period));
  return rsiSeries;
}
