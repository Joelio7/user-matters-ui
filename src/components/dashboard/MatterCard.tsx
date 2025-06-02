import React, { useState } from "react";
import { Matter } from "../../types/matter";
import {
  Calendar,
  Clock,
  Edit,
  AlertCircle,
  Trash2,
  MoreVertical,
} from "lucide-react";
import {
  formatDate,
  getMatterStateColor,
  isOverdue,
} from "../../utils/formatters";
import DeleteConfirmDialog from "../common/DeleteConfirmDialog";

interface MatterCardProps {
  matter: Matter;
  onEdit?: () => void;
  onDelete?: () => void;
  showCustomer?: boolean;
  canDelete?: boolean;
}

const MatterCard: React.FC<MatterCardProps> = ({
  matter,
  onEdit,
  onDelete,
  showCustomer = false,
  canDelete = false,
}) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showActionsMenu, setShowActionsMenu] = useState(false);

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowActionsMenu(false);
    onEdit?.();
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

  const isDue = matter.due_date && isOverdue(matter.due_date);

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all relative group">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {matter.title}
            </h3>
            {showCustomer && matter.user && (
              <p className="text-sm text-gray-500 mb-2">
                Customer: {matter.user.name}
              </p>
            )}
            {matter.description && (
              <p className="text-sm text-gray-600 line-clamp-2">
                {matter.description}
              </p>
            )}
          </div>

          {(onEdit || (canDelete && onDelete)) && (
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
                    {onEdit && (
                      <button
                        onClick={handleEditClick}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Edit className="h-4 w-4 mr-3" />
                        Edit Matter
                      </button>
                    )}
                    {canDelete && onDelete && (
                      <button
                        onClick={handleDeleteClick}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 mr-3" />
                        Delete Matter
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {showActionsMenu && (
          <div
            className="fixed inset-0 z-5"
            onClick={() => setShowActionsMenu(false)}
          />
        )}

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${getMatterStateColor(matter.state)}`}
            >
              {matter.state.replace("_", " ").toUpperCase()}
            </span>

            {isDue && matter.state !== "completed" && (
              <div className="flex items-center space-x-1 text-red-600">
                <AlertCircle className="h-4 w-4" />
                <span className="text-xs font-medium">Overdue</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Created {formatDate(matter.created_at)}</span>
            </div>

            {matter.due_date && (
              <div
                className={`flex items-center space-x-2 ${isDue ? "text-red-600" : ""}`}
              >
                <Clock className="h-4 w-4" />
                <span>Due {formatDate(matter.due_date)}</span>
              </div>
            )}
          </div>
        </div>

        {matter.state === "in_progress" && (
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <div className="bg-yellow-500 h-2 rounded-full w-1/2"></div>
          </div>
        )}
      </div>

      <DeleteConfirmDialog
        isOpen={showDeleteDialog}
        title="Delete Matter"
        message="Are you sure you want to delete this matter? This action cannot be undone."
        itemName={matter.title}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </>
  );
};

export default MatterCard;
