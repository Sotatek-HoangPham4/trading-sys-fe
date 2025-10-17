export interface Candle {
  time: number; // UTCTimestamp
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}
