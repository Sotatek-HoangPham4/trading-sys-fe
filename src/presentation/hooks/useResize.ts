import { useEffect, useState } from "react";

export function useResize(offset: number = 88) {
  const [height, setHeight] = useState(window.innerHeight - offset);
  useEffect(() => {
    const handleResize = () => setHeight(window.innerHeight - offset);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [offset]);
  return height;
}
