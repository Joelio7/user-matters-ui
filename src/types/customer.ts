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
  password?: string;
}