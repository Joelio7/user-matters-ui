import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Matter, MatterFormData } from "../../types/matter";
import { mattersApi } from "../api/mattersApi";

interface MattersState {
  matters: Matter[];
  customerMatters: Matter[];
  selectedMatter: Matter | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: MattersState = {
  matters: [],
  customerMatters: [],
  selectedMatter: null,
  isLoading: false,
  error: null,
};

export const fetchMatters = createAsyncThunk(
  "matters/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await mattersApi.getAll();
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch matters");
    }
  }
);

export const fetchCustomerMatters = createAsyncThunk(
  "matters/fetchCustomerMatters",
  async (customerId: number, { rejectWithValue }) => {
    try {
      return await mattersApi.getCustomerMatters(customerId);
    } catch (error: any) {
      return rejectWithValue(
        error.message || "Failed to fetch customer matters"
      );
    }
  }
);

export const createMatter = createAsyncThunk(
  "matters/create",
  async (matterData: MatterFormData, { rejectWithValue }) => {
    try {
      return await mattersApi.create(matterData);
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to create matter");
    }
  }
);

export const createCustomerMatter = createAsyncThunk(
  "matters/createForCustomer",
  async (
    { customerId, data }: { customerId: number; data: MatterFormData },
    { rejectWithValue }
  ) => {
    try {
      return await mattersApi.createForCustomer(customerId, data);
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to create matter");
    }
  }
);

export const updateMatter = createAsyncThunk(
  "matters/update",
  async (
    { id, data }: { id: number; data: Partial<MatterFormData> },
    { rejectWithValue }
  ) => {
    try {
      return await mattersApi.update(id, data);
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to update matter");
    }
  }
);

export const deleteMatter = createAsyncThunk(
  "matters/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      await mattersApi.delete(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to delete matter");
    }
  }
);

export const deleteCustomerMatter = createAsyncThunk(
  "matters/deleteCustomerMatter",
  async (
    { customerId, id }: { customerId: number; id: number },
    { rejectWithValue }
  ) => {
    try {
      await mattersApi.deleteCustomerMatter(customerId, id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to delete matter");
    }
  }
);

const mattersSlice = createSlice({
  name: "matters",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSelectedMatter: (state, action) => {
      state.selectedMatter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMatters.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMatters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.matters = action.payload;
      })
      .addCase(fetchMatters.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCustomerMatters.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCustomerMatters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.customerMatters = action.payload;
      })
      .addCase(fetchCustomerMatters.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createMatter.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createMatter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.matters.push(action.payload);
      })
      .addCase(createMatter.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createCustomerMatter.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createCustomerMatter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.customerMatters.push(action.payload);
        const existsInMatters = state.matters.find(
          (m) => m.id === action.payload.id
        );
        if (!existsInMatters) {
          state.matters.push(action.payload);
        }
      })
      .addCase(createCustomerMatter.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateMatter.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateMatter.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.matters.findIndex(
          (m) => m.id === action.payload.id
        );
        if (index !== -1) {
          state.matters[index] = action.payload;
        }
        const customerIndex = state.customerMatters.findIndex(
          (m) => m.id === action.payload.id
        );
        if (customerIndex !== -1) {
          state.customerMatters[customerIndex] = action.payload;
        }
        if (state.selectedMatter?.id === action.payload.id) {
          state.selectedMatter = action.payload;
        }
      })
      .addCase(updateMatter.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteMatter.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteMatter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.matters = state.matters.filter((m) => m.id !== action.payload);
        state.customerMatters = state.customerMatters.filter(
          (m) => m.id !== action.payload
        );
        if (state.selectedMatter?.id === action.payload) {
          state.selectedMatter = null;
        }
      })
      .addCase(deleteMatter.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteCustomerMatter.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCustomerMatter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.matters = state.matters.filter((m) => m.id !== action.payload);
        state.customerMatters = state.customerMatters.filter(
          (m) => m.id !== action.payload
        );
        if (state.selectedMatter?.id === action.payload) {
          state.selectedMatter = null;
        }
      })
      .addCase(deleteCustomerMatter.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setSelectedMatter } = mattersSlice.actions;
export default mattersSlice.reducer;
