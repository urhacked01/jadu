'use client';

import React, { useEffect } from 'react';
import Script from 'next/script';

// Define global window types for TypeScript
declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

const GoogleTranslate: React.FC = () => {
  useEffect(() => {
    // Define the translate function on the window object
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,hi,mr,es,fr,de,ja,zh-CN,ar', // Add languages you want to support
          layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        'google_translate_element'
      );
    };
  }, []);

  return (
    <>
      <div id="google_translate_element"></div>
      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
      {/* Add CSS to hide Google's default widget bar */}
      <style jsx global>{`
        .skiptranslate iframe {
          display: none !important;
        }
        .goog-te-banner-frame {
          display: none !important;
        }
        body {
          top: 0 !important;
        }
      `}</style>
    </>
  );
};

export default GoogleTranslate;
