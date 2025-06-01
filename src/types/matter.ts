import { User } from "./user";

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