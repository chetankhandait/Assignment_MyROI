// src/components/EMIResults.js
import React, { useState } from 'react';
import EMIBreakdown from './EmiBreakDown';

const EMIResults = ({ results }) => {
  const [showBreakdown, setShowBreakdown] = useState(false);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">EMI Calculation Results</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-green-100 p-4 rounded-md">
          <p className="text-gray-700">Monthly EMI:</p>
          <p className="text-lg font-bold">₹ {results.emi}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-md">
          <p className="text-gray-700">Total Interest Payable:</p>
          <p className="text-lg font-bold">₹ {results.totalInterest}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-md">
          <p className="text-gray-700">Total Amount Payable:</p>
          <p className="text-lg font-bold">₹ {results.totalPayment}</p>
        </div>
        {results.prepayment && results.prepayment > 0 && (
          <>
            <div className="bg-purple-100 p-4 rounded-md">
              <p className="text-gray-700">Adjusted Tenure:</p>
              <p className="text-lg font-bold">
                {results.adjustedTenure} months
              </p>
            </div>
            <div className="bg-red-100 p-4 rounded-md">
              <p className="text-gray-700">Total Interest Saved:</p>
              <p className="text-lg font-bold">₹ {results.totalInterestSaved}</p>
            </div>
          </>
        )}
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={() => setShowBreakdown(!showBreakdown)}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          {showBreakdown ? 'Hide Breakdown' : 'Show Breakdown'}
        </button>
      </div>

      {showBreakdown && <EMIBreakdown breakdown={results.breakdown} />}
    </div>
  );
};

export default EMIResults;
