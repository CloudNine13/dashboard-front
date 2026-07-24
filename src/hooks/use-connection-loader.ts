import { useEffect, useState, useRef } from "react";

export default function useConnectionLoader(
  isConnecting: boolean,
  isConnected: boolean,
  error: boolean,
  connectionSeq: number
) {
  const [isVisible, setIsVisible] = useState(isConnecting);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isOfflineAlertOpen, setIsOfflineAlertOpen] = useState(false);

  const startTimeRef = useRef<number | null>(null);
  const lastSeqRef = useRef<number>(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fadeOutTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const isNewAttempt = connectionSeq > lastSeqRef.current;

    if (isNewAttempt) {
      lastSeqRef.current = connectionSeq;
    }

    if (isConnecting || isNewAttempt) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      if (fadeOutTimeoutRef.current) {
        clearTimeout(fadeOutTimeoutRef.current);
      }

      startTimeRef.current = Date.now();
      setIsVisible(true);
      setIsFadingOut(false);
      setIsOfflineAlertOpen(false);
    } else if (isConnected && startTimeRef.current !== null) {
      const elapsed = Date.now() - startTimeRef.current;
      const remainingTime = Math.max(0, 1250 - elapsed);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setIsFadingOut(true);

        if (fadeOutTimeoutRef.current) {
          clearTimeout(fadeOutTimeoutRef.current);
        }

        fadeOutTimeoutRef.current = setTimeout(() => {
          setIsVisible(false);
          startTimeRef.current = null;
        }, 2000);
      }, remainingTime);
    } else if (error && startTimeRef.current !== null) {
      setIsOfflineAlertOpen(true);
    }
  }, [isConnecting, isConnected, error, connectionSeq]);

  const handleDismissOffline = () => {
    setIsFadingOut(true);

    if (fadeOutTimeoutRef.current) {
      clearTimeout(fadeOutTimeoutRef.current);
    }

    fadeOutTimeoutRef.current = setTimeout(() => {
      setIsVisible(false);
      setIsOfflineAlertOpen(false);
      startTimeRef.current = null;
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      if (fadeOutTimeoutRef.current) {
        clearTimeout(fadeOutTimeoutRef.current);
      }
    };
  }, []);

  return {
    isVisible,
    isFadingOut,
    isOfflineAlertOpen,
    handleDismissOffline,
  };
}
