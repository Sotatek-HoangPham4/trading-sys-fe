import { CandlestickData, UTCTimestamp } from "lightweight-charts";

export function calculateEMA(data: CandlestickData[], period: number) {
  const k = 2 / (period + 1);
  const emaArray: { time: UTCTimestamp; value: number }[] = [];

  let emaPrev = data[0].close;
  emaArray.push({ time: data[0].time as UTCTimestamp, value: emaPrev });

  for (let i = 1; i < data.length; i++) {
    const price = data[i].close;
    const ema = price * k + emaPrev * (1 - k);
    emaArray.push({ time: data[i].time as UTCTimestamp, value: ema });
    emaPrev = ema;
  }

  return emaArray;
}

export function calculateRSI(data: CandlestickData[], period = 14) {
  let gains = 0,
    losses = 0;
  const rsiArray: { time: UTCTimestamp; value: number }[] = [];

  for (let i = 1; i < data.length; i++) {
    const change = data[i].close - data[i - 1].close;
    gains += change > 0 ? change : 0;
    losses += change < 0 ? -change : 0;

    if (i >= period) {
      if (i > period) {
        const prevChange = data[i - period].close - data[i - period - 1].close;
        gains -= prevChange > 0 ? prevChange : 0;
        losses -= prevChange < 0 ? -prevChange : 0;
      }

      const avgGain = gains / period;
      const avgLoss = losses / period;
      const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
      const rsi = 100 - 100 / (1 + rs);

      rsiArray.push({ time: data[i].time as UTCTimestamp, value: rsi });
    }
  }
  return rsiArray;
}
