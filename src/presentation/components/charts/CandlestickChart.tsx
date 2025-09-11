"use client";

import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTheme } from "next-themes";
import {
  CandlestickData,
  IChartApi,
  ISeriesApi,
  LineSeries,
  UTCTimestamp,
  type ISeriesMarkersPluginApi,
} from "lightweight-charts";

import { convertTimeframe } from "@/application/chart/convertTimeframe";
import ChartToolbar from "./ChartToolbar";
import { convertCandleData } from "@/application/chart/convertCandleData";
import { initChart } from "@/application/chart/initChart";
import { addCandlestickSeries } from "@/application/chart/addCandlestickSeries";
import { addVolumeSeries } from "@/application/chart/addVolumeSeries";
import { covertVolumeData } from "@/application/chart/convertVolumeData";
import { addEMASeries } from "@/application/chart/addEMASeries";
import { addRSISeries } from "@/application/chart/addRSISeries";
import { attachResizeObserver } from "@/application/chart/attachResizeObserver";
import { addLineSeries } from "@/application/chart/addLineSeries";
import { useReplay } from "@/presentation/hooks/useReplay";
import { setupReplayClickHandler } from "@/application/chart/setupReplayClickHandler";
import IndicatorToolbar from "./IndicatorToolbar";
import { addBOSLabel } from "@/application/chart/addBOSLabel";

export default function CandlestickChart({
  timeframe,
  candleData,
  isReplayMode,
  candleSeriesRef,
  chartRef,
  lineSeriesRef,
  markersApiRef,
  setStartIndex,
}: {
  timeframe: any;
  candleData: CandlestickData<UTCTimestamp>[];
  isReplayMode: boolean;
  candleSeriesRef: RefObject<any>;
  chartRef: RefObject<IChartApi | null>;
  lineSeriesRef: RefObject<any>;
  markersApiRef: RefObject<ISeriesMarkersPluginApi<UTCTimestamp> | null>;
  setStartIndex: Dispatch<SetStateAction<number>>;
}) {
  const { theme } = useTheme();
  // const [timeframe, setTimeframe] = useState<"5m" | "15m" | "1h" | "1d">("5m");

  const emaConfigs = [
    { period: 20, color: "orange" },
    { period: 50, color: "red" },
    { period: 89, color: "green" },
  ];

  const emaSeriesRefs = useRef<
    { period: number; api: ISeriesApi<"Line"> | null; color: string }[]
  >([]);

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const currentCandleRef = useRef<CandlestickData<UTCTimestamp> | null>(null);
  const [displayCandle, setDisplayCandle] =
    useState<CandlestickData<UTCTimestamp> | null>(null);

  const [heightChart, setHeightChart] = useState(0);
  const [showEMA, setShowEMA] = useState(true);
  const [showRSI, setShowRSI] = useState(true);
  const [showVolume, setShowVolume] = useState(true);
  const [currentCandle, setCurrentCandle] =
    useState<CandlestickData<UTCTimestamp> | null>(null);

  const rsiRef = useRef<ISeriesApi<"Line"> | null>(null);
  const volumeRef = useRef<ISeriesApi<"Histogram"> | null>(null);

  const volumeData = covertVolumeData(candleData);
  const [emaValues, setEmaValues] = useState<
    { period: number; value: number | null; color: string }[]
  >([]);
  const [rsiValue, setRsiValue] = useState<number | null>(null);

  const [emaSeriesStates, setEmaSeriesStates] = useState(
    emaConfigs.map((config) => ({
      period: config.period,
      color: config.color,
      show: true, // mặc định hiển thị
    }))
  );

  const removeEma = (period: number) => {
    const index = emaSeriesRefs.current.findIndex((s) => s.period === period);
    if (index !== -1) {
      const api = emaSeriesRefs.current[index].api;
      if (api) {
        chartRef.current?.removeSeries(api);
      }
      emaSeriesRefs.current.splice(index, 1);
      setEmaSeriesStates((prev) => prev.filter((s) => s.period !== period));
    }
  };

  const toggleEmaVisibility = (period: number) => {
    emaSeriesRefs.current.forEach((s) => {
      if (s.period === period) {
        s.api!.applyOptions({ visible: !s.api!.options().visible });
      }
    });

    // đồng bộ state để UI update icon
    setEmaSeriesStates((prev) =>
      prev.map((s) => (s.period === period ? { ...s, show: !s.show } : s))
    );
  };

  useEffect(() => {
    const handleResize = () => {
      setHeightChart(window.innerHeight - 88);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const isDark = theme !== "dark";
    const chart = initChart(
      chartContainerRef.current,
      candleData,
      heightChart,
      isDark
    );
    const resizeObserver = attachResizeObserver(
      chart,
      chartContainerRef.current!
    );
    chartRef.current = chart;
    addCandlestickSeries(chart, candleData, candleSeriesRef, markersApiRef);
    addVolumeSeries(chart, volumeData, volumeRef, showVolume);
    setupReplayClickHandler(chart, candleData, setStartIndex, markersApiRef);

    const crosshairCallback = (param: any) => {
      if (!param || !param.time) return;

      const candle = param.seriesData.get(candleSeriesRef.current);
      currentCandleRef.current = candle ?? null;

      // Lấy giá trị EMA tại con trỏ
      const values = emaSeriesRefs.current.map((ema) => {
        const value = param.seriesData.get(ema.api);
        return {
          period: ema.period,
          value: value?.value ?? null,
          color: ema.color,
        };
      });

      // Lấy giá trị RSI
      const rsiData = param.seriesData.get(rsiRef.current);
      setRsiValue(rsiData?.value ?? null);

      setDisplayCandle(candle ?? null);
      setEmaValues(values); // ✅ lưu EMA vào state
    };

    chart.subscribeCrosshairMove(crosshairCallback);

    emaSeriesRefs.current = emaConfigs
      .map((config) => {
        const api = addEMASeries(
          chartRef.current!,
          candleData,
          config.period,
          config.color,
          1,
          showEMA
        );

        if (!api) return null;

        return {
          period: config.period,
          api,
          color: config.color,
        };
      })
      .filter(
        (
          item
        ): item is { period: number; api: ISeriesApi<"Line">; color: string } =>
          item !== null
      );

    rsiRef.current = addRSISeries(chart, candleData, 14, "purple", 2, showRSI);
    lineSeriesRef.current = addLineSeries(chart, "lime", 1);

    const pointA = {
      time: candleData[candleData.length - 26].time as UTCTimestamp,
      value: candleData[candleData.length - 26].low, // đáy trước
    };

    const pointB = {
      time: candleData[candleData.length - 5].time as UTCTimestamp,
      value: candleData[candleData.length - 5].high, // đỉnh breakout
    };
    const bosSeries = chart.addSeries(LineSeries, {
      color: "white",
      lineWidth: 1,
    });

    bosSeries.setData([
      { time: pointA.time, value: pointA.value },
      { time: pointB.time, value: pointB.value },
    ]);

    const cleanupBOS = addBOSLabel(
      chart,
      chartContainerRef.current!,
      bosSeries,
      pointA,
      pointB
    );

    return () => {
      chart.unsubscribeCrosshairMove(crosshairCallback);
      resizeObserver.disconnect();
      if (cleanupBOS) cleanupBOS();
      chart.removeSeries(bosSeries);
      chart.remove();
    };
  }, [theme, timeframe, showEMA, showRSI, showVolume, heightChart]);

  return (
    <div
      className={
        isReplayMode
          ? "flex flex-col gap-2 outline-4 outline-blue-500 rounded"
          : "flex flex-col gap-2"
      }
    >
      <div
        ref={chartContainerRef}
        className="w-full h-[calc(100vh-100px)] rounded overflow-hidden shadow relative"
      />
      <ChartToolbar
        emaValues={emaValues}
        rsiValue={rsiValue}
        removeEma={removeEma}
        toggleEmaVisibility={toggleEmaVisibility}
        emaSeriesStates={emaSeriesStates}
        setEmaSeriesStates={setEmaSeriesStates}
        volumeData={volumeData}
        currentCandle={displayCandle}
        timeframe={timeframe}
        setShowVolume={setShowVolume}
        setShowEMA={setShowEMA}
        setShowRSI={setShowRSI}
        showEMA={showEMA}
        toggleEMA={() => setShowEMA((p) => !p)}
        showRSI={showRSI}
        toggleRSI={() => setShowRSI((p) => !p)}
        showVolume={showVolume}
        toggleVolume={() => setShowVolume((p) => !p)}
        isReplayMode={isReplayMode}
      />
    </div>
  );
}
