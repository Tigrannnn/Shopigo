import { useState, useEffect } from 'react';

/**
 * useDebounce — returns the value only after a delay (debounce).
 * @param value - the input value to debounce
 * @param delay - debounce delay in ms (default 200)
 * @returns debounced value
 */
export function useDebounce(value, delay = 200) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
