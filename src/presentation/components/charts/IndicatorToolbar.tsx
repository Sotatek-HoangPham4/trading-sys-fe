import { CandlestickData, UTCTimestamp } from "lightweight-charts";
import React from "react";

const IndicatorToolbar = ({
  currentCandle,
  currentVolume,
}: {
  currentCandle: CandlestickData<UTCTimestamp> | null;
  currentVolume: number;
}) => {
  return (
    <div className="flex gap-2">
      <div className="p-1 py-0.5 rounded border">
        <p className="text-xs">
          Vol · Ticks {currentVolume} · Close {currentCandle?.close}
        </p>
      </div>
    </div>
  );
};

export default IndicatorToolbar;
