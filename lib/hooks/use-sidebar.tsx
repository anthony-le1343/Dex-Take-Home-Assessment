import * as React from 'react'

const LOCAL_STORAGE_KEY = 'sidebar'

interface SidebarContext {
  isSidebarOpen: boolean
  toggleSidebar: () => void
  isLoading: boolean
}

const defaultSidebarContext: SidebarContext = {
  isSidebarOpen: false,
  toggleSidebar: () => {},
  isLoading: true
}

const SidebarContext = React.createContext<SidebarContext>(defaultSidebarContext)

export function useSidebarContext() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebarContext must be used within a SidebarProvider')
  }
  return context
}

interface SidebarProviderProps {
  children: React.ReactNode
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [isSidebarOpen, setSidebarOpen] = React.useState(true)
  const [isLoading, setLoading] = React.useState(true)

  React.useEffect(() => {
    try {
      const value = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (value) {
        setSidebarOpen(JSON.parse(value))
      }
    } catch (error) {
      console.error('Error accessing local storage:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const toggleSidebar = () => {
    setSidebarOpen(value => {
      const newState = !value
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState))
      return newState
    })
  }

  if (isLoading) {
    return null // or loading indicator
  }

  return (
    <SidebarContext.Provider
      value={{ isSidebarOpen, toggleSidebar, isLoading }}
    >
      {children}
    </SidebarContext.Provider>
  )
}
