import { createContext, useContext, useMemo } from 'react'
import type { Props as BaseProps, TransitionHandlers, EventKey } from '../helpers'

interface ActiveStatusContext {
  isActive: boolean;
}

interface EventKeyContext {
  eventKey: EventKey;
  isActiveKey(eventKey: EventKey): boolean;
}

type ItemContextValue = 
  | (Required<EventKeyContext> & Partial<ActiveStatusContext>)
  | (Partial<EventKeyContext> & Required<ActiveStatusContext>)

export interface ItemProps extends
  BaseProps,
  TransitionHandlers,
  Partial<Pick<PropsWithId, 'eventKey'>>,
  Partial<Pick<PropsWithActive, 'isActive'>> {}

export interface PropsWithId extends BaseProps, TransitionHandlers {
  eventKey: EventKey;
}

export interface PropsWithActive extends BaseProps, TransitionHandlers {
  isActive: boolean;
}

const ItemContext = createContext<TransitionHandlers & ItemContextValue>({
  eventKey: '',
  isActiveKey: () => false,
})

export const ItemProvider = ItemContext.Provider

export const useEventItem = () => {
  const { eventKey, isActive, isActiveKey, ...rest } = useContext(ItemContext)
  const activated = useMemo(() => (
    eventKey
    ? isActiveKey!(eventKey)
    : isActive!
  ), [eventKey, isActive, isActiveKey])

  return { isActive: activated, eventKey, ...rest }
}
