import { useCallback, useEffect, useRef, useState } from 'react'

export const useScrollAnchor = () => {
  const messagesRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const visibilityRef = useRef<HTMLDivElement>(null)

  const [isAtBottom, setIsAtBottom] = useState(true)
  const [isVisible, setIsVisible] = useState(false)

  const scrollToBottom = useCallback(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollIntoView({
        block: 'end',
        behavior: 'smooth'
      })
    }
  }, [])

  useEffect(() => {
    if (messagesRef.current && isAtBottom && !isVisible) {
      scrollToBottom()
    }
  }, [isAtBottom, isVisible, scrollToBottom])

  useEffect(() => {
    const { current } = scrollRef

    if (current) {
      const handleScroll = () => {
        const offset = 25
        const isAtBottom =
          current.scrollTop + current.clientHeight >= current.scrollHeight - offset

        setIsAtBottom(isAtBottom)
      }

      current.addEventListener('scroll', handleScroll, {
        passive: true
      })

      return () => {
        current.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  useEffect(() => {
    const handleVisibilityChange = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        setIsVisible(entry.isIntersecting)
      })
    }

    const observer = new IntersectionObserver(handleVisibilityChange, {
      rootMargin: '0px 0px -150px 0px'
    })

    if (visibilityRef.current) {
      observer.observe(visibilityRef.current)
    }

    return () => {
      if (visibilityRef.current) {
        observer.unobserve(visibilityRef.current)
      }
    }
  }, [])

  return {
    messagesRef,
    scrollRef,
    visibilityRef,
    scrollToBottom,
    isAtBottom,
    isVisible
  }
}
