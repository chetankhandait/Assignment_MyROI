// src/components/EMIBreakdown.js
import React from 'react';

const EMIBreakdown = ({ breakdown }) => {
  return (
    <div className="mt-6 overflow-x-auto">
      <h3 className="text-lg font-semibold mb-2">Payment Breakdown</h3>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Month</th>
            <th className="py-2 px-4 border">EMI (₹)</th>
            <th className="py-2 px-4 border">Interest (₹)</th>
            <th className="py-2 px-4 border">Principal (₹)</th>
            {breakdown[0].prepayment > 0 && (
              <th className="py-2 px-4 border">Prepayment (₹)</th>
            )}
            <th className="py-2 px-4 border">Balance (₹)</th>
          </tr>
        </thead>
        <tbody>
          {breakdown.map((item) => (
            <tr key={item.month} className="text-center">
              <td className="py-2 px-4 border">{item.month}</td>
              <td className="py-2 px-4 border">{item.emi}</td>
              <td className="py-2 px-4 border">{item.interest}</td>
              <td className="py-2 px-4 border">{item.principal}</td>
              {item.prepayment > 0 && (
                <td className="py-2 px-4 border">{item.prepayment}</td>
              )}
              <td className="py-2 px-4 border">{item.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EMIBreakdown;
