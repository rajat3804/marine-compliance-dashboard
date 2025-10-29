// src/Home.tsx (create if missing)
import React from 'react';
import { Link } from 'react-router-dom';
import { useAudits } from './contexts/AuditsContext';

interface Audit {
  id: number;
  title: string;
  status: 'backlogged' | 'compliant' | 'pending';
  description: string;
  date: string;
}

export default function Home() {
  const { audits, loading } = useAudits();

  if (loading) return <div className="text-center py-8">Loading...</div>;

  const backloggedCount = audits.filter(a => a.status === 'backlogged').length;
  const compliantCount = audits.filter(a => a.status === 'compliant').length;
  const pendingCount = audits.filter(a => a.status === 'pending').length;

  return (
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Marine Compliance Dashboard</h1>
      <p className="text-lg text-gray-600 mb-8">
        Navigate to view and manage audits. Built with React, Vite, and Tailwind for seamless compliance tracking.
      </p>

      {/* Stats Grid - Clickable to Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link to="/dashboard" className="block">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition cursor-pointer">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">{backloggedCount} Audits</h2>
            <p className="text-sm text-gray-500">Backlogged</p>
          </div>
        </Link>

        <Link to="/dashboard" className="block">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition cursor-pointer">
            <h2 className="text-2xl font-semibold text-green-600 mb-2">{compliantCount} Compliant</h2>
            <p className="text-sm text-gray-500">On track</p>
          </div>
        </Link>

        <Link to="/dashboard" className="block">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition cursor-pointer">
            <h2 className="text-2xl font-semibold text-red-600 mb-2">{pendingCount} Pending</h2>
            <p className="text-sm text-gray-500">Needs attention</p>
          </div>
        </Link>
      </div>

      {/* Fallback Button */}
      <Link to="/dashboard">
        <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200">
          Go to Dashboard
        </button>
      </Link>
    </div>
  );
}