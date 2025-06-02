import React, { useState, useEffect } from "react";
import { useMatters } from "../../hooks/useMatters";
import { useAuth } from "../../hooks/useAuth";
import { Matter, MatterFormData, MatterState } from "../../types/matter";
import { X, Save, FileText } from "lucide-react";
import ErrorMessage from "../common/ErrorMessage";

interface MatterFormProps {
  matter?: Matter | null;
  customerId?: number;
  onClose: () => void;
}

const MatterForm: React.FC<MatterFormProps> = ({
  matter,
  customerId,
  onClose,
}) => {
  const { addMatter, addCustomerMatter, editMatter, isLoading, error } =
    useMatters();
  const { user } = useAuth();
  const [formData, setFormData] = useState<MatterFormData>({
    title: "",
    description: "",
    state: "new",
    due_date: "",
  });

  const isEditing = !!matter;
  const isAdminCreatingForCustomer = user?.role === "admin" && customerId;

  useEffect(() => {
    if (matter) {
      setFormData({
        title: matter.title,
        description: matter.description || "",
        state: matter.state,
        due_date: matter.due_date ? matter.due_date.split("T")[0] : "", // Format for date input
      });
    }
  }, [matter]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const submitData = {
        ...formData,
        due_date: formData.due_date || undefined,
      };

      if (isEditing && matter) {
        await editMatter(matter.id, submitData);
      } else if (isAdminCreatingForCustomer && customerId) {
        await addCustomerMatter(customerId, submitData);
      } else {
        await addMatter(submitData);
      }
      onClose();
    } catch (err) {}
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const matterStates: { value: MatterState; label: string }[] = [
    { value: "new", label: "New" },
    { value: "in_progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
  ];

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <FileText className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              {isEditing ? "Edit Matter" : "Add New Matter"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {error && <ErrorMessage message={error} />}

          <div className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Matter Title *
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter matter title"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter matter description..."
              />
            </div>

            <div>
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Status *
              </label>
              <select
                id="state"
                name="state"
                required
                value={formData.state}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {matterStates.map((state) => (
                  <option key={state.value} value={state.value}>
                    {state.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="due_date"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Due Date
              </label>
              <input
                id="due_date"
                name="due_date"
                type="date"
                value={formData.due_date}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              <Save className="h-4 w-4" />
              <span>
                {isLoading ? "Saving..." : isEditing ? "Update" : "Create"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MatterForm;
