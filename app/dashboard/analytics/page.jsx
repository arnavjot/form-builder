"use client"
import React, { useState } from 'react';

function Analytics() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDialog = () => setIsOpen(!isOpen);

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      <h1 className="text-2xl font-extrabold text-center mb-4">Powerful Analytics Dashboard</h1>
      <p className="text-center mb-6 max-w-md">
        Explore comprehensive insights and trends from your data. Understand your performance metrics better with our advanced analytics tools, available exclusively to premium users.
      </p>
      <button
        className="bg-primary hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition duration-300 ease-in-out hover:scale-105"
        onClick={toggleDialog}
      >
        Check Analytics
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-10">
          <div className="bg-white rounded-lg p-6 shadow-xl max-w-sm mx-auto z-20">
            <h3 className="text-xl font-bold">Upgrade Required</h3>
            <p className="my-4">Access to detailed analytics is available to premium users.</p>
            <div className="flex justify-end space-x-4">
              <a
                href="/dashboard/upgrade"
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
              >
                Upgrade Now
              </a>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg"
                onClick={toggleDialog}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Analytics;
