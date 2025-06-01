import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { loginUser, signupUser, logout, getProfile, updateProfile } from '../store/slices/authSlice';
import { LoginCredentials, SignupData, User } from '../types/auth';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);

  const login = async (credentials: LoginCredentials) => {
    return dispatch(loginUser(credentials));
  };

  const signup = async (userData: SignupData) => {
    return dispatch(signupUser(userData));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const fetchProfile = async () => {
    return dispatch(getProfile());
  };

  const updateUserProfile = async (userData: Partial<User>) => {
    return dispatch(updateProfile(userData));
  };

  return {
    ...auth,
    login,
    signup,
    logout: handleLogout,
    fetchProfile,
    updateProfile: updateUserProfile,
  };
};