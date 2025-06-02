import React, { useState } from "react";
import { Customer } from "../../types/customer";
import {
  Mail,
  Phone,
  FileText,
  Edit,
  MoreVertical,
  Trash2,
} from "lucide-react";
import { formatDate } from "../../utils/formatters";
import DeleteConfirmDialog from "../common/DeleteConfirmDialog";

interface CustomerCardProps {
  customer: Customer;
  onClick: () => void;
  onEdit: () => void;
  onDelete?: () => void;
}

const CustomerCard: React.FC<CustomerCardProps> = ({
  customer,
  onClick,
  onEdit,
  onDelete,
}) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showActionsMenu, setShowActionsMenu] = useState(false);

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick();
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowActionsMenu(false);
    onEdit();
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowActionsMenu(false);
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
      <div
        onClick={handleCardClick}
        className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group relative"
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {customer.name}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Customer since {formatDate(customer.created_at)}
            </p>
          </div>

          {/* Actions Menu */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowActionsMenu(!showActionsMenu);
              }}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors opacity-0 group-hover:opacity-100"
              title="More actions"
            >
              <MoreVertical className="h-4 w-4" />
            </button>

            {/* Dropdown Menu */}
            {showActionsMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <div className="py-1">
                  <button
                    onClick={handleEditClick}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Edit className="h-4 w-4 mr-3" />
                    Edit Customer
                  </button>
                  {onDelete && (
                    <button
                      onClick={handleDeleteClick}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-3" />
                      Delete Customer
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Click outside to close menu */}
        {showActionsMenu && (
          <div
            className="fixed inset-0 z-5"
            onClick={() => setShowActionsMenu(false)}
          />
        )}

        <div className="space-y-3">
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <Mail className="h-4 w-4 text-gray-400" />
            <span>{customer.email}</span>
          </div>

          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <Phone className="h-4 w-4 text-gray-400" />
            <span>{customer.phone}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <FileText className="h-4 w-4" />
              <span>{customer.matters_count} matters</span>
            </div>
            <div className="flex space-x-1">
              {customer.pending_matters_count > 0 && (
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  {customer.pending_matters_count} pending
                </span>
              )}
              {customer.in_progress_matters_count > 0 && (
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                  {customer.in_progress_matters_count} in progress
                </span>
              )}
              {customer.completed_matters_count > 0 && (
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  {customer.completed_matters_count} completed
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-3 text-center">
          <span className="text-xs text-blue-600 group-hover:text-blue-700 font-medium">
            Click to view matters →
          </span>
        </div>
      </div>

      <DeleteConfirmDialog
        isOpen={showDeleteDialog}
        title="Delete Customer"
        message="Are you sure you want to delete this customer? This will also delete all of their matters and cannot be undone."
        itemName={`${customer.name} (${customer.email})`}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </>
  );
};

export default CustomerCard;
