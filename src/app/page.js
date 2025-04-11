'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState({ distance1: null, distance2: null });

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/data');
      const json = await res.json();
      setData(json);
    };

    fetchData();
    const interval = setInterval(fetchData, 2000); // fetch every 2s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">ESP32 Distance Data</h1>
      <p>Distance 1: {data.distance1 ?? '—'}</p>
      <p>Distance 2: {data.distance2 ?? '—'}</p>
    </div>
  );
}
