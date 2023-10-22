import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import classNames from 'classnames';

export default function ScrollToTopButton() {
  const isBrowser = () => typeof window !== 'undefined';
  const [showButton, setShowButton] = useState(false);

  // Handles scroll to top of window
  const handleScrollToTop = () => {
    if (!isBrowser()) return;

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handles showing of scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 150);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <button
      className={classNames(
        'fixed right-5 bottom-5 p-4 bg-blue-500 text-white rounded-full opacity-0 transition-all',
        {
          'opacity-100': showButton
        }
      )}
      onClick={handleScrollToTop}
    >
      <FaArrowUp />
    </button>
  );
}
