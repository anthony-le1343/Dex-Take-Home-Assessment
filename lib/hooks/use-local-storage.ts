import { useEffect, useState } from 'react'

export const useLocalStorage = <T extends unknown>(
  key: string,
  initialValue: T
): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Retrieve from localStorage
      const item = window.localStorage.getItem(key)
      // Parse stored JSON or return initialValue
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error('Error retrieving data from localStorage:', error)
      return initialValue
    }
  })

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.storageArea === window.localStorage && event.key === key) {
        try {
          setStoredValue(event.newValue ? JSON.parse(event.newValue) : initialValue)
        } catch (error) {
          console.error('Error parsing data from localStorage:', error)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [initialValue, key])

  const setValue = (value: T) => {
    try {
      // Save state
      setStoredValue(value)
      // Save to localStorage
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Error saving data to localStorage:', error)
    }
  }

  return [storedValue, setValue]
}
