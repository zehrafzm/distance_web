'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    let previousUrl;

    const fetchImage = async () => {
      const res = await fetch('https://distance-q4vy.onrender.com/image');
      if (res.status === 200) {
        const blob = await res.blob();
        const newUrl = URL.createObjectURL(blob);

        setImageUrl((oldUrl) => {
          if (oldUrl) URL.revokeObjectURL(oldUrl);
          return newUrl;
        });

        previousUrl = newUrl;
      }
    };

    fetchImage();
    const interval = setInterval(fetchImage, 2000);

    return () => {
      clearInterval(interval);
      if (previousUrl) URL.revokeObjectURL(previousUrl);
    };
  }, []);

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center">
      {imageUrl ? (
        <img src={imageUrl} alt="Heatmap" className="w-full h-full object-cover" />
      ) : (
        <p className="text-white">Loading heatmap...</p>
      )}
    </div>
  );
}
