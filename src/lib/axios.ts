import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

// Define standard API response structure
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code: string;
    details?: any;
  };
}

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
  withCredentials: true, // Critical for HttpOnly Cookies
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError<ApiResponse>) => {
    if (error.response) {
      // Server responded with a status code outside 2xx range
      const { data, status } = error.response;

      const errorCode = data?.error?.code || 'UNKNOWN_ERROR';
      const errorMessage =
        data?.error?.message || error.message || 'An unexpected error occurred';

      // Only log errors that are not 401 Unauthorized
      if (status !== 401) {
        console.error(`[API Error] ${status} - ${errorCode}: ${errorMessage}`);

        // Dispatch global event for UI notification
        if (typeof window !== 'undefined') {
          window.dispatchEvent(
            new CustomEvent('api-error', {
              detail: {
                message: errorMessage,
                type: 'error',
              },
            }),
          );
        }
      }

      // We can reject with a structured object for easier UI handling
      return Promise.reject({
        message: errorMessage,
        code: errorCode,
        status,
        details: data?.error?.details,
      });
    } else if (error.request) {
      // Request was made but no response received
      console.error('[API Error] No response received', error.request);

      const netErrorMsg =
        'No response from server. Please check your internet connection.';

      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('api-error', {
            detail: {
              message: netErrorMsg,
              type: 'error',
            },
          }),
        );
      }

      return Promise.reject({
        message: netErrorMsg,
        code: 'NETWORK_ERROR',
        status: 0,
      });
    } else {
      // Something happened in setting up the request
      console.error('[API Error] Request setup failed', error.message);
      return Promise.reject({
        message: error.message,
        code: 'REQUEST_SETUP_ERROR',
        status: 0,
      });
    }
  },
);

export default apiClient;
