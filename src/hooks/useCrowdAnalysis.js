import { useState, useEffect, useCallback } from 'react';
import { fetchAIInsights } from '../services/aiService';
import { AI_CONFIG } from '../config/constants';

/**
 * Custom hook for managing stadium crowd simulation and AI analysis.
 * @returns {Object} - { status, currentInsight, geminiInsight, isGeminiLoading }
 */
export const useCrowdAnalysis = () => {
  const [status, setStatus] = useState({
    gate1: 'low',
    gate2: 'medium',
    gate3: 'low',
    gate4: 'low',
    food: 'medium'
  });
  
  const [currentInsight, setCurrentInsight] = useState(AI_CONFIG.INSIGHT_TEMPLATES[0]);
  const [geminiInsight, setGeminiInsight] = useState(null);
  const [isGeminiLoading, setIsGeminiLoading] = useState(false);

  // Gemini AI polling service call
  const refreshAIInsights = useCallback(async (currentStatus) => {
    setIsGeminiLoading(true);
    try {
      const insight = await fetchAIInsights(currentStatus);
      if (insight) {
        setGeminiInsight(insight);
      }
    } catch (err) {
      console.error("useCrowdAnalysis: Gemini refresh failed", err);
    } finally {
      setIsGeminiLoading(false);
    }
  }, []);

  // Main simulation heartbeat
  useEffect(() => {
    const simulationInterval = setInterval(() => {
      const newStatus = {
        gate1: Math.random() > 0.7 ? 'medium' : 'low',
        gate2: Math.random() > 0.6 ? 'high' : 'medium',
        gate3: Math.random() > 0.8 ? 'medium' : 'low',
        gate4: 'low',
        food: Math.random() > 0.4 ? 'high' : 'medium'
      };
      setStatus(newStatus);
      
      const newInsightIdx = Math.floor(Math.random() * AI_CONFIG.INSIGHT_TEMPLATES.length);
      setCurrentInsight(AI_CONFIG.INSIGHT_TEMPLATES[newInsightIdx]);
    }, AI_CONFIG.SIMULATION_INTERVAL);

    const geminiTimer = setInterval(() => {
      refreshAIInsights(status);
    }, AI_CONFIG.GEMINI_POLLING_INTERVAL);

    return () => {
      clearInterval(simulationInterval);
      clearInterval(geminiTimer);
    };
  }, [status, refreshAIInsights]);

  return { status, currentInsight, geminiInsight, isGeminiLoading };
};
