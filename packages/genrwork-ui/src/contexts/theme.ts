import classNames from 'classnames'
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
} from 'react'

export interface ThemeContextValue {
  aliases: CSSModuleClasses;
}

const ThemeContext = createContext<ThemeContextValue>({
  aliases: {}
})

export const ThemeProvider = ThemeContext.Provider

const aliasingTokens = (aliases: CSSModuleClasses, ...tokens: classNames.ArgumentArray) => (
  classNames(...tokens).split(' ').map(token => (
    aliases[token.toLowerCase().replace(/-./g, match => match.charAt(1).toUpperCase())]
    || aliases[token] || token
  )).join(' ')
)

export const useClassNames = (...tokens: classNames.ArgumentArray) => {
  const { aliases } = useContext(ThemeContext)
  const className = useMemo(() => (
    aliasingTokens(aliases, ...tokens)
  ), [aliases, ...tokens]) // react-hooks/exhaustive-deps spread deps

  return className
}

export const useTheme = () => {
  const { aliases, ...rest } = useContext(ThemeContext)
  const tokens = useCallback((...args: classNames.ArgumentArray) => (
    aliasingTokens(aliases, ...args)
  ), [aliases])

  return {
    aliases: tokens,
    ...rest
  }
}
