'use client'

import { type Message } from 'ai'
import { useState } from 'react'; // Import useState hook
import { Button } from '@/components/ui/button'
import { IconCheck, IconCopy } from '@/components/ui/icons'
import { useCopyToClipboard } from '@/lib/hooks/use-copy-to-clipboard'
import { cn } from '@/lib/utils'

interface ChatMessageActionsProps extends React.ComponentProps<'div'> {
  message: Message
  callFunction: (functionName: string) => void // Function to call Assistants API function
}

export function ChatMessageActions({
  message,
  className,
  callFunction, // Add callFunction prop
  ...props
}: ChatMessageActionsProps) {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 })

  const onCopy = () => {
    if (isCopied) return
    copyToClipboard(message.content)
  }

  // Define function to handle function call
  const handleFunctionCall = () => {
    // Example: Trigger function call when the button is clicked
    const functionName = 'your_function_name_here';
    callFunction(functionName);
  };

  return (
    <div
      className={cn(
        'flex items-center justify-end transition-opacity group-hover:opacity-100 md:absolute md:-right-10 md:-top-2 md:opacity-0',
        className
      )}
      {...props}
    >
      <Button variant="ghost" size="icon" onClick={onCopy}>
        {isCopied ? <IconCheck /> : <IconCopy />}
        <span className="sr-only">Copy message</span>
      </Button>
      
      {/* Button to trigger function call */}
      <Button variant="ghost" size="icon" onClick={handleFunctionCall}>
        {/* Add appropriate icon */}
        {/* Add appropriate aria-label */}
        <span className="sr-only">Trigger function</span>
      </Button>
    </div>
  )
}
