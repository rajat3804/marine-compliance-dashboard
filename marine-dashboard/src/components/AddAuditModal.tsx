// src/components/AddAuditModal.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface AuditFormData {
  id?: number;  // Optional manual ID
  survey: string;
  status: 'Compliant' | 'Pending' | 'Non-Compliant';
  description: string;
  date: string;
}

interface AddAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AuditFormData) => void;
}

export default function AddAuditModal({ isOpen, onClose, onSubmit }: AddAuditModalProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<AuditFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFormSubmit = async (data: AuditFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      reset();
      onClose();
    } catch (error) {
      console.error('Error adding audit:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-auto">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Audit</h2>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div>
            <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-1">
              ID (Optional - auto-generated if blank)
            </label>
            <input
              id="id"
              type="number"
              placeholder="e.g., 999"
              {...register('id')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.id && <p className="mt-1 text-sm text-red-600">{errors.id.message}</p>}
          </div>

          <div>
            <label htmlFor="survey" className="block text-sm font-medium text-gray-700 mb-1">
              Survey / Title
            </label>
            <input
              id="survey"
              type="text"
              placeholder="e.g., Vessel Inspection"
              {...register('survey', { required: 'Survey title is required' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.survey && <p className="mt-1 text-sm text-red-600">{errors.survey.message}</p>}
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              {...register('status', { required: 'Status is required' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Status</option>
              <option value="Compliant">Compliant</option>
              <option value="Pending">Pending</option>
              <option value="Non-Compliant">Non-Compliant</option>
            </select>
            {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              rows={3}
              placeholder="Brief details about the audit..."
              {...register('description', { required: 'Description is required' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            />
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              id="date"
              type="date"
              defaultValue={new Date().toISOString().split('T')[0]}  
              {...register('date', { required: 'Date is required' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding...' : 'Add Audit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}