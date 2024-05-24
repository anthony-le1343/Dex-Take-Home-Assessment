import * as React from 'react'

export interface useCopyToClipboardProps {
  timeout?: number
}

export function useCopyToClipboard({
  timeout = 2000
}: useCopyToClipboardProps) {
  const [isCopied, setIsCopied] = React.useState<boolean>(false)

  const copyToClipboard = React.useCallback((value: string) => {
    if (typeof window === 'undefined' || !navigator.clipboard?.writeText) {
      return
    }

    if (!value) {
      return
    }

    navigator.clipboard.writeText(value).then(() => {
      setIsCopied(true)

      setTimeout(() => {
        setIsCopied(false)
      }, timeout)
    }).catch((error) => {
      console.error('Failed to copy to clipboard:', error)
      // Handle error (e.g., display error message to the user)
    })
  }, [timeout])

  return { isCopied, copyToClipboard }
}
