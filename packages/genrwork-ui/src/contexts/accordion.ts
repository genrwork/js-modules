import {
  createContext,
  useCallback,
  useContext,
} from 'react'
import {
  type EventKey,
  type EventKeys,
  type UsePrefixHook,
  useBsPrefix as usePrefix,
} from '../helpers'

interface AccordionContextValue {
  activeEventKey?: EventKeys;
  bsPrefix?: string;
  onSelect?(eventKey: EventKey): void;
}

const AccordionContext = createContext<AccordionContextValue>({})

export const AccordionProvider = AccordionContext.Provider

export const useAccordion = () => {
  const { activeEventKey, onSelect } = useContext(AccordionContext)
  const isActiveKey = useCallback((eventKey: EventKey) => (
    (activeEventKey && typeof activeEventKey == 'object' && 'includes' in activeEventKey)
    ? activeEventKey.includes(eventKey)
    : (activeEventKey ? activeEventKey == eventKey : false)
  ), [activeEventKey])

  return { isActiveKey, onSelect }
}

export const useBsPrefix: UsePrefixHook = (...args) => usePrefix(AccordionContext, ...args)
