import { useEffect } from "react"

import { resetTitle, setTitle } from "./Helpers"

/**
 * Hook for setting the title of the current document.
 */
export const useTitle = (title: string) => {
    useEffect(() => {
        setTitle("BoreScore - " + title)

        return () => {
            resetTitle()
        }
    }, [title])
}
