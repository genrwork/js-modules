import { forwardRef, useMemo } from 'react'
import classNames from 'classnames'
import { useBsPrefix } from '../contexts/accordion'
import { useTheme } from '../contexts/theme'
import { type Props, propTypes } from '../helpers'
import AccordionButton from './AccordionButton'

const AccordionHeader = forwardRef<HTMLElement, Props>(({
  as: Component = 'h2',
  bsPrefix = 'header',
  className,
  children,
  onClick,
  ...props
}, ref) => {
  const prefix = useBsPrefix(bsPrefix, 'accordion')
  const { aliases } = useTheme()
  const cn = useMemo(() => classNames(aliases(prefix), className), [aliases, prefix, className])

  return (
    <Component
      ref={ref}
      {...props}
      className={cn}
    >
      <AccordionButton onClick={onClick}>
        {children}
      </AccordionButton>
    </Component>
  )
})

AccordionHeader.displayName = 'AccordionHeader'

AccordionHeader.propTypes = propTypes

export default AccordionHeader
