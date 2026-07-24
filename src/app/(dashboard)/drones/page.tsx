"use client";

import { useDroneDataContext } from "@/hooks/use-drone-data";
import {
  DroneTelemetryChart,
  DroneFleetChart,
  DroneMissionChart,
  DroneAlertsPie,
} from "@/components/drones";

export default function DronesPage() {
  const { drones, telemetry, alerts, stats } = useDroneDataContext();

  return (
    <div className="flex flex-col gap-4">
      <DroneTelemetryChart telemetry={telemetry} />
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <DroneFleetChart drones={drones} />
        <DroneMissionChart stats={stats} telemetry={telemetry} />
        <DroneAlertsPie alerts={alerts} />
      </div>
    </div>
  );
}
