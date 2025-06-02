import { type UIEvent, forwardRef, useCallback, useMemo } from 'react'
import classNames from 'classnames'
import { useAccordion, useBsPrefix } from '../contexts/accordion'
import { useEventItem } from '../contexts/item'
import { useTheme } from '../contexts/theme'
import { type Props, propTypes } from '../helpers'

const AccordionButton = forwardRef<HTMLElement, Props>(({
  as: Component = 'button',
  bsPrefix = 'button',
  className,
  onClick,
  ...controlledProps
}, ref) => {
  const prefix = useBsPrefix(bsPrefix, 'accordion')
  const { aliases } = useTheme()
  const { onSelect } = useAccordion()
  const { eventKey, isActive } = useEventItem()
  const handleClick = useCallback((ev: UIEvent) => {
    if (typeof onClick == 'function') {
      setTimeout(onClick, 0, ev)
    }
    if (eventKey) {
      onSelect?.(eventKey)
    }
  }, [eventKey, onClick, onSelect])
  const cn = useMemo(() => classNames(
    aliases(
      prefix,
      !isActive && 'collapsed',
    ),
    className
  ), [aliases, prefix, isActive, className])

  return (
    <Component
      ref={ref}
      onClick={handleClick}
      {...controlledProps}
      className={cn}
    />
  )
})

AccordionButton.displayName = 'AccordionButton'

AccordionButton.propTypes = propTypes

export default AccordionButton

