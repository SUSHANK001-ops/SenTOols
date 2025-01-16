"use client"
import { useEffect } from 'react';

export default function GoogleAd({ adSlot }) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('Adsense error:', e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-2939320826714458" 
      data-ad-slot="1234567890" 
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
