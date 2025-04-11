'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    let previousUrl;
  
    const fetchHeatmap = async () => {
      const res = await fetch('https://distance-q4vy.onrender.com/heatmap/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          distance1: 20.5,
          distance2: 35.2,
          distance3: 15.8,
        }),
      });
  
      const blob = await res.blob();
      const newUrl = URL.createObjectURL(blob);
      setImageUrl((oldUrl) => {
        if (oldUrl) URL.revokeObjectURL(oldUrl);
        return newUrl;
      });
      previousUrl = newUrl;
    };
  
    fetchHeatmap();
    const interval = setInterval(fetchHeatmap, 2000);
  
    return () => {
      clearInterval(interval);
      if (previousUrl) URL.revokeObjectURL(previousUrl);
    };
  }, []);
  
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      {imageUrl ? (
        <img src={imageUrl} alt="Heatmap" className="max-w-full max-h-screen" />
      ) : (
        <p className="text-white">Loading heatmap...</p>
      )}
    </div>
  );
}

/***
'use client';

import { useEffect, useState } from 'react';

// Utility: converts a value (0-60) into a color from red → yellow → green
const distanceToColor = (distance) => {
  if (distance === null) return '#808080'; // gray for no data

  const clamped = Math.min(Math.max(distance, 0), 60); // clamp between 0 and 60
  const percent = clamped / 60;

  const r = percent < 0.5 ? 255 : Math.floor(255 - (percent - 0.5) * 2 * 255);
  const g = percent > 0.5 ? 255 : Math.floor(percent * 2 * 255);
  const b = 0;

  return `rgb(${r}, ${g}, ${b})`;
};

export default function Home() {
  const [data, setData] = useState({ distance1: null, distance2: null ,distance3: null });

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

  const color1 = distanceToColor(data.distance1);
  const color2 = distanceToColor(data.distance2);
  const color3 = distanceToColor(data.distance3);

  return (
    <div className="flex flex-row w-screen h-screen">
      <div
        className="flex-1 flex flex-col items-center justify-center text-white text-xl font-semibold transition-all duration-500"
        style={{ backgroundColor: color1 }}
      >
        <p>Distance 1</p>
        <p>{data.distance1 !== null ? `${data.distance1.toFixed(1)} cm` : '—'}</p>
      </div>
      <div
        className="flex-1 flex flex-col items-center justify-center text-white text-xl font-semibold transition-all duration-500"
        style={{ backgroundColor: color2 }}
      >
        <p>Distance 2</p>
        <p>{data.distance2 !== null ? `${data.distance2.toFixed(1)} cm` : '—'}</p>
      </div>
      <div
        className="flex-1 flex flex-col items-center justify-center text-white text-xl font-semibold transition-all duration-500"
        style={{ backgroundColor: color3 }}
      >
        <p>Distance 3</p>
        <p>{data.distance3 !== null ? `${data.distance3.toFixed(1)} cm` : '—'}</p>
      </div>
    </div>
  );
}
*/