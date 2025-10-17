import {
  HistogramSeries,
  HistogramData,
  IChartApi,
  ISeriesApi,
} from "lightweight-charts";
import { RefObject } from "react";

export function addVolumeSeries(
  chart: IChartApi,
  volumeData: HistogramData[],
  volumeRef: RefObject<ISeriesApi<"Histogram"> | null>,
  showVolume: boolean
) {
  volumeRef.current = chart.addSeries(HistogramSeries, {
    priceFormat: { type: "volume" },
    priceScaleId: "volume",
  });

  chart.priceScale("volume").applyOptions({
    scaleMargins: {
      top: 0.8,
      bottom: 0,
    },
  });

  if (volumeRef.current) {
    showVolume
      ? volumeRef.current.setData(volumeData)
      : volumeRef.current.setData([]);
  }
}
