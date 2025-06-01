export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: "customer" | "admin";
  created_at: string;
  matters_count: number;
  pending_matters_count: number;
  in_progress_matters_count: number;
  completed_matters_count: number;
  firm_name?: string;
}
