"use client";

import { useEffect, useState } from "react";
import { PricePoint, SocketMessage, subscribeToPrices } from "./socket";

type PriceState = {
  points: PricePoint[];
  latest?: PricePoint;
  previous?: PricePoint;
  status: string;
};

export function usePriceFeed(symbol: string): PriceState {
  const [state, setState] = useState<PriceState>({
    points: [],
    status: "Connecting...",
  });

  useEffect(() => {
    const handle = (msg: SocketMessage) => {
      if (msg.type === "status") {
        setState((prev) => ({ ...prev, status: msg.message }));
      } else if (msg.type === "price" && msg.symbol === symbol) {
        setState((prev) => {
          const nextPoints = [...prev.points, msg.point].slice(-120);
          const latest = msg.point;
          const previous =
            nextPoints.length > 1
              ? nextPoints[nextPoints.length - 2]
              : prev.latest;
          return {
            points: nextPoints,
            latest,
            previous,
            status: prev.status || "Live",
          };
        });
      }
    };

    const unsub = subscribeToPrices(handle);
    return () => {
      unsub();
    };
  }, [symbol]);

  return state;
}

