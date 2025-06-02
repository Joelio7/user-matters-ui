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
