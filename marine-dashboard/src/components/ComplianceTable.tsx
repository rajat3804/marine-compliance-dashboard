// src/components/ComplianceTable.tsx
import React, { useState } from 'react';
import { Trash2, Search, MoreVertical } from 'lucide-react';  
import { useAudits } from '../contexts/AuditsContext';
import AddAuditModal from './AddAuditModal';

interface Audit {
  id: number;
  survey: string;
  status: 'Compliant' | 'Pending' | 'Non-Compliant';
  date: string;
  description?: string;
}

export default function ComplianceTable() {
  const { audits, updateStatus, deleteAudit, addAudit, loading } = useAudits();  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Handler for add - handles optional ID
  const handleAddAudit = (data: { id?: number; survey: string; status: Audit['status']; description: string; date: string }) => {
    const finalId = data.id || Math.max(...audits.map(a => a.id), 0) + 1;
    addAudit({ 
      id: finalId, 
      survey: data.survey, 
      status: data.status, 
      description: data.description, 
      date: data.date 
    });
    setIsModalOpen(false);
  };

  // Filter audits based on search
  const filteredAudits = audits.filter(audit => 
    audit.survey.toLowerCase().includes(searchTerm.toLowerCase()) ||
    audit.id.toString().includes(searchTerm)
  );

  // Handler for status dropdown change
  const handleStatusChange = (id: number, e: React.ChangeEvent<HTMLSelectElement>) => {
    updateStatus(id, e.target.value as Audit['status']);
  };

  if (loading) return <div className="text-center py-8 text-gray-500">Loading...</div>;

  return (
    <div className="p-8 md:ml-64 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Compliance Overview ({filteredAudits.length} of {audits.length})</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2"
          >
            + Add Audit
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by survey name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {searchTerm && (
            <p className="text-sm text-gray-500 mt-1">Showing {filteredAudits.length} results</p>
          )}
        </div>

        {filteredAudits.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {searchTerm ? 'No matching audits found.' : 'No audits yet.'}
            {!searchTerm && <button onClick={() => setIsModalOpen(true)} className="text-blue-600 hover:underline font-medium">Add one!</button>}
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-gray-200">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Survey</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredAudits.map((audit) => (
                  <tr key={audit.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{audit.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{audit.survey}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        audit.status === 'Compliant' ? 'bg-green-100 text-green-800' :
                        audit.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {audit.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{audit.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center space-x-2">
                      {/* New: Status Dropdown (replaces toggle) */}
                      <select
                        value={audit.status}
                        onChange={(e) => handleStatusChange(audit.id, e)}
                        className="px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      >
                        <option value="Compliant">Compliant</option>
                        <option value="Pending">Pending</option>
                        <option value="Non-Compliant">Non-Compliant</option>
                      </select>
                      
                      {/* Placeholder for more actions (e.g., Edit/View) - Expand here */}
                      {/* <div className="relative">
                        <button className="p-1 text-gray-500 hover:text-gray-700">
                          <MoreVertical size={16} />
                        </button>
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                          <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">Edit</button>
                          <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">View Details</button>
                        </div>
                      </div> */}

                      {/* Separate Delete Button */}
                      <button
                        onClick={() => deleteAudit(audit.id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"
                        title="Delete Audit"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <AddAuditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddAudit}
      />
    </div>
  );
}