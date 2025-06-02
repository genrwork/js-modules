import { type AnchorHTMLAttributes, forwardRef, useMemo } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { useBsPrefix } from '../contexts/alert'
import { useTheme } from '../contexts/theme'

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  bsPrefix?: string;
}

const AlertLink = forwardRef<HTMLAnchorElement, Props>(({
  bsPrefix = 'link',
  className,
  ...controlledProps
}, ref) => {
  const prefix = useBsPrefix(bsPrefix, 'alert')
  const { aliases } = useTheme()
  const cn = useMemo(() => classNames(aliases(prefix), className), [aliases, prefix, className])

  return (
    <a
      ref={ref}
      {...controlledProps}
      className={cn}
    />
  )
})

AlertLink.displayName = 'AlertLink'

AlertLink.propTypes = {
  bsPrefix: PropTypes.string,
}

export default AlertLink
