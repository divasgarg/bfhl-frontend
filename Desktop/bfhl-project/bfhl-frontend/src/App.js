import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [inputData, setInputData] = useState('{ "data": ["A", "1", "B", "2", "C"] }');
  const [response, setResponse] = useState(null);

  const handleSubmit = async () => {
    try {
      const jsonInput = JSON.parse(inputData);
      const res = await axios.post("https://bfhl-backend-ryo2.onrender.com/bfhl", jsonInput);
      setResponse(res.data);
    } catch (error) {
      alert("Invalid JSON or API Error");
    }
  };

  const renderResponse = () => {
    if (!response) return null;

    return (
      <div className="p-4 border bg-gray-100 mt-4">
        <h2 className="text-xl font-bold mb-2">API Response:</h2>
        <p><strong>User ID:</strong> {response.user_id}</p>
        <p><strong>Email:</strong> {response.email}</p>
        <p><strong>Roll Number:</strong> {response.roll_number}</p>
        <p><strong>Numbers:</strong> {response.numbers.join(", ")}</p>
        <p><strong>Alphabets:</strong> {response.alphabets.join(", ")}</p>
        <p><strong>Highest Alphabet:</strong> {response.highest_alphabet.join(", ")}</p>
      </div>
    );
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
      {renderResponse()}
    </div>
  );
};

export default App;