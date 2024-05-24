import * as React from 'react'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { UIState } from '@/lib/chat/actions'
import { Session } from '@/lib/types'
import { toast } from 'sonner'

export interface ChatListProps {
  messages: UIState
  session?: Session
  isShared: boolean
  callFunction: (functionName: string) => void // Function to call Assistants API function
}

export function ChatList({ messages, session, isShared, callFunction }: ChatListProps) {
  if (!messages.length) {
    return null
  }

  const handleFunctionCall = (message: string) => {
    // Example: Trigger function call if message contains specific keyword
    if (message.includes('keyword')) {
      const functionName = 'your_function_name_here';
      callFunction(functionName);
    }
  };

  return (
    <div className="relative mx-auto max-w-2xl px-4">
      {!isShared && !session ? (
        <>
          <div className="group relative mb-4 flex items-start md:-ml-12">
            <div className="bg-background flex size-[25px] shrink-0 select-none items-center justify-center rounded-md border shadow-sm">
              <ExclamationTriangleIcon />
            </div>
            <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
              <p className="text-muted-foreground leading-normal">
                Please{' '}
                <Link href="/login" className="underline">
                  log in
                </Link>{' '}
                or{' '}
                <Link href="/signup" className="underline">
                  sign up
                </Link>{' '}
                to save and revisit your chat history!
              </p>
            </div>
          </div>
          <Separator className="my-4" />
        </>
      ) : null}

      {messages.map((message, index) => (
        <div key={message.id}>
          {message.display}
          {handleFunctionCall(message.text)} {/* Trigger function call */}
          {index < messages.length - 1 && <Separator className="my-4" />}
        </div>
      ))}
    </div>
  )
}
