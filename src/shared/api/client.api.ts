import { API_ERRORS, API_SUCCESS, ENDPOINTS_URLS } from "./constants";
import { toast } from "sonner";

interface ApiError {
  status: number;
  statusText: string;
  message: string;
  error?: string;
  detail?: string;
}

interface ApiResponse {
  message?: string;
  error?: string;
  detail?: string;
  [key: string]: unknown;
}

const ApiClient = {
  async request<T>(endpoint: string, token: string, options: RequestInit = {}): Promise<T> {
    if (!token) {
      throw new Error('No token provided');
    }

    const OPTIONS: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
        ...options.headers,
      },
      ...options,
    };

    const url = `${ENDPOINTS_URLS.API_BASE_URL}${endpoint}`;

    const response = await fetch(url, OPTIONS);
    const responseText = await response.text();
    
    let data: ApiResponse = {};

    try {
      data = responseText ? JSON.parse(responseText) : {};
    } catch {
      data = { message: responseText };
    }

    if (!response.ok || response.status === 404) {
      const errorMessage = data.message || data.error || data.detail || responseText || response.statusText;
      throw {
        status: response.status,
        statusText: response.statusText,
        message: errorMessage,
        ...data,
      };
    }

    return data as T;
  },

  get<T>(endpoint: string, token: string): Promise<T> {
      return this.request<T>(endpoint, token, { method: "GET" }).then((response) => {
        return response;
      }).catch((error) => {
        const errorMessage = (error as ApiError).message || API_ERRORS.GET_ERROR;
        toast.error(errorMessage);
        throw error;
      });
  },

  post<T>(endpoint: string, token: string, data: T): Promise<T> {
    return this.request<T>(endpoint, token, {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => {
        toast.success(API_SUCCESS.CREATE_SUCCESS);
        return response;
      })
      .catch((error) => {
        const errorMessage = (error as ApiError).message || API_ERRORS.CREATE_ERROR;
        toast.error(errorMessage);
        throw error;
      });
  },

  put<T>(endpoint: string, token: string, data: T): Promise<T> {
    return this.request<T>(endpoint, token, {
      method: "PUT",
      body: JSON.stringify(data),
    })
      .then((response) => {
        toast.success(API_SUCCESS.UPDATE_SUCCESS);
        return response;
      })
      .catch((error) => {
        const errorMessage = (error as ApiError).message || API_ERRORS.UPDATE_ERROR;
        toast.error(errorMessage);
        throw error;
      });
  },

  patch<T>(endpoint: string, token: string, data: T): Promise<T> {
    return this.request<T>(endpoint, token, {
      method: "PATCH",
      body: JSON.stringify(data),
    })
      .then((response) => {
        toast.success(API_SUCCESS.UPDATE_SUCCESS);
        return response;
      })
      .catch((error) => {
        const errorMessage = (error as ApiError).message || API_ERRORS.UPDATE_ERROR;
        toast.error(errorMessage);
        throw error;
      });
  },

  delete<T>(endpoint: string, token: string): Promise<T> {
    return this.request<T>(endpoint, token, { 
      method: "DELETE",
    })
      .then((response) => {
        toast.success(API_SUCCESS.DELETE_SUCCESS);
        return response;
      })
      .catch((error) => {
        const errorMessage = (error as ApiError).message || API_ERRORS.DELETE_ERROR;
        toast.error(errorMessage);
        throw error;
      });
  },
};

export default ApiClient;
