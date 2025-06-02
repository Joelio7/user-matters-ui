import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Customer, CustomerFormData } from "../../types/customer";
import { customersApi } from "../api/customersApi";

interface CustomersState {
  customers: Customer[];
  selectedCustomer: Customer | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CustomersState = {
  customers: [],
  selectedCustomer: null,
  isLoading: false,
  error: null,
};

export const fetchCustomers = createAsyncThunk(
  "customers/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await customersApi.getAll();
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch customers");
    }
  }
);

export const fetchCustomerById = createAsyncThunk(
  "customers/fetchById",
  async (id: number, { rejectWithValue }) => {
    try {
      return await customersApi.getById(id);
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch customer");
    }
  }
);

export const createCustomer = createAsyncThunk(
  "customers/create",
  async (customerData: CustomerFormData, { rejectWithValue }) => {
    try {
      return await customersApi.create(customerData);
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to create customer");
    }
  }
);

export const updateCustomer = createAsyncThunk(
  "customers/update",
  async (
    { id, data }: { id: number; data: Partial<CustomerFormData> },
    { rejectWithValue }
  ) => {
    try {
      return await customersApi.update(id, data);
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to update customer");
    }
  }
);

export const deleteCustomer = createAsyncThunk(
  "customers/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      await customersApi.delete(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to delete customer");
    }
  }
);

const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSelectedCustomer: (state, action) => {
      state.selectedCustomer = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.customers = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCustomerById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCustomerById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedCustomer = action.payload;
      })
      .addCase(fetchCustomerById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createCustomer.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.customers.push(action.payload);
      })
      .addCase(createCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateCustomer.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedCustomer = action.payload;

        const index = state.customers.findIndex(
          (c) => c.id === updatedCustomer.id
        );
        if (index !== -1) {
          state.customers[index] = updatedCustomer;
        }

        if (state.selectedCustomer?.id === updatedCustomer.id) {
          state.selectedCustomer = updatedCustomer;
        }
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteCustomer.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.customers = state.customers.filter(
          (c) => c.id !== action.payload
        );
        if (state.selectedCustomer?.id === action.payload) {
          state.selectedCustomer = null;
        }
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setSelectedCustomer } = customersSlice.actions;
export default customersSlice.reducer;
