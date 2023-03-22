import { useState, useEffect } from 'react';

//hook detects changes in page visibility
const usePageVisibility = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return isVisible;
};

//hook detects changes in page focus
const useTabVisibility = () => {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const handleTabChange = () => {
      setIsActive(!document.hidden);
    };

    window.addEventListener('focus', handleTabChange);
    window.addEventListener('blur', handleTabChange);

    return () => {
      window.removeEventListener('focus', handleTabChange);
      window.removeEventListener('blur', handleTabChange);
    };
  }, []);

  return isActive;
};

export const useUserNavigation = () => {
  const [hasNavigated, setHasNavigated] = useState(false);
  const isPageVisible = usePageVisibility();
  const isTabActive = useTabVisibility();

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = '';
      setHasNavigated(true);
    };

    const handleUnload = () => {
      setHasNavigated(true);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('unload', handleUnload);
    };
  }, []);

  return !isPageVisible || !isTabActive || hasNavigated;
};

