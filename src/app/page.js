'use client';

import { useState } from 'react';

export default function Home() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleAsk = async () => {
    console.log("Sending request to /api/ask with question:", question); // Registro para ver la pregunta enviada
    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      console.log("Response status:", res.status); // Registro para ver el estado de la respuesta

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log("Response data:", data); // Registro para ver los datos de la respuesta
      setAnswer(data.answer || 'No se encontró información.');
    } catch (error) {
      console.error("Fetch error:", error); // Registro para ver cualquier error de la solicitud
      setAnswer('Error al realizar la solicitud.');
    }
  };

  return (
    <div className="text-center p-8">
      <h1 className="text-2xl font-bold mb-4">Consulta Indicadores Demográficos</h1>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Haz una pregunta"
        className="p-2 border rounded w-64 text-black"
      />
      <button onClick={handleAsk} className="ml-4 p-2 bg-blue-500 text-white rounded">
        Preguntar
      </button>
      {answer && <p className="mt-4">{`Respuesta: ${answer}`}</p>}
    </div>
  );
}
