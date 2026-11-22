import { useEffect, useState } from 'react';
import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:5000' });

export default function App() {
  const [status, setStatus] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/health')
      .then((res) => setStatus(res.data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-6 rounded-xl bg-white shadow">
        <h1 className="text-xl font-semibold mb-2">MERN Starter</h1>
        {error && <p className="text-red-600">Error: {error}</p>}
        {!error && !status && <p>Loading...</p>}
        {status && <p className="text-green-700">API says: ok = {String(status.ok)}</p>}
      </div>
    </div>
  );
}