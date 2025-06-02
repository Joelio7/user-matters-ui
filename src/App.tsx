import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import { store, AppDispatch } from "./store";
import { useAuth } from "./hooks/useAuth";
import { getProfile } from "./store/slices/authSlice";
import { ROUTES } from "./utils/constants";

import Layout from "./components/common/Layout";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import CustomersPage from "./pages/CustomersPage";
import MattersPage from "./pages/MattersPage";
import ProfilePage from "./pages/ProfilePage";

const AppContent: React.FC = () => {
  const { isAuthenticated, token } = useAuth();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (token && isAuthenticated) {
      dispatch(getProfile());
    }
  }, [token, isAuthenticated, dispatch]);

  return (
    <Router>
      <Routes>
        <Route
          path={ROUTES.LOGIN}
          element={
            isAuthenticated ? (
              <Navigate to={ROUTES.DASHBOARD} replace />
            ) : (
              <LoginPage />
            )
          }
        />
        <Route
          path={ROUTES.SIGNUP}
          element={
            isAuthenticated ? (
              <Navigate to={ROUTES.DASHBOARD} replace />
            ) : (
              <SignupPage />
            )
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to={ROUTES.DASHBOARD} replace />} />
          <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
          <Route path={ROUTES.CUSTOMERS} element={<CustomersPage />} />
          <Route path={ROUTES.MATTERS} element={<MattersPage />} />
          <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
        </Route>

        <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
      </Routes>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;
