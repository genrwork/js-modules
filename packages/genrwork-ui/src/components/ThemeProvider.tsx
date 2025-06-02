import { type ReactNode, useMemo } from 'react'
import { type ThemeContextValue, ThemeProvider as OriginProvider } from '../contexts/theme'

interface ThemeProviderProps extends Partial<ThemeContextValue> {
  children: ReactNode;
}

const ThemeProvider = ({
  aliases = {},
  children,
}: ThemeProviderProps) => {
  const contextValue = useMemo<ThemeContextValue>(() => ({
    aliases: Object.freeze(aliases)
  }), [aliases])

  return (
    <OriginProvider value={contextValue}>
      {children}
    </OriginProvider>
  )
}

export default ThemeProvider
