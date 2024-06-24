import { spawn } from 'child_process';
import path from 'path';

export default function handler(req, res) {
  console.log("Request received at /api/ask"); // Registro para saber que la solicitud fue recibida

  if (req.method === 'POST') {
    const { question } = req.body;
    console.log("Question received:", question); // Registro para ver la pregunta recibida

    // Construye la ruta absoluta al script Python
    const scriptPath = path.resolve('./src/app/backend/chatbot.py');
    console.log("Python script path:", scriptPath); // Registro para ver la ruta del script Python

    const pythonProcess = spawn('python', [scriptPath, question]);

    pythonProcess.stdout.on('data', (data) => {
      console.log("Python script output:", data.toString()); // Registro para ver la salida del script Python
      res.status(200).json({ answer: data.toString() });
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error("Python script error:", data.toString()); // Registro para ver cualquier error del script Python
      res.status(500).json({ error: data.toString() });
    });

    pythonProcess.on('close', (code) => {
      console.log(`Python script exited with code ${code}`); // Registro para ver el código de salida del script Python
    });
  } else {
    console.log("Invalid method"); // Registro para ver cuando el método no es POST
    res.status(405).json({ message: 'Method not allowed' });
  }
}
