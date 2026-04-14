import { useState, useCallback, useEffect } from 'react';

/**
 * Custom hook for managing a stack of notifications/alerts.
 * @param {number} maxAlerts - Maximum number of alerts to show at once.
 * @param {number} dismissTimeout - Time in ms before an alert is auto-dismissed.
 * @returns {Object} - { alerts, pushNotification }
 */
export const useNotifications = (maxAlerts = 5, dismissTimeout = 6000) => {
  const [alerts, setAlerts] = useState([
    { 
      id: 1, 
      text: "AI Assistant Online. We're monitoring real-time flow.", 
      type: "success", 
      time: "Just now" 
    }
  ]);

  const pushNotification = useCallback((text, type = "info") => {
    const id = Date.now();
    const time = new Date().toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });

    setAlerts(prev => [
      { id, text, type, time },
      ...prev
    ].slice(0, maxAlerts));
  }, [maxAlerts]);

  // Handle auto-dismiss cleanup
  useEffect(() => {
    const cleanupTimer = setInterval(() => {
      setAlerts(prev => prev.filter(alert => (Date.now() - alert.id) < dismissTimeout));
    }, 1000);

    return () => clearInterval(cleanupTimer);
  }, [dismissTimeout]);

  return { alerts, pushNotification };
};
