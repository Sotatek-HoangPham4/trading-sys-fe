import { RefObject, useRef, useState } from "react";
import {
  ISeriesApi,
  UTCTimestamp,
  CandlestickData,
  IChartApi,
  ISeriesMarkersPluginApi,
} from "lightweight-charts";

interface UseReplayProps {
  candleData: CandlestickData<UTCTimestamp>[];
  candleSeriesRef: RefObject<any>;
  chartRef: RefObject<IChartApi | null>;
  lineSeriesRef: RefObject<any>;
  markersApiRef: RefObject<ISeriesMarkersPluginApi<UTCTimestamp> | null>;
}

export function useReplay({
  candleData,
  candleSeriesRef,
  chartRef,
  lineSeriesRef,
  markersApiRef,
}: UseReplayProps) {
  const [isReplayMode, setIsReplayMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const enableReplayMode = () => {
    if (!chartRef.current || !lineSeriesRef.current) return;
    setIsReplayMode(true);
    // move line theo crosshair
    chartRef.current.subscribeCrosshairMove((param) => {
      if (!param.time || !isReplayMode) return;
      const time = param.time as number;

      // vẽ line thẳng đứng: dùng series line với 2 điểm cực trị
      const yMin = Math.min(...candleData.map((d) => d.low));
      const yMax = Math.max(...candleData.map((d) => d.high));

      lineSeriesRef.current.setData([
        { time, value: yMin },
        { time, value: yMax },
      ]);
    });
  };

  const confirmReplayStart = () => {
    if (!lineSeriesRef.current) return;
    const lineData = lineSeriesRef.current.data() as any[];
    if (lineData.length > 0) {
      const time = lineData[0].time;
      const idx = candleData.findIndex((c) => c.time === time);
      if (idx >= 0) {
        setStartIndex(idx);
      }
    }
    setIsReplayMode(false);
  };

  const startReplay = (resume = false) => {
    if (!candleSeriesRef.current) return;

    setIsPlaying(true);
    let i = resume ? currentIndex : startIndex;
    if (!resume) {
      candleSeriesRef.current.setData(candleData.slice(0, i));
    }

    intervalRef.current = setInterval(() => {
      i++;
      if (i < candleData.length) {
        candleSeriesRef.current!.setData(candleData.slice(0, i));
        markersApiRef.current?.setMarkers([
          {
            time: candleData[startIndex].time as UTCTimestamp,
            position: "belowBar",
            color: "orange",
            size: 1.5,
            shape: "arrowUp",
            text: "Start",
          },
        ]);

        setCurrentIndex(i);
      } else {
        stopReplay();
      }
    }, 100);
  };

  const stopReplay = () => {
    setIsPlaying(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  return {
    isReplayMode,
    setIsReplayMode,
    isPlaying,
    startIndex,
    setStartIndex,
    currentIndex,
    enableReplayMode,
    confirmReplayStart,
    startReplay,
    stopReplay,
  };
}
