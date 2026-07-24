"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import * as React from "react";
import { useEffect, useState, useCallback, useRef } from "react";
import mqtt from "mqtt";
import type {
  DroneInfo,
  DroneTelemetryPoint,
  DroneAlert,
  DroneMissionStats,
  DroneMqttMessage,
} from "@/types/drone";

export function useDroneData(active: boolean) {
  const [drones, setDrones] = useState<DroneInfo[]>([]);
  const [telemetry, setTelemetry] = useState<DroneTelemetryPoint[]>([]);
  const [alerts, setAlerts] = useState<DroneAlert[]>([]);
  const [stats, setStats] = useState<DroneMissionStats | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(!active);
  const [isConnecting, setIsConnecting] = useState<boolean>(active);
  const [error, setError] = useState<string | null>(null);
  const [connectionSeq, setConnectionSeq] = useState<number>(0);

  const mockTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clientRef = useRef<ReturnType<typeof mqtt.connect> | null>(null);

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

    const brokerUrl = process.env.NEXT_PUBLIC_MQTT_BROKER || "wss://test.mosquitto.org:8081/mqtt";
    const topic = process.env.NEXT_PUBLIC_MQTT_TOPIC || "igor/drones/telemetry";

    const client = mqtt.connect(brokerUrl);
    clientRef.current = client;

    let hasReceivedMessage = false;

    client.on("connect", () => {
      client.subscribe(topic);
    });

    client.on("message", (receivedTopic, payload) => {
      if (receivedTopic !== topic) return;
      try {
        const message: DroneMqttMessage = JSON.parse(payload.toString());
        hasReceivedMessage = true;

        setIsConnected(true);
        setIsConnecting(false);
        setError(null);

        setDrones(message.drones || []);

        setTelemetry((prev) => {
          if (!message.telemetry || message.telemetry.length === 0) return prev;
          const combined = [...prev, ...message.telemetry];
          const droneIds = [...new Set(combined.map((t) => t.droneId))];
          const capped = droneIds.flatMap((id) => {
            const points = combined.filter((t) => t.droneId === id);
            return points.slice(-50);
          });
          return capped;
        });

        setAlerts((prev) => {
          if (!message.alerts || message.alerts.length === 0) return prev;
          const combined = [...prev, ...message.alerts];
          return combined.slice(-100);
        });

        if (message.stats) setStats(message.stats);
      } catch {
        console.warn("Failed to parse MQTT message");
      }
    });

    client.on("error", (err) => {
      setIsConnected(false);
      setIsConnecting(false);
      setError(err.message || "MQTT connection failed");
    });

    client.on("close", () => {
      setIsConnected(false);
      setIsConnecting(false);
      setError((prev) => prev ?? "MQTT connection closed");
    });

    mockTimeoutRef.current = setTimeout(() => {
      if (!hasReceivedMessage) {
        setIsConnected(false);
        setIsConnecting(false);
        setError("No data received from broker");
      }
    }, 3000);

    return () => {
      client.end();
      clientRef.current = null;
      if (mockTimeoutRef.current) clearTimeout(mockTimeoutRef.current);
    };
  }, [active]);

  const reconnect = useCallback(() => {
    setIsConnecting(true);
    setIsConnected(false);
    setError(null);
    setConnectionSeq((prev) => prev + 1);
  }, []);

  return {
    drones,
    telemetry,
    alerts,
    stats,
    isConnected,
    isConnecting,
    error,
    connectionSeq,
    reconnect,
  };
}

type DroneDataContextType = ReturnType<typeof useDroneData>;

const DroneDataContext = React.createContext<DroneDataContextType | null>(null);

export function DroneProvider({
  children,
  active,
}: {
  children: React.ReactNode;
  active: boolean;
}) {
  const value = useDroneData(active);
  return (
    <DroneDataContext.Provider value={value}>
      {children}
    </DroneDataContext.Provider>
  );
}

export function useDroneDataContext() {
  const context = React.useContext(DroneDataContext);
  if (!context) {
    throw new Error("useDroneDataContext must be used within a DroneProvider");
  }
  return context;
}
