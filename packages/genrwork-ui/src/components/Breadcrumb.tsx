import { forwardRef, OlHTMLAttributes, useMemo } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { useTheme } from '../contexts/theme'
import { type Props as BaseProps, propTypes } from '../helpers'

interface Props extends BaseProps {
  label?: string;
  listProps?: OlHTMLAttributes<HTMLOListElement>;
}

const Breadcrumb = forwardRef<HTMLElement, Props>(({
  as: Component = 'nav',
  bsPrefix = 'breadcrumb',
  children,
  className,
  label = 'breadcrumb',
  listProps,
  ...props
}, ref) => {
  const { aliases } = useTheme()
  const cn = useMemo(() => classNames(aliases(bsPrefix), listProps?.className), [aliases, bsPrefix, className])

  return (
    <Component
      aria-label={label}
      className={className}
      ref={ref}
      {...props}
    >
      <ol
        {...listProps}
        className={cn}
      >
        {children}
      </ol>
    </Component>
  )
})

Breadcrumb.displayName = 'Breadcrumb'

Breadcrumb.propTypes = {
  ...propTypes,
  label: PropTypes.string,
  listProps: PropTypes.object,
}

export default Breadcrumb
