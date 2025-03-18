import { useEffect } from "react";

function useOutsideClick(ref, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      // If the click is outside the referenced element, trigger the callback
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on cleanup
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
}

export default useOutsideClick;

// explain why the importance of this line of code whenever this hook is used.
// const menuRef = useRef(null);
// The ref is set to null initialy bc it is set before rendering so their is no element to be assigned to. When the appropriate element, in this case the div container of the filter dropdown & fitler button, has rendered this menuRef variable is assigned to it.
