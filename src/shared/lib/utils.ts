import { clsx, type ClassValue } from "clsx";
import { CandlestickData, UTCTimestamp } from "lightweight-charts";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
