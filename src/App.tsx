import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { useAuth } from "./hooks/useAuth";
import { ROUTES } from "./utils/constants";

// Components
import Layout from "./components/common/Layout";


import ProtectedRoute from "./components/auth/ProtectedRoute";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

const AppContent: React.FC = () => {
  const { isAuthenticated, fetchProfile, token } = useAuth();

  useEffect(() => {
    if (token && isAuthenticated) {
      fetchProfile();
    }
  }, [token, isAuthenticated, fetchProfile]);

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
        </Route>
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
