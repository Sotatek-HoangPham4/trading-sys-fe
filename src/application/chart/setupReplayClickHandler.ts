import { IChartApi, UTCTimestamp, CandlestickData } from "lightweight-charts";

export function setupReplayClickHandler(
  chart: IChartApi,
  candleData: CandlestickData<UTCTimestamp>[],
  setStartIndex: (idx: number) => void,
  markersApiRef: React.MutableRefObject<any>
) {
  chart.subscribeClick((param) => {
    if (param.time) {
      const idx = candleData.findIndex(
        (c) => c.time === (param.time as number)
      );
      if (idx >= 0) {
        setStartIndex(idx);

        markersApiRef.current?.setMarkers([
          {
            time: candleData[idx].time as any,
            position: "belowBar",
            color: "orange",
            size: 1.5,
            shape: "arrowUp",
            text: "Start",
          },
        ]);
      }
    }
  });
}
