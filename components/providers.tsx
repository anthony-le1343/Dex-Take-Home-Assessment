import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'
import { UseSidebarProvider } from '@/lib/hooks/use-sidebar'
import { UseTooltipProvider } from '@/components/ui/tooltip'

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <UseSidebarProvider>
        <UseTooltipProvider>{children}</UseTooltipProvider>
      </UseSidebarProvider>
    </NextThemesProvider>
  )
}
