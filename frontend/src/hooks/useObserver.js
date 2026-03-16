import { useEffect, useRef } from "react"

export const useObserver = (ref, callback, isLoading, canLoad = true) => {
    const observer = useRef()

    useEffect(() => {
        if (isLoading || !ref.current) return;
        if (observer.current) observer.current.disconnect();

        const callbackObserver = function ([entry]) {
            if (entry.isIntersecting && canLoad) {
                callback()
            }
        }

        observer.current = new IntersectionObserver(callbackObserver, {rootMargin: '50px'})
        observer.current.observe(ref.current)
    }, [isLoading, canLoad, callback, ref])
}