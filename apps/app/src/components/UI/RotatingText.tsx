'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Language {
  text: string;
}

const languages: Language[] = [
  { text: 'Redefinisana umjetnom inteligencijom' },
  { text: 'Upravljanje portfoliom nove generacije' },
  { text: 'Tvoj AI saveznik u svijetu berze' },
];

export default function MultilingualWelcome() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const interval = 3000;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % languages.length);
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentIndex}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
          duration: 0.5,
        }}
      >
        <p className="text-5xl font-[400] min-h-[120px] mb-0 leading-tight">
          {languages[currentIndex].text}
        </p>
      </motion.div>
    </AnimatePresence>
  );
}
