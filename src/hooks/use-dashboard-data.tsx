"use client";

import * as React from "react";
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

export interface ICategorySale {
  browser: string;
  visitors: number;
  fill: string;
}

export interface ITelemetry {
  month: string;
  desktop: number;
  mobile: number;
}

export interface ILogSeverity {
  code: string;
  issues: number;
  fill: string;
}

export function useDashboardData(active: boolean) {
  const [sales, setSales] = useState<ISale[]>([]);
  const [categories, setCategories] = useState<ICategorySale[]>([]);
  const [telemetry, setTelemetry] = useState<ITelemetry[]>([]);
  const [severity, setSeverity] = useState<ILogSeverity[]>([]);
  const [isConnected, setIsConnected] = useState(!active);

  useEffect(() => {
    if (!active) return;

    const host =
      typeof window !== "undefined" ? window.location.hostname : "localhost";
    const socket: Socket = io(`http://${host}:3003`);

    socket.on("connect", () => {
      setIsConnected(true);
      console.info(`Connected to Backend Socket Server: ${socket.id}`);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("sales-history", (history: ISale[]) => {
      setSales(history);
    });

    socket.on("new-sale", (newSale: ISale) => {
      setSales((prev) => {
        const updated = [...prev, newSale];
        const cutoff = Date.now() - 30 * 60 * 1000;
        return updated.filter((s) => new Date(s.timestamp).getTime() >= cutoff);
      });
    });

    socket.on("category-sales", (categoryData: ICategorySale[]) => {
      setCategories(categoryData);
    });

    socket.on("api-telemetry", (telemetryData: ITelemetry[]) => {
      setTelemetry(telemetryData);
    });

    socket.on("log-severity", (severityData: ILogSeverity[]) => {
      setSeverity(severityData);
    });

    return () => {
      socket.disconnect();
    };
  }, [active]);

  return { sales, categories, telemetry, severity, isConnected };
}

const DashboardContext = React.createContext<ReturnType<
  typeof useDashboardData
> | null>(null);

export function DashboardProvider({
  children,
  active,
}: {
  children: React.ReactNode;
  active: boolean;
}) {
  const value = useDashboardData(active);
  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = React.useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
