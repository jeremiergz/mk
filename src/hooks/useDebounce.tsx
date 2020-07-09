import { useEffect, useState } from 'react';

/**
 * Debounces any fast changing value.
 *
 * @param value the value to debounce
 * @param delay the debounce delay
 */
function useDebounce<T = unknown>(value: T, delay: number) {
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

export default useDebounce;
