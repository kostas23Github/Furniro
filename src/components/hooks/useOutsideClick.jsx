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

// Where to use this hook.
// In most cases to close a pop-up or a modal by clicking outside of it. BUT outside of it there is the button, or element, that made it visible in the first place.
// SOLUTION -> use the hook at the parent of the trigger element. Also place the modal as a sibling of the trigger element. Place both items as the only childa of a parent(perhaps a div or an li element). If placed at the modal level, when the user clicks the trigger element, two things happen, a click outside the element & a click to the trigger element. So the modal is hidden & becomes visible effectively canceling each other out.
// For reference see UserActions.jsx li elements and their respective modals if present.

// Explain the importance of this line of code whenever this hook is used.
// const somenameRef = useRef(null);
// The ref is set to null initialy bc it is set before rendering so their is no element to be assigned to. When the appropriate element, in this case the div container of the filter dropdown & fitler button, has rendered this menuRef variable is assigned to it.
