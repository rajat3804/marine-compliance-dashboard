import React from 'react';

const Header: React.FC = () => (
  <header className="bg-white shadow-md p-4 flex justify-between items-center">
    <h1 className="text-2xl font-bold text-gray-900">Marine Compliance Dashboard</h1>
    <div className="flex items-center space-x-4">
      <div className="relative">
        <input type="text" placeholder="Search audits..." className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center font-bold text-gray-700">RV</div>
    </div>
  </header>
);

export default Header;