import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useBackListener = (callback) => {
  const location = useLocation();

  useEffect(() => {
    const handlePopState = (e) => {
      e.preventDefault();
      console.log('handling pop state');
      if (location.key !== "default") {

        // if (someCondition === true) callback();
        // else {
        //   doSomethingElse();
        // }
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [location, callback]);
};

