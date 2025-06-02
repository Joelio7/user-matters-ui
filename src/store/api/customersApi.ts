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
