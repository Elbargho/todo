import { useEffect } from "react";

export default function OutsideClickDetector(ref, action) {
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) action();
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside, false);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
