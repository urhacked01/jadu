'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Globe, X } from 'lucide-react';
import { useLanguage, Language } from '../context/LanguageContext';

// Language options with their codes and display names
const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'mr', name: 'मराठी' },
];

const CustomTranslateWidget: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check for mobile viewport
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Listen for resize events
    window.addEventListener('resize', checkMobile);

    // Listen for clicks outside to close dropdown
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const changeLanguage = (langCode: Language) => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative z-50" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 focus:outline-none"
        title="Change language"
        aria-label="Change language"
      >
        <Globe className="h-5 w-5" />
        <span className={isMobile ? 'text-xs' : 'hidden md:inline-block'} aria-hidden="true">
          {language === 'en'
            ? 'EN'
            : language === 'hi'
              ? 'HI'
              : language === 'mr'
                ? 'MR'
                : language.toUpperCase()}
        </span>
      </button>

      {isOpen && !isMobile && (
        <div
          className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="language-menu"
        >
          <div className="py-1 max-h-60 overflow-y-auto">
            {languages.map(lang => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code as Language)}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  language === lang.code
                    ? 'bg-[var(--primary)] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                role="menuitem"
              >
                {lang.code === 'en' 
                  ? t('language.english')
                  : lang.code === 'hi' 
                    ? t('language.hindi') 
                    : t('language.marathi')}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mobile bottom sheet for language selection */}
      {isOpen && isMobile && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-25 z-40"
            aria-hidden="true"
            onClick={() => setIsOpen(false)}
          />
          <div className="language-dropdown-mobile">
            <div className="language-header">
              <h3 className="text-lg font-medium">Select Language</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100"
                aria-label="Close language selector"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="language-list">
              {languages.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code as Language)}
                  className={`language-option block w-full text-left px-4 py-3 ${
                    language === lang.code
                      ? 'bg-[var(--primary)] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  role="menuitem"
                >
                  {lang.code === 'en' 
                    ? t('language.english')
                    : lang.code === 'hi' 
                      ? t('language.hindi') 
                      : t('language.marathi')}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CustomTranslateWidget;
