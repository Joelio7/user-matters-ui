import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';

import { MatterFormData } from '../types/matter';
import { createCustomerMatter, createMatter, deleteMatter, fetchCustomerMatters, fetchMatters, setSelectedMatter, updateMatter } from '../store/slices/mattersSlice';

export const useMatters = () => {
  const dispatch = useDispatch<AppDispatch>();
  const matters = useSelector((state: RootState) => state.matters);

  const getAllMatters = async () => {
    return dispatch(fetchMatters());
  };

  const getCustomerMatters = async (customerId: number) => {
    return dispatch(fetchCustomerMatters(customerId));
  };

  const addMatter = async (matterData: MatterFormData) => {
    return dispatch(createMatter(matterData));
  };

  const addCustomerMatter = async (customerId: number, data: MatterFormData) => {
    return dispatch(createCustomerMatter({ customerId, data }));
  };

  const editMatter = async (id: number, data: Partial<MatterFormData>) => {
    return dispatch(updateMatter({ id, data }));
  };

  const removeMatter = async (id: number) => {
    return dispatch(deleteMatter(id));
  };

  const selectMatter = (matter: any) => {
    dispatch(setSelectedMatter(matter));
  };

  return {
    matters,
    getAllMatters,
    getCustomerMatters,
    addMatter,
    addCustomerMatter,
    editMatter,
    removeMatter,
    selectMatter,
  };
};