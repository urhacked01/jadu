'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define available languages
export type Language = 'en' | 'hi' | 'mr'; // English, Hindi, Marathi

// Define the context type
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

// Define translations
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.bikes': 'Bikes',
    'nav.showrooms': 'Showrooms',
    'nav.about': 'About Us',
    'nav.contact': 'Contact',
    'nav.testimonials': 'Testimonials',
    'nav.book_test_ride': 'Book Test Ride',
    'nav.finance': 'Finance',
    'nav.admin': 'Admin',
    'nav.hero_bikes': 'Hero Bikes',
    'nav.harley_davidson': 'Harley Davidson',
    'nav.new_arrivals': 'New Arrivals',
    'nav.popular_models': 'Popular Models',
    'nav.privacy_policy': 'Privacy Policy',
    'nav.terms_of_service': 'Terms of Service',

    // Home page
    'home.hero.title': 'Experience the Thrill of Riding',
    'home.hero.subtitle':
      'Explore our premium collection of Hero, Harley-Davidson, and Vida motorcycles',
    'home.hero.cta': 'Explore Bikes',
    'home.featured_bikes': 'Featured Bikes',
    'home.featured_bikes.subtitle': 'Explore our premium selection of bikes, from powerful performance machines to eco-friendly electric options.',
    'home.why_choose': 'Why Choose Dhanlaxmi Motor',
    'home.why_choose.subtitle': 'We\'re dedicated to providing you with the best motorcycle buying experience.',
    'home.premium_bikes': 'Premium Bikes',
    'home.premium_bikes.description': 'Explore our collection of top-quality Hero and Harley Davidson motorcycles.',
    'home.expert_service': 'Expert Service',
    'home.expert_service.description': 'Our team of experts provides exceptional service and support.',
    'home.multiple_locations': 'Multiple Locations',
    'home.multiple_locations.description': 'Visit us at any of our three convenient showroom locations.',
    'home.testimonials': 'What Our Customers Say',
    'home.testimonials.subtitle': 'Hear from our satisfied customers about their experience with Dhanlaxmi Motor.',
    'home.showrooms': 'Our Showrooms',
    'home.showrooms.subtitle': 'Visit us at any of our conveniently located showrooms across the city.',

    // Bikes section
    'bikes.title': 'Our Bikes Collection',
    'bikes.filter.all': 'All Bikes',
    'bikes.filter.hero': 'Hero',
    'bikes.filter.harley': 'Harley-Davidson',
    'bikes.filter.vida': 'Vida Electric',
    'bikes.view_details': 'View Details',
    'bikes.book_test_ride': 'Book Test Ride',
    'bikes.filters': 'Filters',
    'bikes.reset_filters': 'Reset All',
    'bikes.search': 'Search',
    'bikes.search_placeholder': 'Search bikes...',
    'bikes.brand': 'Brand',
    'bikes.category': 'Category',
    'bikes.price_range': 'Price Range',
    'bikes.sort_by': 'Sort By',
    'bikes.sort.default': 'Default',
    'bikes.sort.price_low': 'Price: Low to High',
    'bikes.sort.price_high': 'Price: High to Low',
    'bikes.sort.rating': 'Rating',
    'bikes.sort.newest': 'Newest First',
    'bikes.to': 'to',
    'bikes.subsidy_applied': '*subsidy applied',

    // Footer
    'footer.our_locations': 'Our Locations',
    'footer.navigation': 'Navigation',
    'footer.bikes': 'Bikes',
    'footer.copyright': 'All rights reserved.',
    'footer.description':
      'Your trusted dealer for Hero and Harley Davidson motorcycles with premium showroom locations.',

    // Language
    'language.english': 'English',
    'language.hindi': 'Hindi',
    'language.marathi': 'Marathi',
  },

  hi: {
    // Navigation
    'nav.home': 'होम',
    'nav.bikes': 'बाइक्स',
    'nav.showrooms': 'शोरूम',
    'nav.about': 'हमारे बारे में',
    'nav.contact': 'संपर्क',
    'nav.testimonials': 'प्रशंसापत्र',
    'nav.book_test_ride': 'टेस्ट राइड बुक करें',
    'nav.finance': 'फाइनेंस',
    'nav.admin': 'एडमिन',
    'nav.hero_bikes': 'हीरो बाइक्स',
    'nav.harley_davidson': 'हार्ले डेविडसन',
    'nav.new_arrivals': 'नए आगमन',
    'nav.popular_models': 'लोकप्रिय मॉडल',
    'nav.privacy_policy': 'गोपनीयता नीति',
    'nav.terms_of_service': 'सेवा की शर्तें',

    // Home page
    'home.hero.title': 'राइडिंग का रोमांच अनुभव करें',
    'home.hero.subtitle':
      'हमारे प्रीमियम हीरो, हार्ले-डेविडसन और विदा मोटरसाइकिलों का अन्वेषण करें',
    'home.hero.cta': 'बाइक्स देखें',
    'home.featured_bikes': 'फीचर्ड बाइक्स',
    'home.featured_bikes.subtitle': 'शक्तिशाली प्रदर्शन मशीनों से लेकर पर्यावरण-अनुकूल इलेक्ट्रिक विकल्पों तक, हमारे प्रीमियम बाइक्स का अन्वेषण करें।',
    'home.why_choose': 'धनलक्ष्मी मोटर को क्यों चुनें',
    'home.why_choose.subtitle': 'हम आपको सर्वोत्तम मोटरसाइकिल खरीदने का अनुभव प्रदान करने के लिए समर्पित हैं।',
    'home.premium_bikes': 'प्रीमियम बाइक्स',
    'home.premium_bikes.description': 'हमारे उच्च गुणवत्ता वाले हीरो और हार्ले डेविडसन मोटरसाइकिलों के संग्रह का अन्वेषण करें।',
    'home.expert_service': 'विशेषज्ञ सेवा',
    'home.expert_service.description': 'हमारी विशेषज्ञों की टीम असाधारण सेवा और समर्थन प्रदान करती है।',
    'home.multiple_locations': 'कई स्थान',
    'home.multiple_locations.description': 'हमारे तीन सुविधाजनक शोरूम स्थानों में से किसी पर भी आएं।',
    'home.testimonials': 'हमारे ग्राहक क्या कहते हैं',
    'home.testimonials.subtitle': 'धनलक्ष्मी मोटर के साथ अपने अनुभव के बारे में हमारे संतुष्ट ग्राहकों से सुनें।',
    'home.showrooms': 'हमारे शोरूम',
    'home.showrooms.subtitle': 'शहर भर में हमारे सुविधाजनक स्थित शोरूम में से किसी पर भी आएं।',

    // Bikes section
    'bikes.title': 'हमारा बाइक्स कलेक्शन',
    'bikes.filter.all': 'सभी बाइक्स',
    'bikes.filter.hero': 'हीरो',
    'bikes.filter.harley': 'हार्ले-डेविडसन',
    'bikes.filter.vida': 'विदा इलेक्ट्रिक',
    'bikes.view_details': 'विवरण देखें',
    'bikes.book_test_ride': 'टेस्ट राइड बुक करें',
    'bikes.filters': 'फिल्टर',
    'bikes.reset_filters': 'सभी रीसेट करें',
    'bikes.search': 'खोज',
    'bikes.search_placeholder': 'बाइक्स खोजें...',
    'bikes.brand': 'ब्रांड',
    'bikes.category': 'श्रेणी',
    'bikes.price_range': 'मूल्य सीमा',
    'bikes.sort_by': 'क्रमबद्ध करें',
    'bikes.sort.default': 'डिफ़ॉल्ट',
    'bikes.sort.price_low': 'मूल्य: कम से अधिक',
    'bikes.sort.price_high': 'मूल्य: अधिक से कम',
    'bikes.sort.rating': 'रेटिंग',
    'bikes.sort.newest': 'सबसे नया पहले',
    'bikes.to': 'से',
    'bikes.subsidy_applied': '*सब्सिडी लागू',

    // Footer
    'footer.our_locations': 'हमारे स्थान',
    'footer.navigation': 'नेविगेशन',
    'footer.bikes': 'बाइक्स',
    'footer.copyright': 'सर्वाधिकार सुरक्षित।',
    'footer.description':
      'हीरो और हार्ले डेविडसन मोटरसाइकिलों के लिए आपका विश्वसनीय डीलर प्रीमियम शोरूम के साथ।',

    // Language
    'language.english': 'अंग्रेज़ी',
    'language.hindi': 'हिंदी',
    'language.marathi': 'मराठी',
  },

  mr: {
    // Navigation
    'nav.home': 'मुख्यपृष्ठ',
    'nav.bikes': 'बाईक्स',
    'nav.showrooms': 'शोरूम',
    'nav.about': 'आमच्याबद्दल',
    'nav.contact': 'संपर्क',
    'nav.testimonials': 'प्रशंसापत्र',
    'nav.book_test_ride': 'टेस्ट राइड बुक करा',
    'nav.finance': 'फायनान्स',
    'nav.admin': 'अ‍ॅडमिन',
    'nav.hero_bikes': 'हीरो बाईक्स',
    'nav.harley_davidson': 'हार्ले डेविडसन',
    'nav.new_arrivals': 'नवीन आगमन',
    'nav.popular_models': 'लोकप्रिय मॉडेल्स',
    'nav.privacy_policy': 'गोपनीयता धोरण',
    'nav.terms_of_service': 'सेवेच्या अटी',

    // Home page
    'home.hero.title': 'बाईक चालवण्याचा थरार अनुभवा',
    'home.hero.subtitle': 'आमच्या प्रीमियम हीरो, हार्ले-डेविडसन आणि विदा मोटरसायकलींचा शोध घ्या',
    'home.hero.cta': 'बाईक्स एक्सप्लोर करा',
    'home.featured_bikes': 'फीचर्ड बाईक्स',
    'home.featured_bikes.subtitle': 'शक्तिशाली प्रदर्शन मशीन्स पासून पर्यावरण-अनुकूल इलेक्ट्रिक पर्यायांपर्यंत, आमच्या प्रीमियम बाईक्सचा शोध घ्या.',
    'home.why_choose': 'धनलक्ष्मी मोटर का निवडावे',
    'home.why_choose.subtitle': 'आम्ही तुम्हाला सर्वोत्तम मोटरसायकल खरेदी अनुभव देण्यासाठी समर्पित आहोत.',
    'home.premium_bikes': 'प्रीमियम बाईक्स',
    'home.premium_bikes.description': 'आमच्या उच्च दर्जाच्या हीरो आणि हार्ले डेविडसन मोटरसायकल्सच्या संग्रहाचा शोध घ्या.',
    'home.expert_service': 'तज्ञ सेवा',
    'home.expert_service.description': 'आमची तज्ञांची टीम अतिशय चांगली सेवा आणि सहाय्य प्रदान करते.',
    'home.multiple_locations': 'अनेक ठिकाणे',
    'home.multiple_locations.description': 'आमच्या तीन सोयीस्कर शोरूम लोकेशन्सपैकी कोणत्याही एकावर भेट द्या.',
    'home.testimonials': 'आमचे ग्राहक काय म्हणतात',
    'home.testimonials.subtitle': 'धनलक्ष्मी मोटरसह त्यांच्या अनुभवाबद्दल आमच्या समाधानी ग्राहकांकडून ऐका.',
    'home.showrooms': 'आमचे शोरूम',
    'home.showrooms.subtitle': 'शहरभरातील आमच्या सोयीस्कर ठिकाणी असलेल्या कोणत्याही शोरूमला भेट द्या.',

    // Bikes section
    'bikes.title': 'आमचे बाईक्स कलेक्शन',
    'bikes.filter.all': 'सर्व बाईक्स',
    'bikes.filter.hero': 'हीरो',
    'bikes.filter.harley': 'हार्ले-डेविडसन',
    'bikes.filter.vida': 'विदा इलेक्ट्रिक',
    'bikes.view_details': 'तपशील पहा',
    'bikes.book_test_ride': 'टेस्ट राइड बुक करा',
    'bikes.filters': 'फिल्टर्स',
    'bikes.reset_filters': 'सर्व रीसेट करा',
    'bikes.search': 'शोध',
    'bikes.search_placeholder': 'बाईक्स शोधा...',
    'bikes.brand': 'ब्रँड',
    'bikes.category': 'श्रेणी',
    'bikes.price_range': 'किंमत श्रेणी',
    'bikes.sort_by': 'क्रमवारी लावा',
    'bikes.sort.default': 'डीफॉल्ट',
    'bikes.sort.price_low': 'किंमत: कमीपासून जास्त',
    'bikes.sort.price_high': 'किंमत: जास्तपासून कमी',
    'bikes.sort.rating': 'रेटिंग',
    'bikes.sort.newest': 'सर्वात नवीन प्रथम',
    'bikes.to': 'ते',
    'bikes.subsidy_applied': '*सबसिडी लागू केली',

    // Footer
    'footer.our_locations': 'आमचे ठिकाण',
    'footer.navigation': 'नेविगेशन',
    'footer.bikes': 'बाईक्स',
    'footer.copyright': 'सर्व हक्क राखीव.',
    'footer.description':
      'प्रिमियम शोरूम लोकेशन्ससह हीरो आणि हार्ले डेविडसन मोटरसायकल्ससाठी आपला विश्वासू डिलर.',

    // Language
    'language.english': 'इंग्रजी',
    'language.hindi': 'हिंदी',
    'language.marathi': 'मराठी',
  },
};

// Provider component
export function LanguageProvider({ children }: { children: ReactNode }) {
  // Try to get the saved language from localStorage, default to 'en'
  const [language, setLanguageState] = useState<Language>('en');

  // Effect to initialize language from localStorage when component mounts
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['en', 'hi', 'mr'].includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    }
  }, []);

  // Update language and save to localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);

    // Update HTML lang attribute
    document.documentElement.lang = lang;

    // You could also update the dir attribute for RTL languages if needed
    // document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook for using the language context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
