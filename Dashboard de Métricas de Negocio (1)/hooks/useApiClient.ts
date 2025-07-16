import { useState, useEffect, useCallback } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-34a574a2`;

interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
}

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
}

export function useApiClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiCall = useCallback(async (
    endpoint: string, 
    options: ApiOptions = {}
  ): Promise<ApiResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const { method = 'GET', body, headers = {} } = options;
      
      const config: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
          ...headers,
        },
      };

      if (body && method !== 'GET') {
        config.body = JSON.stringify(body);
      }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
      
      if (!response.ok) {
        throw new Error(`API call failed: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'API call failed');
      }

      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('API call error:', errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    apiCall,
    isLoading,
    error,
    clearError: () => setError(null)
  };
}

// Hook específico para métricas CLTV
export function useCLTVMetrics() {
  const { apiCall, isLoading, error } = useApiClient();
  const [cltvData, setCLTVData] = useState(null);

  const fetchCLTVMetrics = useCallback(async () => {
    const result = await apiCall('/metrics/cltv');
    if (result.success) {
      setCLTVData(result.data);
    }
    return result;
  }, [apiCall]);

  useEffect(() => {
    fetchCLTVMetrics();
  }, [fetchCLTVMetrics]);

  return {
    cltvData,
    isLoading,
    error,
    refetch: fetchCLTVMetrics
  };
}

// Hook específico para análisis de recurrencia
export function useRecurrenceMetrics() {
  const { apiCall, isLoading, error } = useApiClient();
  const [recurrenceData, setRecurrenceData] = useState(null);

  const fetchRecurrenceMetrics = useCallback(async () => {
    const result = await apiCall('/metrics/recurrence');
    if (result.success) {
      setRecurrenceData(result.data);
    }
    return result;
  }, [apiCall]);

  useEffect(() => {
    fetchRecurrenceMetrics();
  }, [fetchRecurrenceMetrics]);

  return {
    recurrenceData,
    isLoading,
    error,
    refetch: fetchRecurrenceMetrics
  };
}

// Hook específico para análisis RFM
export function useRFMAnalysis() {
  const { apiCall, isLoading, error } = useApiClient();
  const [rfmData, setRFMData] = useState(null);

  const fetchRFMAnalysis = useCallback(async () => {
    const result = await apiCall('/metrics/rfm');
    if (result.success) {
      setRFMData(result.data);
    }
    return result;
  }, [apiCall]);

  useEffect(() => {
    fetchRFMAnalysis();
  }, [fetchRFMAnalysis]);

  return {
    rfmData,
    isLoading,
    error,
    refetch: fetchRFMAnalysis
  };
}

// Hook específico para campañas
export function useCampaigns() {
  const { apiCall, isLoading, error } = useApiClient();
  const [campaignsData, setCampaignsData] = useState(null);

  const fetchCampaigns = useCallback(async () => {
    const result = await apiCall('/campaigns');
    if (result.success) {
      setCampaignsData(result.data);
    }
    return result;
  }, [apiCall]);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  return {
    campaignsData,
    isLoading,
    error,
    refetch: fetchCampaigns
  };
}

// Hook específico para notificaciones
export function useNotifications() {
  const { apiCall, isLoading, error } = useApiClient();
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = useCallback(async () => {
    const result = await apiCall('/notifications');
    if (result.success) {
      setNotifications(result.data);
    }
    return result;
  }, [apiCall]);

  const markAsRead = useCallback(async (id: string) => {
    const result = await apiCall(`/notifications/${id}/read`, { method: 'PATCH' });
    if (result.success) {
      setNotifications(prev => 
        prev.map(n => n.id === id ? { ...n, read: true } : n)
      );
    }
    return result;
  }, [apiCall]);

  const createNotification = useCallback(async (notification: any) => {
    const result = await apiCall('/notifications', {
      method: 'POST',
      body: notification
    });
    if (result.success) {
      setNotifications(prev => [result.data, ...prev]);
    }
    return result;
  }, [apiCall]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return {
    notifications,
    isLoading,
    error,
    refetch: fetchNotifications,
    markAsRead,
    createNotification
  };
}

// Hook específico para el reporte
export function useReportData() {
  const { apiCall, isLoading, error } = useApiClient();
  const [reportNotes, setReportNotes] = useState([]);
  const [actionItems, setActionItems] = useState([]);

  const fetchReportNotes = useCallback(async () => {
    const result = await apiCall('/report/notes');
    if (result.success) {
      setReportNotes(result.data);
    }
    return result;
  }, [apiCall]);

  const fetchActionItems = useCallback(async () => {
    const result = await apiCall('/report/actions');
    if (result.success) {
      setActionItems(result.data);
    }
    return result;
  }, [apiCall]);

  const addReportNote = useCallback(async (note: any) => {
    const result = await apiCall('/report/notes', {
      method: 'POST',
      body: note
    });
    if (result.success) {
      setReportNotes(prev => [result.data, ...prev]);
    }
    return result;
  }, [apiCall]);

  const addActionItem = useCallback(async (action: any) => {
    const result = await apiCall('/report/actions', {
      method: 'POST',
      body: action
    });
    if (result.success) {
      setActionItems(prev => [result.data, ...prev]);
    }
    return result;
  }, [apiCall]);

  const exportReport = useCallback(async (options: any) => {
    const result = await apiCall('/export/report', {
      method: 'POST',
      body: options
    });
    return result;
  }, [apiCall]);

  useEffect(() => {
    fetchReportNotes();
    fetchActionItems();
  }, [fetchReportNotes, fetchActionItems]);

  return {
    reportNotes,
    actionItems,
    isLoading,
    error,
    addReportNote,
    addActionItem,
    exportReport,
    refetch: () => {
      fetchReportNotes();
      fetchActionItems();
    }
  };
}