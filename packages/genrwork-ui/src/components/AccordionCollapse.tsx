import { forwardRef, useMemo } from 'react'
import classNames from 'classnames'
import { useBsPrefix } from '../contexts/accordion'
import { useTheme } from '../contexts/theme'
import { type CollapseProps, propTypes } from '../helpers'
import Collapse from './Collapse'

const AccordionCollapse = forwardRef<HTMLElement, CollapseProps>(({
  bsPrefix = 'collapse',
  className,
  ...rest
}, ref) => {
  const prefix = useBsPrefix(bsPrefix, 'accordion')
  const { aliases } = useTheme()
  const cn = useMemo(() => classNames(aliases(prefix), className), [aliases, prefix, className])

  return <Collapse ref={ref} {...rest} className={cn} />
})

AccordionCollapse.displayName = 'AccordionCollapse'

AccordionCollapse.propTypes = propTypes

export default AccordionCollapse
