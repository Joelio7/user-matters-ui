import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import {
  fetchCustomers,
  fetchCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  setSelectedCustomer,
} from "../store/slices/customersSlice";
import { CustomerFormData } from "../types/customer";

export const useCustomers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const customers = useSelector((state: RootState) => state.customers);

  const getAllCustomers = async () => {
    return dispatch(fetchCustomers());
  };

  const getCustomerById = async (id: number) => {
    return dispatch(fetchCustomerById(id));
  };

  const addCustomer = async (customerData: CustomerFormData) => {
    return dispatch(createCustomer(customerData));
  };

  const editCustomer = async (id: number, data: Partial<CustomerFormData>) => {
    return dispatch(updateCustomer({ id, data }));
  };

  const removeCustomer = async (id: number) => {
    return dispatch(deleteCustomer(id));
  };

  const selectCustomer = (customer: any) => {
    dispatch(setSelectedCustomer(customer));
  };

  return {
    ...customers,
    getAllCustomers,
    getCustomerById,
    addCustomer,
    editCustomer,
    removeCustomer,
    selectCustomer,
  };
};
