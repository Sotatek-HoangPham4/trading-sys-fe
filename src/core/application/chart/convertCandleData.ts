import { CandlestickData, UTCTimestamp } from "lightweight-charts";

export function convertCandleData(
  convertedData: any[]
): CandlestickData<UTCTimestamp>[] {
  return convertedData
    .map((item: any) => ({
      time: Math.floor(
        new Date(item.datetime).getTime() / 1000
      ) as UTCTimestamp,
      open: parseFloat(item.open),
      high: parseFloat(item.high),
      low: parseFloat(item.low),
      close: parseFloat(item.close),
    }))
    .sort((a, b) => a.time - b.time);
}
