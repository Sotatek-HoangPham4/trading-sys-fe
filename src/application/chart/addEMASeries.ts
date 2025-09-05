import {
  LineSeries,
  IChartApi,
  ISeriesApi,
  UTCTimestamp,
  DeepPartial,
  LineWidth,
  CandlestickData,
} from "lightweight-charts";
import { calculateEMA } from "@/domain/services/indicators";

export function addEMASeries(
  chart: IChartApi,
  candleData: CandlestickData<UTCTimestamp>[],
  period: number,
  color: string,
  lineWidth: DeepPartial<LineWidth> | 1,
  show: boolean
): ISeriesApi<"Line"> | null {
  if (!show) return null;
  const emaSeries = chart.addSeries(LineSeries, {
    color,
    lineWidth,
  });

  emaSeries.setData(calculateEMA(candleData, period));
  return emaSeries;
}
