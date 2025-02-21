import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [inputData, setInputData] = useState('{ "data": ["A", "1", "B", "2", "C"] }');
  const [response, setResponse] = useState(null);
  const [filter, setFilter] = useState([]);

  const handleSubmit = async () => {
    try {
      const jsonInput = JSON.parse(inputData);
      // Update backend API URL
      const res = await axios.post("https://bfhl-backend-ryo2.onrender.com/bfhl", jsonInput);
      setResponse(res.data);
    } catch (error) {
      alert("Invalid JSON or API Error");
    }
  };

  const renderFilteredResponse = () => {
    if (!response) return null;

    let filteredData = {};
    if (filter.includes("Numbers")) filteredData.numbers = response.numbers;
    if (filter.includes("Alphabets")) filteredData.alphabets = response.alphabets;
    if (filter.includes("Highest Alphabet")) filteredData.highest_alphabet = response.highest_alphabet;

    return <pre>{JSON.stringify(filteredData, null, 2)}</pre>;
  };

  return (
    <div className="flex flex-col items-center p-5">
      <h1 className="text-2xl font-bold mb-4">BFHL Challenge</h1>
      <textarea
        className="border p-2 w-96 h-24"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
      ></textarea>
      <button className="bg-blue-500 text-white px-4 py-2 mt-2" onClick={handleSubmit}>
        Submit
      </button>
      {response && (
        <div className="mt-4">
          <label className="block font-semibold">Filter Response:</label>
          <select
            multiple
            className="border p-2 w-96"
            onChange={(e) =>
              setFilter(Array.from(e.target.selectedOptions, (option) => option.value))
            }
          >
            <option value="Numbers">Numbers</option>
            <option value="Alphabets">Alphabets</option>
            <option value="Highest Alphabet">Highest Alphabet</option>
          </select>
          <div className="mt-4 p-4 border bg-gray-100">{renderFilteredResponse()}</div>
        </div>
      )}
    </div>
  );
};

export default App;