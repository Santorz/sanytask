import { useCallback, useEffect, useMemo, useState } from 'react';

const DEFAULT_OPTIONS = {
  config: { attributes: true, childList: true, subtree: true },
};

const useMutationObservable = (
  target_element: HTMLElement,
  cb: MutationCallback,
  options = DEFAULT_OPTIONS
) => {
  const { config } = options;

  const [observer, setObserver] = useState<MutationObserver>(null);

  const fireObserver = useCallback(() => {
    try {
      observer.observe(target_element, config);
    } catch (err) {
      console.error(err);
    }
  }, [config, observer, target_element]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setObserver(new MutationObserver(cb));
    }
  }, [cb]);

  useEffect(() => {
    if (typeof window !== 'undefined' && observer) {
      fireObserver();
    }
    // Disconnect on component unmount
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [fireObserver, observer]);
};

export default useMutationObservable;
