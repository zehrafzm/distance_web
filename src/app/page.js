'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    let previousUrl;

    async function fetchImage() {
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
    }

    fetchImage();
    const id = setInterval(fetchImage, 2000);
    return () => {
      clearInterval(id);
      if (previousUrl) URL.revokeObjectURL(previousUrl);
    };
  }, []);

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Heatmap"
          className="
            max-w-full    /* allow the image to scale down if needed */
            max-h-full    /* allow the image to scale down if needed */
            object-contain /* preserve entire image without cropping */
            image-rendering-[pixelated] /* keep blocky pixels sharp */
          "
        />
      ) : (
        <p className="text-white">Loading heatmap…</p>
      )}
    </div>
  );
}
