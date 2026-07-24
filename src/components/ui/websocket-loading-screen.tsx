"use client";

import { useDashboard } from "@/hooks/use-dashboard-data";
import ConnectionLoadingScreen from "@/components/ui/connection-loading-screen";

export default function WebSocketLoadingScreen() {
  const { isConnecting, isConnected, error, connectionSeq } = useDashboard();

  return (
    <ConnectionLoadingScreen
      isConnecting={isConnecting}
      isConnected={isConnected}
      error={!!error}
      connectionSeq={connectionSeq}
      connectingDescription="Establishing secure real-time WebSocket connection to the dashboard data feed..."
    />
  );
}
