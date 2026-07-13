"use client";
/* eslint-disable react-hooks/set-state-in-effect */

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
  category: string;
  buyers: number;
  fill: string;
}

export interface ITelemetry {
  date: string;
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
  const [isConnecting, setIsConnecting] = useState(active);
  const [error, setError] = useState<string | null>(null);
  const [reconnectAttempt, setReconnectAttempt] = useState(0);
  const [connectionSeq, setConnectionSeq] = useState(0);

  useEffect(() => {
    if (!active) {
      setIsConnected(true);
      setIsConnecting(false);
      setError(null);
      return;
    }

    setIsConnected(false);
    setIsConnecting(true);
    setError(null);
    setConnectionSeq((prev) => prev + 1);

    const backendUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3003";
    const socket: Socket = io(backendUrl);

    socket.on("connect", () => {
      setIsConnected(true);
      setIsConnecting(false);
      setError(null);
      console.info(`Connected to Backend Socket Server: ${socket.id}`);
    });

    socket.on("connect_error", (err) => {
      console.error("Socket.io connection error:", err);
      setError("Failed to connect to the backend socket server.");
      setIsConnecting(false);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
      setIsConnecting(false);
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
  }, [active, reconnectAttempt]);

  const reconnect = React.useCallback(() => {
    setIsConnecting(true);
    setIsConnected(false);
    setError(null);
    setReconnectAttempt((prev) => prev + 1);
  }, []);

  return {
    sales,
    categories,
    telemetry,
    severity,
    isConnected,
    isConnecting,
    error,
    reconnect,
    connectionSeq,
  };
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
