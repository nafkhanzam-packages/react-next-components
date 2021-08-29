import {useEffect} from "react";

export const useLeaveWarn = () => {
  useEffect(() => {
    window.addEventListener("beforeunload", function (e) {
      e.preventDefault();
      e.returnValue = "";
    });
  }, []);
};
