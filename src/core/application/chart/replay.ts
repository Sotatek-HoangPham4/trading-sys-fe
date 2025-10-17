import { Candle } from "@/core/domain/models/Candle";

export class Replay {
  private intervalId: NodeJS.Timeout | null = null;

  start(
    data: Candle[],
    startIndex: number,
    onTick: (slice: Candle[], i: number) => void,
    onFinish: () => void,
    resumeIndex?: number
  ) {
    let i = resumeIndex ?? startIndex;
    this.intervalId = setInterval(() => {
      i++;
      if (i < data.length) {
        onTick(data.slice(0, i), i);
      } else {
        this.stop();
        onFinish();
      }
    }, 100);
  }

  stop() {
    if (this.intervalId) clearInterval(this.intervalId);
  }
}
