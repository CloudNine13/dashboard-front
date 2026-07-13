import { Loader2, WifiOff } from "lucide-react";
import { useDashboard } from "@/hooks/use-dashboard-data";
import useWebSocketLoader from "@/hooks/use-websocket-loader";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function WebSocketLoadingScreen() {
  const { isConnecting, isConnected, error, connectionSeq } = useDashboard();

  const { isVisible, isFadingOut, isOfflineAlertOpen, handleDismissOffline } =
    useWebSocketLoader(isConnecting, isConnected, !!error, connectionSeq);

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <style>{`
        @keyframes loaderFadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        .animate-loader-out {
          animation: loaderFadeOut 0.65s forwards ease-in-out;
        }
      `}</style>

      <div
        className={cn(
          "fixed inset-0 z-50 flex items-center justify-center",
          "bg-background/60 backdrop-blur-md",
          isFadingOut
            ? "animate-loader-out pointer-events-none"
            : "pointer-events-auto",
        )}
      >
        <div
          className={cn(
            "flex flex-col items-center justify-center p-8 text-center",
            "max-w-md mx-auto rounded-2xl border border-border/50 bg-card/85",
            "shadow-2xl backdrop-blur-xl transition-all duration-[2000ms]",
            "ease-in-out",
          )}
        >
          <div className="flex flex-col items-center gap-6">
            {isOfflineAlertOpen ? (
              <div className="relative flex items-center justify-center size-20">
                <div
                  className={cn(
                    "absolute inset-0 rounded-full bg-destructive/10",
                    "animate-pulse",
                  )}
                />
                <div
                  className={cn(
                    "relative flex items-center justify-center size-10",
                    "rounded-full bg-destructive/5 border border-destructive/20",
                  )}
                >
                  <WifiOff className="size-5 text-destructive" />
                </div>
              </div>
            ) : (
              <div className="relative flex items-center justify-center size-20">
                <div
                  className={cn(
                    "absolute inset-0 rounded-full bg-primary/10",
                    "animate-ping",
                  )}
                />
                <div
                  className={cn(
                    "absolute inset-2 rounded-full border-2",
                    "border-primary/20",
                  )}
                />
                <div
                  className={cn(
                    "absolute inset-2 rounded-full border-t-2 border-primary",
                    "animate-spin",
                  )}
                  style={{ animationDuration: "1s" }}
                />
                <div
                  className={cn(
                    "relative flex items-center justify-center size-10",
                    "rounded-full bg-primary/5 border border-primary/20",
                  )}
                >
                  <Loader2
                    className="size-5 text-primary animate-spin"
                    style={{ animationDuration: "2s" }}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <h2 className="text-lg font-semibold tracking-tight text-foreground">
                {isOfflineAlertOpen
                  ? "Connection Offline"
                  : "Connecting to Network"}
              </h2>
              <p className="text-xs text-muted-foreground max-w-[280px]">
                {isOfflineAlertOpen
                  ? "The dashboard is currently offline. You will view the last used data feed."
                  : "Establishing secure real-time WebSocket connection to the dashboard data feed..."}
              </p>
            </div>

            {isOfflineAlertOpen && (
              <Button onClick={handleDismissOffline} className="w-full mt-2">
                OK
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
