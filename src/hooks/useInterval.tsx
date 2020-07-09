import { useEffect, useRef } from 'react';

/**
 * Improvement over the basic setInterval in useEffect.
 *
 * @param callback the event handler
 * @param delay the interval in milliseconds
 */
function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef<typeof callback>();
  useEffect(() => {
    savedCallback.current = callback;
  });
  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };
    let interval = setInterval(tick, delay);
    return () => clearInterval(interval);
  }, [delay]);
}

export default useInterval;
