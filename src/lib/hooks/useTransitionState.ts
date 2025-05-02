import { useState, useEffect } from 'react'

export const useTransitionState = (
  isVisible: boolean,
  hideDelay: number = 300
): boolean => {
  const [showElement, setShowElement] = useState(isVisible)

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (isVisible) {
      setShowElement(true)
    } else {
      timer = setTimeout(() => {
        setShowElement(false)
      }, hideDelay)
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [isVisible, hideDelay])

  return showElement
}
