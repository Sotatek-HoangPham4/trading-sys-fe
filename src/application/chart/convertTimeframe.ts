export function convertTimeframe(
  data: any[],
  timeframe: "5m" | "15m" | "30m" | "1h" | "1d"
) {
  const minutesMap: Record<string, number> = {
    "5m": 5,
    "15m": 15,
    "30m": 30,
    "1h": 60,
    "1d": 60 * 24,
  };

  const baseInterval = 5; // dữ liệu gốc là 5 phút
  const targetInterval = minutesMap[timeframe];
  const groupSize = targetInterval / baseInterval;

  // 🔹 sort tăng dần theo datetime
  const sorted = [...data].sort(
    (a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
  );

  const result: any[] = [];

  for (let i = 0; i < sorted.length; i += groupSize) {
    const slice = sorted.slice(i, i + groupSize);
    if (slice.length === 0) continue;

    const open = parseFloat(slice[0].open);
    const close = parseFloat(slice[slice.length - 1].close);
    const high = Math.max(...slice.map((s) => parseFloat(s.high)));
    const low = Math.min(...slice.map((s) => parseFloat(s.low)));

    result.push({
      datetime: slice[0].datetime, // lấy timestamp mở nến
      open,
      high,
      low,
      close,
    });
  }

  return result;
}
