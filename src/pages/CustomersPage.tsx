import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useCustomers } from "../hooks/useCustomers";
import { fetchCustomerMatters } from "../store/slices/mattersSlice";
import { AppDispatch } from "../store";
import ProtectedRoute from "../components/auth/ProtectedRoute";

import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorMessage from "../components/common/ErrorMessage";
import { Plus, Users, ArrowLeft } from "lucide-react";
import { Customer } from "../types/customer";
import CustomerCard from "../components/dashboard/CustomerCard";
import CustomerForm from "../components/dashboard/CustomerForm";
import CustomerDetails from "../components/dashboard/CustomerDetails";

const CustomersPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    customers,
    selectedCustomer,
    getAllCustomers,
    removeCustomer,
    selectCustomer,
    isLoading,
    error,
  } = useCustomers();
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    console.log("CustomersPage: Loading customers...");
    getAllCustomers();
  }, []);

  const handleCustomerClick = async (customer: Customer) => {
    console.log("Clicking customer:", customer);
    selectCustomer(customer); // Use Redux action instead of local state
    // Fetch matters for this customer
    dispatch(fetchCustomerMatters(customer.id));
  };

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer);
    setShowCustomerForm(true);
  };

  const handleDeleteCustomer = async (customer: Customer) => {
    try {
      await removeCustomer(customer.id);
      // If we're currently viewing this customer, go back to list
      if (selectedCustomer?.id === customer.id) {
        selectCustomer(null); // Use Redux action
      }
      // Refresh customers list
      getAllCustomers();
    } catch (error) {
      console.error("Failed to delete customer:", error);
    }
  };

  const handleFormClose = () => {
    setShowCustomerForm(false);
    setEditingCustomer(null);
    getAllCustomers(); // Refresh list
  };

  const handleBackToList = () => {
    selectCustomer(null); // Use Redux action instead of local state
  };

  if (isLoading) {
    return (
      <ProtectedRoute requiredRole="admin">
        <LoadingSpinner />
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="space-y-6">
        {error && <ErrorMessage message={error} />}

        {/* Show Customer Details */}
        {selectedCustomer ? (
          <div>
            <div className="flex items-center mb-6">
              <button
                onClick={handleBackToList}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mr-4"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Customers</span>
              </button>
              <h1 className="text-2xl font-bold text-gray-900">
                {selectedCustomer.name}
              </h1>
            </div>
            <CustomerDetails
              customer={selectedCustomer}
              onEdit={() => handleEditCustomer(selectedCustomer)}
              onDelete={() => handleDeleteCustomer(selectedCustomer)}
            />
          </div>
        ) : (
          /* Show Customer List */
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-3">
                <Users className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
                <span className="text-sm text-gray-500">
                  ({customers.length})
                </span>
              </div>
              <button
                onClick={() => setShowCustomerForm(true)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add Customer</span>
              </button>
            </div>

            {customers.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg mb-4">No customers yet</p>
                <button
                  onClick={() => setShowCustomerForm(true)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                >
                  Add Your First Customer
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {customers.map((customer) => (
                  <CustomerCard
                    key={customer.id}
                    customer={customer}
                    onClick={() => handleCustomerClick(customer)}
                    onEdit={() => handleEditCustomer(customer)}
                    onDelete={() => handleDeleteCustomer(customer)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Customer Form Modal */}
        {showCustomerForm && (
          <CustomerForm customer={editingCustomer} onClose={handleFormClose} />
        )}
      </div>
    </ProtectedRoute>
  );
};

export default CustomersPage;
