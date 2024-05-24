import { useRef, useEffect, useCallback, RefObject } from 'react'

export function useEnterSubmit<T extends HTMLElement>(): {
  inputRef: RefObject<T>
  onKeyDown: (event: React.KeyboardEvent<T>) => void
} {
  const inputRef = useRef<T>(null)

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<T>): void => {
      if (
        event.key === 'Enter' &&
        !event.shiftKey &&
        !event.nativeEvent.isComposing
      ) {
        inputRef.current?.form?.requestSubmit()
        event.preventDefault()
      }
    },
    []
  )

  useEffect(() => {
    const input = inputRef.current
    if (!input) return

    input.addEventListener('keydown', handleKeyDown)

    return () => {
      input.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  return { inputRef, onKeyDown: handleKeyDown }
}
