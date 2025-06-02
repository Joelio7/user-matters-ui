import React from "react";
import { useAuth } from "../hooks/useAuth";

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">
        Welcome to Dashboard, {user?.name}!
      </h1>
      <p className="text-gray-600">
        Role: {user?.role} | Email: {user?.email}
      </p>
    </div>
  );
};

export default DashboardPage;
