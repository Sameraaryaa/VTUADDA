
'use client';
 
export default function customLoader({ src, width, quality }) {
  // Simple loader that just returns the original image path.
  // You can add more complex logic here if needed, like integrating
  // with an image CDN.
  return `${src}?w=${width}&q=${quality || 75}`;
}
