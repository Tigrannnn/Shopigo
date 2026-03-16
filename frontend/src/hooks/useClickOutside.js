import { useEffect, useRef } from 'react';

/**
 * Hook that detects clicks outside of the passed element
 * @param {Function} callback - Function to call when click outside is detected
 * @returns {Object} ref - Ref to attach to the element
 */
function useClickOutside(callback, options = {}) {
    // options.ignoreSelector - CSS selector for elements that should NOT
    // trigger the callback even if they are outside the ref container.
    const { ignoreSelector } = options;
    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            const target = event.target;

            // if target or any of its parents match the ignore selector, skip
            if (
                ignoreSelector &&
                target.closest &&
                target.closest(ignoreSelector)
            ) {
                return;
            }

            if (ref.current && !ref.current.contains(target)) {
                callback(event);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [callback, ignoreSelector]);

    return ref;
}

export default useClickOutside;
