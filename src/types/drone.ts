export type DroneInfo = {
  id: string;
  name: string;
  battery: number;
  altitude: number;
  speed: number;
  missionsCompleted: number;
};

export type DroneTelemetryPoint = {
  timestamp: string;
  droneId: string;
  altitude: number;
  speed: number;
  battery: number;
};

export type AlertSeverity = "info" | "warning" | "critical";

export type AlertType =
  | "low_battery"
  | "connection_lost"
  | "mission_complete"
  | "destination_reached"
  | "maintenance";

export type DroneAlert = {
  id: string;
  droneId: string;
  type: AlertType;
  severity: AlertSeverity;
  message: string;
  timestamp: string;
};

export type DroneMissionStats = {
  totalFlightHours: number;
  totalDistanceKm: number;
  areaCoveredKm2: number;
  activeDrones: number;
};

export type DroneMqttMessage = {
  drones: DroneInfo[];
  telemetry: DroneTelemetryPoint[];
  alerts: DroneAlert[];
  stats: DroneMissionStats;
  timestamp: string;
};
