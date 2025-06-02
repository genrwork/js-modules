import { AnchorHTMLAttributes, forwardRef, useMemo } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { useTheme } from '../contexts/theme'
import { type Props as BaseProps, propTypes } from '../helpers'

interface Props extends
  BaseProps,
  Pick<AnchorHTMLAttributes<never>, 'href' | 'target' | 'title'> {
  active?: boolean;
}

const BreadcrumbItem = forwardRef<HTMLElement, Props>(({
  active = false,
  as: Component = 'li',
  bsPrefix = 'breadcrumb-item',
  children,
  className,
  href,
  target,
  title,
  ...props
}, ref) => {
  const { aliases } = useTheme()
  const cn = useMemo(() => classNames(aliases(bsPrefix), className), [aliases, bsPrefix, className])

  return (
    <Component
      className={cn}
      ref={ref}
      {...props}
    >
      <a
        href={href}
        target={target}
        title={title}
      >
        {children}
      </a>
    </Component>
  )
})

BreadcrumbItem.displayName = 'BreadcrumbItem'

BreadcrumbItem.propTypes = {
  ...propTypes,
  active: PropTypes.bool,
}

export default BreadcrumbItem
