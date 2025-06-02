import { forwardRef, useMemo } from 'react'
import classNames from 'classnames'
import { useBsPrefix } from '../contexts/accordion'
import { useEventItem } from '../contexts/item'
import { useTheme } from '../contexts/theme'
import { type Props, propTypes } from '../helpers'
import AccordionCollapse from './AccordionCollapse'

const AccordionBody = forwardRef<HTMLElement, Props>(({
  as: Component = 'div',
  bsPrefix = 'body',
  className,
  ...controlledProps
}, ref) => {
  const prefix = useBsPrefix(bsPrefix, 'accordion')
  const { aliases } = useTheme()
  const {
    isActive,
    onEnter, onEntering, onEntered,
    onExit, onExiting, onExited,
  } = useEventItem()
  const cn = useMemo(() => classNames(aliases(prefix), className), [aliases, prefix, className])

  return (
    <AccordionCollapse
      onEnter={onEnter}
      onEntering={onEntering}
      onEntered={onEntered}
      onExit={onExit}
      onExiting={onExiting}
      onExited={onExited}
      show={isActive}
    >
      <Component
        ref={ref}
        {...controlledProps}
        className={cn}
      />
    </AccordionCollapse>
  )
})

AccordionBody.displayName = 'AccordionBody'

AccordionBody.propTypes = propTypes

export default AccordionBody
