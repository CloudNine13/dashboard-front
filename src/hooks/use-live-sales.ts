"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export interface ISale {
  orderId: string;
  amount: number;
  itemsCount: number;
  category: string;
  deviceType: "desktop" | "mobile";
  timestamp: string;
}

export function useLiveSales() {
  const [sales, setSales] = useState<ISale[]>([]);

  useEffect(() => {
    const socket: Socket = io("http://localhost:3003");

    socket.on("connect", () => {
      console.info(`Connected to WebSocket server: ${socket.id}`);
    });

    socket.on("sales-history", (history: ISale[]) => {
      setSales(history);
    });

    socket.on("new-sale", (newSale: ISale) => {
      setSales((prevSales) => {
        const updated = [...prevSales, newSale];
        const thirtyMinutesAgo = Date.now() - 30 * 60 * 1000;
        return updated.filter(
          (item) => new Date(item.timestamp).getTime() >= thirtyMinutesAgo,
        );
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return sales;
}
