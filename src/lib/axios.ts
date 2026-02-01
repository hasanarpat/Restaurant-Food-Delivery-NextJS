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

      const errorMessage =
        data?.error?.message || error.message || 'An unexpected error occurred';
      const errorCode = data?.error?.code || 'UNKNOWN_ERROR';

      console.error(`[API Error] ${status} - ${errorCode}: ${errorMessage}`);

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
      return Promise.reject({
        message:
          'No response from server. Please check your internet connection.',
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
