import {
  DeepPartial,
  IChartApi,
  ISeriesApi,
  LineSeries,
  LineWidth,
} from "lightweight-charts";

export function addLineSeries(
  chart: IChartApi,
  color: string = "lime",
  lineWidth: DeepPartial<LineWidth> | 1
): ISeriesApi<"Line"> {
  const lineSeries = chart.addSeries(LineSeries, {
    color,
    lineWidth,
  });

  // ẩn mặc định (chưa có data)
  lineSeries.setData([]);
  return lineSeries;
}
