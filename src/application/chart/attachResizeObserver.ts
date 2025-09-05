import { IChartApi } from "lightweight-charts";

export function attachResizeObserver(
  chart: IChartApi,
  container: HTMLDivElement
) {
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      if (entry.contentRect.width && entry.contentRect.height) {
        chart.applyOptions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    }
  });

  resizeObserver.observe(container);
  return resizeObserver;
}
