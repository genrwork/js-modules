import { createContext, useContext } from 'react'
import { type UsePrefixHook, useBsPrefix as usePrefix } from '../helpers'

interface AlertContextValue {
  bsPrefix?: string;
}

const AlertContext = createContext<AlertContextValue>({})

export const AlertProvider = AlertContext.Provider

export const useBsPrefix: UsePrefixHook = (...args) => usePrefix(AlertContext, ...args)

export const useAlert = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { bsPrefix, ...rest } = useContext(AlertContext)

  return rest
}
