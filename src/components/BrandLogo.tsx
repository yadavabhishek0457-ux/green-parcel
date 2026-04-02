import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

export function BrandLogo({ className = "w-12 h-12" }: { className?: string }) {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function generateLogo() {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
        const prompt = `A clean, minimalist, and modern vector logo for 'GREEN PARCEL', an online fresh vegetable and fruit delivery service. 
        Primary Icon: A stylized, elegantly curved shopping bag made out of interwoven fresh green leaves. From the top, a small sprouting green leaf cluster emerges. 
        Integrate Trust: The lower part of the leaf bag subtly forms a heart shape representing love and care. 
        Text: Below the icon, 'GREEN PARCEL' in a modern, bold forest green sans-serif font. 
        Tagline: Beneath it, 'Quality wahi, jo ek Maa chunti hai.' in a smaller, earthy brown font. 
        Style: Refreshing gradient of mint to emerald green, professional, simple, vector-style, white background, premium feel.`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [{ text: prompt }],
          },
        });

        if (response.candidates?.[0]?.content?.parts) {
          for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
              const base64Data = part.inlineData.data;
              setLogoUrl(`data:image/png;base64,${base64Data}`);
              break;
            }
          }
        }
      } catch (error) {
        console.error("Error generating logo:", error);
      } finally {
        setLoading(false);
      }
    }

    generateLogo();
  }, []);

  if (loading) {
    return (
      <div className={`${className} bg-green-100 animate-pulse rounded-xl flex items-center justify-center`}>
        <div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!logoUrl) {
    // Fallback to the original sprout icon if generation fails
    return (
      <div className={`${className} rounded-xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center text-white shadow-lg`}>
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 20h10" />
          <path d="M10 20c5.5 0 5.5-18 0-18" />
          <path d="M14 20c-5.5 0-5.5-18 0-18" />
        </svg>
      </div>
    );
  }

  return (
    <img 
      src={logoUrl} 
      alt="Green Parcel Logo" 
      className={`${className} object-contain rounded-xl`}
      referrerPolicy="no-referrer"
    />
  );
}
