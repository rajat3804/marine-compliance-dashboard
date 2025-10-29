// src/App.tsx
import { Routes, Route, Link } from 'react-router-dom';
import { AuditsProvider, useAudits } from './contexts/AuditsContext'; 
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ComplianceTable from './components/ComplianceTable';
import { DocumentIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

function Home() {
  const { audits, loading } = useAudits();

  if (loading) return <div className="text-center py-8 text-gray-500">Loading...</div>;

  const total = audits.length;
  const compliant = audits.filter(a => a.status === 'Compliant').length;
  const nonCompliant = audits.filter(a => a.status === 'Non-Compliant').length;
  const pending = audits.filter(a => a.status === 'Pending').length;  

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Compliant': return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'Pending': return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />;
      case 'Non-Compliant': return <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />;
      default: return <DocumentIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="p-8 md:ml-64 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Marine Compliance Dashboard</h1>
        <p className="text-lg text-gray-600 mb-8">Navigate to Dashboard to view and manage audits. Built with React, Vite, and Tailwind for seamless compliance tracking.</p>
        
        {/* Stats Cards - Now Clickable */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link to="/dashboard" className="block">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:scale-105 transition-transform duration-200 border-l-4 border-blue-500 cursor-pointer">
              <DocumentIcon className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-900">{total} Audits</h3>
              <p className="text-gray-500">Total tracked</p>
            </div>
          </Link>
          <Link to="/dashboard" className="block">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:scale-105 transition-transform duration-200 border-l-4 border-green-500 cursor-pointer">
              <CheckCircleIcon className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-900">{compliant} Compliant</h3>
              <p className="text-gray-500">On track</p>
            </div>
          </Link>
          <Link to="/dashboard" className="block">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:scale-105 transition-transform duration-200 border-l-4 border-red-500 cursor-pointer">
              <ExclamationTriangleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-900">{nonCompliant + pending} Needs Attention</h3>
              <p className="text-gray-500">Pending / Non-Compliant</p>
            </div>
          </Link>
        </div>

        {/* Quick Preview - Uses audits from context */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <DocumentIcon className="h-5 w-5 mr-2 text-blue-500" /> Recent Audits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {audits.slice(0, 6).map(audit => (
              <div key={audit.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-medium text-gray-900">{audit.survey || audit.name || 'Untitled'}</h3>
                <div className="flex items-center justify-between mt-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${
                    audit.status === 'Compliant' ? 'bg-green-100 text-green-800' :
                    audit.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {getStatusIcon(audit.status)} {audit.status}
                  </span>
                  <span className="text-sm text-gray-500">{audit.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Link to="/dashboard">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg">
            Go to Dashboard →
          </button>
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuditsProvider>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 md:ml-64">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<ComplianceTable />} />
          </Routes>
        </div>
      </div>
    </AuditsProvider>
  );
}

export default App;