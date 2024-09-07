// src/App.js
import React, { useState } from 'react';
import EMIForm from './Component/EMIForm';
import EMIResults from './Component/EmiResult';
 

function App() {
  const [results, setResults] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">EMI Calculator</h1>
        <EMIForm setResults={setResults} />
        {results && <EMIResults results={results} />}
      </div>
    </div>
  );
}

export default App;
