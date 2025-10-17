import {
  DISPLAY_BARS_IN_SCREEN,
  RIGHT_OFFSET,
  SCALE_MARGINS_BOTTOM,
  SCALE_MARGINS_TOP,
} from "@/shared/contansts";
import {
  CandlestickData,
  createChart,
  IChartApi,
  UTCTimestamp,
} from "lightweight-charts";

export function initChart(
  container: HTMLDivElement,
  candleData: CandlestickData<UTCTimestamp>[],
  heightChart: number,
  isDark: boolean
): IChartApi {
  const chart = createChart(container, {
    width: container.clientWidth,
    height: container.clientHeight || heightChart,
    layout: {
      textColor: isDark ? "#D9D9D9" : "#000",
      background: { color: isDark ? "#0F0F0F" : "#FFFFFF" },
    },
    grid: {
      vertLines: { color: isDark ? "#1C1C1C" : "#E6E6E6" },
      horzLines: { color: isDark ? "#1C1C1C" : "#E6E6E6" },
    },
    crosshair: {
      mode: 1,
    },
  });

  chart.priceScale("right").applyOptions({
    autoScale: true,
    scaleMargins: {
      top: SCALE_MARGINS_TOP,
      bottom: SCALE_MARGINS_BOTTOM,
    },
  });

  const bars = candleData.length;
  if (bars > DISPLAY_BARS_IN_SCREEN) {
    chart.timeScale().setVisibleLogicalRange({
      from: bars - DISPLAY_BARS_IN_SCREEN,
      to: bars,
    });
    chart.timeScale().applyOptions({
      rightOffset: RIGHT_OFFSET,
    });
  } else {
    chart.timeScale().fitContent();
    chart.timeScale().applyOptions({
      rightOffset: RIGHT_OFFSET,
    });
  }
  return chart;
}
