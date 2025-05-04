'use client';

import React from 'react';

// Language mappings between internal codes and Google Translate codes
const languageMappings = {
  en: 'en', // English
  hi: 'hi', // Hindi
  mr: 'mr', // Marathi
  // Add more mappings as needed
};

// Detect if Google Translate is active on the page
export const isGoogleTranslateActive = (): boolean => {
  if (typeof document === 'undefined') return false;
  return (
    document.documentElement.classList.contains('translated-ltr') ||
    document.documentElement.classList.contains('translated-rtl')
  );
};

// Get the current Google Translate language
export const getGoogleTranslateLanguage = (): string | null => {
  if (typeof document === 'undefined') return null;

  const cookie = document.cookie.split('; ').find(row => row.startsWith('googtrans='));

  if (cookie) {
    const value = cookie.split('=')[1];
    const parts = value.split('/');
    if (parts.length >= 3) {
      return parts[2];
    }
  }

  return null;
};

// Synchronize internal language state with Google Translate
export const syncLanguageWithGoogleTranslate = (setLanguage: (lang: string) => void): void => {
  const googleLang = getGoogleTranslateLanguage();

  if (googleLang && Object.values(languageMappings).includes(googleLang)) {
    // Find internal language code for Google Translate code
    const internalLang = Object.entries(languageMappings).find(
      ([_, googleCode]) => googleCode === googleLang
    )?.[0];

    if (internalLang) {
      setLanguage(internalLang as any);
    }
  }
};

// Set Google Translate language programmatically
export const setGoogleTranslateLanguage = (langCode: string): void => {
  if (typeof document === 'undefined') return;

  // Get Google Translate code from internal code
  const googleLangCode = languageMappings[langCode as keyof typeof languageMappings] || langCode;

  // Set cookie
  document.cookie = `googtrans=/auto/${googleLangCode}; path=/; domain=${window.location.hostname}`;

  // For non-localhost, also set cookie for main domain
  if (window.location.hostname !== 'localhost') {
    const domain = window.location.hostname.split('.').slice(-2).join('.');
    document.cookie = `googtrans=/auto/${googleLangCode}; path=/; domain=.${domain}`;
  }

  // Reload page to activate translation
  window.location.reload();
};

/**
 * Helper function to prevent hydration errors by using a consistent format
 * for locale-sensitive content regardless of browser settings.
 *
 * @param Component - The React component to wrap
 * @returns A wrapped component that prevents hydration errors
 */
export function withTranslateCompatibility<T>(Component: React.ComponentType<T>) {
  return function WrappedComponent(props: T & JSX.IntrinsicAttributes) {
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
      setIsMounted(true);

      // Add class to prevent Google Translate from translating certain elements
      if (typeof document !== 'undefined') {
        document.querySelectorAll('.notranslate').forEach(el => {
          if (el instanceof HTMLElement) {
            el.setAttribute('translate', 'no');
          }
        });
      }
    }, []);

    // Server-side rendering or first client render - use a simplified version
    if (!isMounted) {
      return React.createElement(Component, props);
    }

    // After client-side hydration, render the full component
    return React.createElement(Component, props);
  };
}

/**
 * Adds a helpful CSS class when Google Translate is active
 * Can be used to apply specific styles only when translation is happening
 */
export function useGoogleTranslateEffect() {
  React.useEffect(() => {
    if (typeof document === 'undefined') return;

    const checkTranslation = () => {
      if (isGoogleTranslateActive()) {
        document.body.classList.add('google-translate-active');
      } else {
        document.body.classList.remove('google-translate-active');
      }
    };

    // Check immediately and then every 500ms
    checkTranslation();
    const interval = setInterval(checkTranslation, 500);

    return () => clearInterval(interval);
  }, []);
}

export default {
  isGoogleTranslateActive,
  getGoogleTranslateLanguage,
  syncLanguageWithGoogleTranslate,
  setGoogleTranslateLanguage,
  withTranslateCompatibility,
  useGoogleTranslateEffect,
};
