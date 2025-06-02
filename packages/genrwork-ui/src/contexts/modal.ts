import { type UIEventHandler, useContext, createContext } from 'react'
import { type UsePrefixHook, useBsPrefix as usePrefix } from '../helpers'

interface ModalContextValue {
  bsPrefix?: string;
  toggle?: UIEventHandler;
}

const ModalContext = createContext<ModalContextValue>({})

export const ModalProvider = ModalContext.Provider

export const useBsPrefix: UsePrefixHook = (...args) => usePrefix(ModalContext, ...args)

export const useModal = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { bsPrefix, ...rest } = useContext(ModalContext)

  return rest
}
