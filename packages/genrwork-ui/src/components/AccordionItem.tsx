import { forwardRef, useMemo } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { useAccordion, useBsPrefix } from '../contexts/accordion'
import {
  type ItemProps,
  ItemProvider,
  type PropsWithActive,
  type PropsWithId,
} from '../contexts/item'
import { useTheme } from '../contexts/theme'
import { keyOfAny, propTypes } from '../helpers'

const AccordionItem = forwardRef<HTMLElement, PropsWithId | PropsWithActive>(({
  as: Component = 'div',
  bsPrefix = 'item',
  className,
  eventKey, isActive,
  onEnter, onEntering, onEntered,
  onExit, onExiting, onExited,
  ...controlledProps
}: ItemProps, ref) => {
  const prefix = useBsPrefix(bsPrefix, 'accordion')
  const { aliases } = useTheme()
  const { isActiveKey } = useAccordion()
  const cn = useMemo(() => classNames(aliases(prefix), className), [aliases, prefix, className])
  const contextValue = useMemo(() => (
    Object.assign(
      eventKey ? { eventKey, isActiveKey } : { isActive: isActive! },
      {
        onEnter, onEntering, onEntered,
        onExit, onExiting, onExited,
      }
    )
  ), [
    eventKey, isActive, isActiveKey,
    onEnter, onEntering, onEntered,
    onExit, onExiting, onExited,
  ])

  return (
    <ItemProvider value={contextValue}>
      <Component
        ref={ref}
        {...controlledProps}
        className={cn}
      />
    </ItemProvider>
  )
})

AccordionItem.displayName = 'AccordionItem'

AccordionItem.propTypes = {
  ...propTypes,
  eventKey: PropTypes.oneOfType(keyOfAny),
  isActive: PropTypes.bool,
  onEnter: PropTypes.func,
  onEntering: PropTypes.func,
  onEntered: PropTypes.func,
  onExit: PropTypes.func,
  onExiting: PropTypes.func,
  onExited: PropTypes.func,
}

export default AccordionItem
