export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
  created_at: string;
  matters_count: number;
  pending_matters_count: number;
  in_progress_matters_count: number;
  completed_matters_count: number;
  firm_name?: string;
}

// src/types/customer.ts
export interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
  created_at: string;
  updated_at: string;
  matters_count: number;
  pending_matters_count: number;
  in_progress_matters_count: number;
  completed_matters_count: number;
}

export interface CustomerFormData {
  name: string;
  phone: string;
  email: string;
  password?: string; // Optional for updates
}

// src/types/matter.ts
export type MatterState = 'new' | 'in_progress' | 'completed';

export interface Matter {
  id: number;
  title: string;
  description?: string;
  state: MatterState;
  due_date?: string;
  created_at: string;
  updated_at: string;
  user_id: number;
  user?: User;
}

export interface MatterFormData {
  title: string;
  description?: string;
  state: MatterState;
  due_date?: string;
}

// src/types/api.ts
export interface ApiError {
  message: string;
  errors?: string[];
}

export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    total_pages: number;
    total_count: number;
  };
}