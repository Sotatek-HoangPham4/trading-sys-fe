"use client";

import { useEffect, useRef, useState } from "react";
import { IChartApi, ISeriesApi, UTCTimestamp } from "lightweight-charts";
import { convertTimeframe } from "@/core/application/chart/convertTimeframe";
import { convertCandleData } from "@/core/application/chart/convertCandleData";
import { covertVolumeData } from "@/core/application/chart/convertVolumeData";
import { initChart } from "@/core/application/chart/initChart";
import { attachResizeObserver } from "@/core/application/chart/attachResizeObserver";
import { addCandlestickSeries } from "@/core/application/chart/addCandlestickSeries";
import { addVolumeSeries } from "@/core/application/chart/addVolumeSeries";
import { addEMASeries } from "@/core/application/chart/addEMASeries";
import { addRSISeries } from "@/core/application/chart/addRSISeries";
import { addLineSeries } from "@/core/application/chart/addLineSeries";
import { setupReplayClickHandler } from "@/core/application/chart/setupReplayClickHandler";
import { type ISeriesMarkersPluginApi } from "lightweight-charts";

export function useCandlestickChart(data: any, theme: string | undefined) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  // Series refs
  const candleSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const lineSeriesRef = useRef<ISeriesApi<"Line"> | null>(null);
  const ema20Ref = useRef<ISeriesApi<"Line"> | null>(null);
  const ema89Ref = useRef<ISeriesApi<"Line"> | null>(null);
  const rsiRef = useRef<ISeriesApi<"Line"> | null>(null);
  const volumeRef = useRef<ISeriesApi<"Histogram"> | null>(null);
  const markersApiRef = useRef<ISeriesMarkersPluginApi<UTCTimestamp> | null>(
    null
  );

  // UI state
  const [timeframe, setTimeframe] = useState<"5m" | "15m" | "1h" | "1d">("5m");
  const [showEMA, setShowEMA] = useState(true);
  const [showRSI, setShowRSI] = useState(true);
  const [showVolume, setShowVolume] = useState(true);

  // Convert data theo timeframe
  const convertedData = convertTimeframe(data.values, timeframe);
  const candleData = convertCandleData(convertedData);
  const volumeData = covertVolumeData(candleData);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const isDark = theme !== "dark";
    const chart = initChart(chartContainerRef.current, candleData, 500, isDark);
    const resizeObserver = attachResizeObserver(
      chart,
      chartContainerRef.current
    );

    // Add series
    addCandlestickSeries(chart, candleData, candleSeriesRef, markersApiRef);
    addVolumeSeries(chart, volumeData, volumeRef, showVolume);
    setupReplayClickHandler(chart, candleData, () => {}, markersApiRef);

    ema20Ref.current = addEMASeries(chart, candleData, 20, "blue", 1, showEMA);
    ema89Ref.current = addEMASeries(chart, candleData, 89, "green", 1, showEMA);
    rsiRef.current = addRSISeries(chart, candleData, 14, "purple", 2, showRSI);
    lineSeriesRef.current = addLineSeries(chart, "lime", 1);

    chartRef.current = chart;

    return () => {
      resizeObserver.disconnect();
      chart.remove();
    };
  }, [theme, timeframe, showEMA, showRSI, showVolume]);

  return {
    candleData,
    chartContainerRef,
    chartRef,
    candleSeriesRef,
    lineSeriesRef,
    ema20Ref,
    ema89Ref,
    rsiRef,
    volumeRef,
    markersApiRef,
    timeframe,
    setTimeframe,
    showEMA,
    toggleEMA: () => setShowEMA((p) => !p),
    showRSI,
    toggleRSI: () => setShowRSI((p) => !p),
    showVolume,
    toggleVolume: () => setShowVolume((p) => !p),
  };
}
