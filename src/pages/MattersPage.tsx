import React, { useEffect, useState } from "react";
import { useMatters } from "../hooks/useMatters";
import { useAuth } from "../hooks/useAuth";
import { Matter } from "../types/matter";

import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorMessage from "../components/common/ErrorMessage";
import { Plus, FileText } from "lucide-react";
import MatterCard from "../components/dashboard/MatterCard";
import MatterForm from "../components/dashboard/MatterForm";

const MattersPage: React.FC = () => {
  const { matters, getAllMatters, isLoading, error, editMatter, removeMatter } =
    useMatters();
  const { user } = useAuth();
  const [showMatterForm, setShowMatterForm] = useState(false);
  const [editingMatter, setEditingMatter] = useState<Matter | null>(null);
  const [filterState, setFilterState] = useState<string>("all");

  useEffect(() => {
    getAllMatters();
  }, []);

  const handleMatterFormClose = () => {
    setShowMatterForm(false);
    setEditingMatter(null);
    getAllMatters();
  };

  const handleEditMatter = (matter: Matter) => {
    setEditingMatter(matter);
    setShowMatterForm(true);
  };

  const handleDeleteMatter = async (matter: Matter) => {
    try {
      await removeMatter(matter.id);
      getAllMatters();
    } catch (error) {
      console.error("Failed to delete matter:", error);
    }
  };

  const canDeleteMatter = (matter: Matter): boolean => {
    if (user?.role === "admin") {
      return true; 
    }
    return matter.user_id === user?.id; 
  };

  const canEditMatter = (matter: Matter): boolean => {
    if (user?.role === "admin") {
      return true;
    }
    return matter.user_id === user?.id; 
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const userMatters =
    user?.role === "admin"
      ? matters
      : matters.filter((m) => m.user_id === user?.id);
  const filteredMatters =
    filterState === "all"
      ? userMatters
      : userMatters.filter((m) => m.state === filterState);

  const matterStats = {
    total: userMatters.length,
    new: userMatters.filter((m) => m.state === "new").length,
    in_progress: userMatters.filter((m) => m.state === "in_progress").length,
    completed: userMatters.filter((m) => m.state === "completed").length,
  };

  return (
    <div className="space-y-6">
      {error && <ErrorMessage message={error} />}

      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <FileText className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {user?.role === "admin" ? "All Matters" : "My Matters"}
            </h1>
            <p className="text-sm text-gray-500">
              {filteredMatters.length} of {userMatters.length} matters
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowMatterForm(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Matter</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-50 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Total</p>
              <p className="text-2xl font-semibold text-gray-900">
                {matterStats.total}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-50 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">New</p>
              <p className="text-2xl font-semibold text-blue-600">
                {matterStats.new}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <FileText className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-semibold text-yellow-600">
                {matterStats.in_progress}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-50 rounded-lg">
              <FileText className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-semibold text-green-600">
                {matterStats.completed}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {[
              { key: "all", label: "All Matters", count: matterStats.total },
              { key: "new", label: "New", count: matterStats.new },
              {
                key: "in_progress",
                label: "In Progress",
                count: matterStats.in_progress,
              },
              {
                key: "completed",
                label: "Completed",
                count: matterStats.completed,
              },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilterState(tab.key)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  filterState === tab.key
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {filteredMatters.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-4">
                {filterState === "all"
                  ? "No matters yet"
                  : `No ${filterState.replace("_", " ")} matters`}
              </p>
              <button
                onClick={() => setShowMatterForm(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
              >
                Create Your First Matter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredMatters.map((matter) => (
                <MatterCard
                  key={matter.id}
                  matter={matter}
                  onEdit={
                    canEditMatter(matter)
                      ? () => handleEditMatter(matter)
                      : undefined
                  }
                  onDelete={
                    canDeleteMatter(matter)
                      ? () => handleDeleteMatter(matter)
                      : undefined
                  }
                  showCustomer={user?.role === "admin"}
                  canDelete={canDeleteMatter(matter)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {showMatterForm && (
        <MatterForm matter={editingMatter} onClose={handleMatterFormClose} />
      )}
    </div>
  );
};

export default MattersPage;
