import * as React from 'react'
import { Button, type ButtonProps } from '@/components/ui/button'
import { IconArrowDown } from '@/components/ui/icons'
import { toast } from 'sonner'

interface ButtonScrollToBottomProps extends ButtonProps {
  isAtBottom: boolean
  scrollToBottom: () => void
  callFunction: (functionName: string) => void // Function to call Assistants API function
}

export function ButtonScrollToBottom({
  className,
  isAtBottom,
  scrollToBottom,
  callFunction,
  ...props
}: ButtonScrollToBottomProps) {
  const handleButtonClick = () => {
    if (!isAtBottom) {
      scrollToBottom();
    } else {
      // If the user is at the bottom, trigger a function call
      const functionName = 'your_function_name_here';
      callFunction(functionName);
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        'absolute right-4 top-1 z-10 bg-background transition-opacity duration-300 sm:right-8 md:top-2',
        isAtBottom ? 'opacity-0' : 'opacity-100',
        className
      )}
      onClick={handleButtonClick}
      {...props}
    >
      <IconArrowDown />
      <span className="sr-only">Scroll to bottom</span>
    </Button>
  )
}
