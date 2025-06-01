import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { ApiError } from "../../types/api";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

class ApiClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 10000,
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.instance.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          this.clearToken();
          window.location.href = "/login";
        }
        return Promise.reject(this.formatError(error));
      }
    );
  }

  private formatError(error: any): ApiError {
    if (error.response?.data) {
      return {
        message: error.response.data.message || "An error occurred",
        errors: error.response.data.errors,
      };
    }
    return {
      message: error.message || "Network error occurred",
    };
  }

  public setToken(token: string) {
    localStorage.setItem("auth_token", token);
  }

  public getToken(): string | null {
    return localStorage.getItem("auth_token");
  }

  public clearToken() {
    localStorage.removeItem("auth_token");
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.get(url, config);
    return response.data;
  }

  public async post<T, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.post(
      url,
      data,
      config
    );
    return response.data;
  }

  public async put<T, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.put(
      url,
      data,
      config
    );
    return response.data;
  }

  public async patch<T, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.patch(
      url,
      data,
      config
    );
    return response.data;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.delete(url, config);
    return response.data;
  }
}

export const apiClient = new ApiClient();



// src/store/api/customersApi.ts
import { apiClient } from "./apiClient";
import { Customer, CustomerFormData } from "../../types/customer";

export const customersApi = {
  getAll: async (): Promise<Customer[]> => {
    return apiClient.get<Customer[]>("/customers");
  },

  getById: async (id: number): Promise<Customer> => {
    return apiClient.get<Customer>(`/customers/${id}`);
  },

  create: async (customerData: CustomerFormData): Promise<Customer> => {
    return apiClient.post<Customer>("/customers", customerData);
  },

  update: async (
    id: number,
    customerData: Partial<CustomerFormData>
  ): Promise<Customer> => {
    return apiClient.put<Customer>(`/customers/${id}`, customerData);
  },

  delete: async (id: number): Promise<void> => {
    return apiClient.delete<void>(`/customers/${id}`);
  },
};

// src/store/api/mattersApi.ts
import { apiClient } from "./apiClient";
import { Matter, MatterFormData } from "../../types/matter";

export const mattersApi = {
  getAll: async (): Promise<Matter[]> => {
    return apiClient.get<Matter[]>("/matters");
  },

  getById: async (id: number): Promise<Matter> => {
    return apiClient.get<Matter>(`/matters/${id}`);
  },

  getCustomerMatters: async (customerId: number): Promise<Matter[]> => {
    return apiClient.get<Matter[]>(`/customers/${customerId}/matters`);
  },

  create: async (matterData: MatterFormData): Promise<Matter> => {
    return apiClient.post<Matter>("/matters", matterData);
  },

  createForCustomer: async (
    customerId: number,
    matterData: MatterFormData
  ): Promise<Matter> => {
    return apiClient.post<Matter>(
      `/customers/${customerId}/matters`,
      matterData
    );
  },

  update: async (
    id: number,
    matterData: Partial<MatterFormData>
  ): Promise<Matter> => {
    return apiClient.put<Matter>(`/matters/${id}`, matterData);
  },

  updateCustomerMatter: async (
    customerId: number,
    id: number,
    matterData: Partial<MatterFormData>
  ): Promise<Matter> => {
    return apiClient.put<Matter>(
      `/customers/${customerId}/matters/${id}`,
      matterData
    );
  },

  delete: async (id: number): Promise<void> => {
    return apiClient.delete<void>(`/matters/${id}`);
  },

  deleteCustomerMatter: async (
    customerId: number,
    id: number
  ): Promise<void> => {
    return apiClient.delete<void>(`/customers/${customerId}/matters/${id}`);
  },
};
