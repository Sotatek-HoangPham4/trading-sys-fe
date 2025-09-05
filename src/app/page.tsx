"use client";

import { convertCandleData } from "@/application/chart/convertCandleData";
import { convertTimeframe } from "@/application/chart/convertTimeframe";
import CandlestickChart from "@/presentation/components/charts/CandlestickChart";
import TopTool from "@/presentation/components/tools/TopTool";
import { useReplay } from "@/presentation/hooks/useReplay";
import data from "@/shared/mocks/data.json";
import {
  IChartApi,
  ISeriesMarkersPluginApi,
  UTCTimestamp,
} from "lightweight-charts";
import { useRef, useState } from "react";
export default function Home() {
  const [timeframe, setTimeframe] = useState<"5m" | "15m" | "1h" | "1d">("5m");
  const convertedData = convertTimeframe(data.values, timeframe);
  const candleData = convertCandleData(convertedData);
  const candleSeriesRef = useRef<any>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const lineSeriesRef = useRef<any>(null);
  const markersApiRef = useRef<ISeriesMarkersPluginApi<UTCTimestamp> | null>(
    null
  );

  const {
    isReplayMode,
    isPlaying,
    enableReplayMode,
    setStartIndex,
    confirmReplayStart,
    startReplay,
    stopReplay,
    currentIndex,
    startIndex,
  } = useReplay({
    candleData,
    candleSeriesRef,
    chartRef,
    lineSeriesRef,
    markersApiRef,
  });

  return (
    <main className="w-full max-h-screen bg-[#2E2E2E] space-y-1">
      <TopTool
        timeframe={timeframe}
        setTimeframe={setTimeframe}
        isReplayMode={isReplayMode}
        isPlaying={isPlaying}
        enableReplayMode={enableReplayMode}
        confirmReplayStart={confirmReplayStart}
        startReplay={startReplay}
        stopReplay={stopReplay}
        currentIndex={currentIndex}
        startIndex={startIndex}
      />
      <div className="w-full h-[calc(100vh-44px)] flex gap-1">
        <div className="min-w-12 rounded-tr  bg-[#0F0F0F]"></div>
        <div className="w-full flex flex-col gap-1">
          <CandlestickChart
            timeframe={timeframe}
            candleData={candleData}
            isReplayMode={isReplayMode}
            candleSeriesRef={candleSeriesRef}
            chartRef={chartRef}
            lineSeriesRef={lineSeriesRef}
            markersApiRef={markersApiRef}
            setStartIndex={setStartIndex}
          />
          <div className="h-10 w-full bg-[#0F0F0F] rounded-t"></div>
        </div>
        <div className="min-w-96 h-auto bg-[#0F0F0F] rounded-tl"></div>
      </div>
    </main>
  );
}
