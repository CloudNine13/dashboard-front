"use client";

import { useDroneDataContext } from "@/hooks/use-drone-data";
import ConnectionLoadingScreen from "@/components/ui/connection-loading-screen";

export default function MqttLoadingScreen() {
  const { isConnecting, isConnected, error, connectionSeq } = useDroneDataContext();

  return (
    <ConnectionLoadingScreen
      isConnecting={isConnecting}
      isConnected={isConnected}
      error={!!error}
      connectionSeq={connectionSeq}
      connectingDescription="Establishing secure real-time MQTT connection to the drones data feed..."
    />
  );
}
