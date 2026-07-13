"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

interface WebSocketContextType {
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  reconnect: () => void;
  socket: WebSocket | null;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(
  undefined,
);

export function WebSocketProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const connect = useCallback(() => {
    if (typeof window === "undefined") return;

    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const host =
      window.location.host ||
      `localhost:${process.env.NEXT_PUBLIC_FRONTEND_PORT || "3000"}`;
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || `${protocol}//${host}`;

    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      setSocket(ws);
      setIsConnected(true);
      setIsConnecting(false);
      setError(null);
    };

    ws.onerror = (event) => {
      console.error("WebSocket connection error:", event);
      setError("Failed to connect to the WebSocket server at " + wsUrl);
      setIsConnecting(false);
    };

    ws.onclose = (event) => {
      setSocket(null);
      setIsConnected(false);
      if (!event.wasClean) {
        setError("WebSocket connection lost unexpectedly.");
      }
      setIsConnecting(false);
    };

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    const cleanup = connect();
    return () => {
      if (cleanup) cleanup();
    };
  }, [connect]);

  const reconnect = useCallback(() => {
    setIsConnecting(true);
    setIsConnected(false);
    setError(null);
    connect();
  }, [connect]);

  return (
    <WebSocketContext.Provider
      value={{ isConnected, isConnecting, error, reconnect, socket }}
    >
      {children}
    </WebSocketContext.Provider>
  );
}

export function useWebSocket() {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
}
