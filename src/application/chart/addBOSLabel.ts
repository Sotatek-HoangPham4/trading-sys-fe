import { IChartApi, ISeriesApi, UTCTimestamp } from "lightweight-charts";

export function addBOSLabel(
  chart: IChartApi,
  container: HTMLDivElement,
  series: ISeriesApi<"Line" | "Candlestick">,
  pointA: { time: UTCTimestamp; value: number },
  pointB: { time: UTCTimestamp; value: number }
) {
  if (!container) return () => {};

  // tạo label
  const label = document.createElement("div");
  label.innerText = "BOS";
  label.style.position = "absolute";
  label.style.pointerEvents = "none";
  label.style.zIndex = "9999"; // **đảm bảo hiển thị trên canvas**
  label.style.color = "black";
  label.style.fontWeight = "700";
  label.style.fontSize = "13px";
  label.style.background = "rgba(255,255,255,0.95)";
  label.style.padding = "2px 6px";
  label.style.borderRadius = "4px";
  label.style.boxShadow = "0 1px 4px rgba(0,0,0,0.12)";
  label.style.transform = "translate(-50%, -50%)"; // center tại điểm (x,y)
  label.style.whiteSpace = "nowrap";

  container.appendChild(label);

  const update = () => {
    try {
      const timeScale = chart.timeScale();

      // midpoint theo thời gian & giá
      const midTime = ((Number(pointA.time) + Number(pointB.time)) /
        2) as UTCTimestamp;
      const midPrice = (pointA.value + pointB.value) / 2;

      const x = timeScale.timeToCoordinate(midTime);
      const y = (series as any).priceToCoordinate(midPrice); // series.priceToCoordinate có kiểu runtime

      // debug (bật nếu cần)
      // console.log('BOS coords', { x, y, midTime, midPrice });

      if (x != null && y != null) {
        // đặt vào đúng vị trí trong container (chart wrapper)
        label.style.left = `${Math.round(x)}px`;
        label.style.top = `${Math.round(y)}px`;
        label.style.display = "block";
      } else {
        label.style.display = "none";
      }
    } catch (err) {
      // nếu có lỗi type/runtime, ẩn label để tránh crash
      // console.error('addBOSLabel update error', err);
      label.style.display = "none";
    }
  };

  // gọi lần đầu sau khi browser vẽ xong
  requestAnimationFrame(update);

  // subscribe những event ảnh hưởng vị trí
  const sub1 = chart.timeScale().subscribeVisibleTimeRangeChange(update);
  let sub2: (() => void) | null = null;
  // subscribeVisibleLogicalRangeChange may not exist in some versions -> guard it
  const tsApi: any = chart.timeScale();
  if (typeof tsApi.subscribeVisibleLogicalRangeChange === "function") {
    sub2 = tsApi.subscribeVisibleLogicalRangeChange(update);
  }
  const sub3 = chart.subscribeCrosshairMove(update);

  // trả về cleanup function để component gọi khi unmount hoặc remove series
  return () => {
    try {
      if (sub1) sub1();
      if (sub2) sub2();
      if (sub3) chart.unsubscribeCrosshairMove(sub3);
    } catch (e) {
      // ignore
    }
    label.remove();
  };
}
