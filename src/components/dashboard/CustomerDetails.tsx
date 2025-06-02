// src/components/customers/CustomerDetails.tsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useMatters } from "../../hooks/useMatters";
import { fetchCustomerMatters } from "../../store/slices/mattersSlice";
import { AppDispatch } from "../../store";
import { Customer } from "../../types/customer";
import { Matter } from "../../types/matter";
import {
  Mail,
  Phone,
  Calendar,
  Edit,
  Plus,
  FileText,
  Trash2,
} from "lucide-react";
import { formatDate } from "../../utils/formatters";

import DeleteConfirmDialog from "../common/DeleteConfirmDialog";
import MatterCard from "./MatterCard";
import MatterForm from "./MatterForm";

interface CustomerDetailsProps {
  customer: Customer;
  onEdit: () => void;
  onDelete?: () => void;
}

const CustomerDetails: React.FC<CustomerDetailsProps> = ({
  customer,
  onEdit,
  onDelete,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { customerMatters, removeCustomerMatter } = useMatters();
  const [showMatterForm, setShowMatterForm] = useState(false);
  const [editingMatter, setEditingMatter] = useState<Matter | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleMatterFormClose = () => {
    setShowMatterForm(false);
    setEditingMatter(null);
    // Refresh customer matters after form closes
    dispatch(fetchCustomerMatters(customer.id));
  };

  const handleEditMatter = (matter: Matter) => {
    setEditingMatter(matter);
    setShowMatterForm(true);
  };

  const handleDeleteMatter = async (matter: Matter) => {
    try {
      await removeCustomerMatter(customer.id, matter.id);
      // Refresh customer matters after deletion
      dispatch(fetchCustomerMatters(customer.id));
    } catch (error) {
      console.error("Failed to delete customer matter:", error);
    }
  };

  const handleDeleteCustomer = () => {
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    onDelete?.();
    setShowDeleteDialog(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteDialog(false);
  };

  return (
    <>
      <div className="space-y-6">
        {/* Customer Info Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {customer.name}
              </h2>
              <p className="text-gray-500 mt-1">Customer ID: {customer.id}</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={onEdit}
                className="flex items-center space-x-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors"
              >
                <Edit className="h-4 w-4" />
                <span>Edit</span>
              </button>
              {onDelete && (
                <button
                  onClick={handleDeleteCustomer}
                  className="flex items-center space-x-2 px-4 py-2 text-red-600 border border-red-600 rounded-md hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete</span>
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <p className="text-gray-900">{customer.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <p className="text-gray-900">{customer.phone}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Customer Since
                  </label>
                  <p className="text-gray-900">
                    {formatDate(customer.created_at)}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-gray-400" />
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Total Matters
                  </label>
                  <p className="text-gray-900">{customer.matters_count}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Matter Statistics */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Matter Statistics
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">
                  {customer.pending_matters_count}
                </p>
                <p className="text-sm text-gray-600">Pending</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <p className="text-2xl font-bold text-yellow-600">
                  {customer.in_progress_matters_count}
                </p>
                <p className="text-sm text-gray-600">In Progress</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">
                  {customer.completed_matters_count}
                </p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Matters Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Matters ({customerMatters.length})
              </h3>
              <button
                onClick={() => setShowMatterForm(true)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add Matter</span>
              </button>
            </div>
          </div>

          <div className="p-6">
            {customerMatters.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg mb-4">No matters yet</p>
                <button
                  onClick={() => setShowMatterForm(true)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                >
                  Create First Matter
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {customerMatters.map((matter) => (
                  <MatterCard
                    key={matter.id}
                    matter={matter}
                    onEdit={() => handleEditMatter(matter)}
                    onDelete={() => handleDeleteMatter(matter)}
                    canDelete={true} // Admin can delete customer matters
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {showMatterForm && (
          <MatterForm
            matter={editingMatter}
            customerId={customer.id}
            onClose={handleMatterFormClose}
          />
        )}
      </div>

      <DeleteConfirmDialog
        isOpen={showDeleteDialog}
        title="Delete Customer"
        message="Are you sure you want to delete this customer? This will permanently delete all of their matters and cannot be undone."
        itemName={`${customer.name} (${customer.email})`}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </>
  );
};

export default CustomerDetails;
