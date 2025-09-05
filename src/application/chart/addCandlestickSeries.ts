import { DOWN_COLOR, UP_COLOR } from "@/shared/contansts";
import {
  CandlestickSeries,
  IChartApi,
  UTCTimestamp,
  createSeriesMarkers,
  type ISeriesMarkersPluginApi,
  CandlestickData,
} from "lightweight-charts";
import { RefObject } from "react";

export function addCandlestickSeries(
  chart: IChartApi,
  candleData: CandlestickData<UTCTimestamp>[],
  candleSeriesRef: RefObject<any>,
  markersApiRef?: RefObject<ISeriesMarkersPluginApi<UTCTimestamp> | null>
) {
  const candlestickSeries = chart.addSeries(CandlestickSeries, {
    upColor: UP_COLOR,
    downColor: DOWN_COLOR,
    borderVisible: false,
    wickUpColor: UP_COLOR,
    wickDownColor: DOWN_COLOR,
  });

  candlestickSeries.setData(candleData);
  candleSeriesRef.current = candlestickSeries;

  if (markersApiRef) {
    markersApiRef.current = createSeriesMarkers<UTCTimestamp>(
      candlestickSeries as any,
      []
    );
  }

  return candlestickSeries;
}
