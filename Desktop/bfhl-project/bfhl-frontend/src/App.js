import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";

const App = () => {
  const [inputData, setInputData] = useState('{"data":["M","1","334","4","B"]}');
  const [response, setResponse] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);

  // Multi-select filter options
  const filterOptions = [
    { value: "numbers", label: "Numbers" },
    { value: "alphabets", label: "Alphabets" },
    { value: "highest_alphabet", label: "Highest Alphabet" },
  ];

  // Function to handle API request
  const handleSubmit = async () => {
    try {
      const jsonInput = JSON.parse(inputData);
      const res = await axios.post("https://bfhl-backend-ryo2.onrender.com/bfhl", jsonInput);
      setResponse(res.data);
    } catch (error) {
      console.error("Error:", error);
      alert("Invalid JSON input or request failed!");
    }
  };

  // Render the filtered response based on selected filters
  const renderFilteredResponse = () => {
    if (!response) return null;

    return (
      <div className="p-4 border bg-gray-100">
        <h3 className="font-bold">Filtered Response</h3>
        {selectedFilters.some((f) => f.value === "numbers") && (
          <p><strong>Numbers:</strong> {response.numbers.join(", ")}</p>
        )}
        {selectedFilters.some((f) => f.value === "alphabets") && (
          <p><strong>Alphabets:</strong> {response.alphabets.join(", ")}</p>
        )}
        {selectedFilters.some((f) => f.value === "highest_alphabet") && (
          <p><strong>Highest Alphabet:</strong> {response.highest_alphabet}</p>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-5 border rounded shadow-lg bg-white">
      {/* JSON Input */}
      <h2 className="text-xl font-bold mb-3">API Input</h2>
      <textarea
        className="w-full p-2 border rounded"
        rows="3"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
      />
      <button
        className="w-full bg-blue-600 text-white py-2 rounded mt-3 hover:bg-blue-700"
        onClick={handleSubmit}
      >
        Submit
      </button>

      {/* Multi-Filter Dropdown */}
      <h3 className="mt-5 text-lg font-bold">Multi Filter</h3>
      <Select
        isMulti
        options={filterOptions}
        value={selectedFilters}
        onChange={setSelectedFilters}
        className="mb-3"
      />

      {/* Render Response */}
      {renderFilteredResponse()}
    </div>
  );
};

export default App;