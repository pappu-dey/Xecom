import React, { useState, useEffect } from 'react';

const SEARCH_PHRASES = [
  "Search for 'Nike Running Sneakers'...",
  "Search for 'Floral Summer Midi Dresses'...",
  "Search for 'Men Casual Cotton Shirts'...",
  "Search for 'Sony ANC Wireless Headphones'...",
  "Search for 'Kids Party Wear & Dino Sets'...",
  "Search for 'Handcrafted Leather Loafers'...",
  "Search for 'AMOLED 5G Smartwatches'...",
  "Search for 'Ethnic Silk Sarees & Kurtis'...",
];

export default function BigSearchBar({
  searchQuery,
  onSearchChange,
}) {
  const [placeholderText, setPlaceholderText] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect cycling through popular search phrases
  useEffect(() => {
    // If user has already entered a query, stop typing placeholder
    if (searchQuery) return;

    const currentPhrase = SEARCH_PHRASES[phraseIdx];
    let typingSpeed = isDeleting ? 35 : 70;

    if (!isDeleting && charIdx === currentPhrase.length) {
      // Pause at full word before deleting
      typingSpeed = 1800;
    } else if (isDeleting && charIdx === 0) {
      // Switch to next phrase
      setIsDeleting(false);
      setPhraseIdx((prev) => (prev + 1) % SEARCH_PHRASES.length);
      typingSpeed = 300;
      return;
    }

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (charIdx < currentPhrase.length) {
          setPlaceholderText(currentPhrase.substring(0, charIdx + 1));
          setCharIdx((prev) => prev + 1);
        } else {
          setIsDeleting(true);
        }
      } else {
        if (charIdx > 0) {
          setPlaceholderText(currentPhrase.substring(0, charIdx - 1));
          setCharIdx((prev) => prev - 1);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIdx, isDeleting, phraseIdx, searchQuery]);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 my-8">
      {/* PURE STANDALONE SEARCH BAR (NO CARD, NO EXTRA BOX) */}
      <div className="relative flex items-center bg-white rounded-full shadow-lg hover:shadow-xl border border-slate-200/90 hover:border-slate-300 focus-within:border-rose-500 focus-within:ring-4 focus-within:ring-rose-500/15 transition-all duration-300 p-1.5 sm:p-2">
        
        {/* Search Icon */}
        <div className="pl-3.5 sm:pl-4 text-slate-400 flex items-center pointer-events-none">
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Input Field with Animated Typewriter Placeholder */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholderText || "Search products, brands, styles..."}
          className="flex-1 w-full bg-transparent px-3 sm:px-4 py-2.5 sm:py-3 text-slate-900 placeholder:text-slate-400 text-sm sm:text-base font-medium focus:outline-none"
        />

        {/* Clear Button */}
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="px-2.5 text-slate-400 hover:text-slate-600 text-sm font-bold cursor-pointer transition-colors"
            title="Clear search"
          >
            ✕
          </button>
        )}

        {/* Action Button */}
        <button
          type="button"
          className="px-5 sm:px-7 py-2.5 sm:py-3 bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-bold rounded-full transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-1.5"
        >
          <span>Search</span>
          <svg className="w-3.5 h-3.5 hidden sm:inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}
