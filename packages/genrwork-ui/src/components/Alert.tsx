import { type UIEventHandler, forwardRef, useMemo } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { AlertProvider } from '../contexts/alert'
import { useTheme } from '../contexts/theme'
import {
  type Props as BaseProps,
  type Variant,
  oneOfVariant,
  propTypes,
  trimDash,
} from '../helpers'
import AlertHeading from './AlertHeading'
import AlertLink from './AlertLink'
import CloseButton from './CloseButton'

interface Props extends BaseProps {
  onClose?: UIEventHandler;
  variant: Variant;
}

const Alert = forwardRef<HTMLButtonElement, Props>(({
  as: Component = 'div',
  bsPrefix = 'alert',
  children,
  className,
  onClose,
  variant,
  ...controlledProps
}, ref) => {
  const { aliases } = useTheme()
  const cn = useMemo(() => classNames(
    aliases(
      trimDash(bsPrefix),
      trimDash(bsPrefix) + '-' + trimDash(variant),
      onClose && trimDash(bsPrefix) + '-dismissible',
    ),
    className
  ), [aliases, bsPrefix, variant, className])

  return (
    <AlertProvider value={{ bsPrefix }}>
      <Component
        ref={ref}
        {...controlledProps}
        className={cn}
        role="alert"
      >
        {onClose ? (
          <>
            <CloseButton onClick={onClose} />
            {children}
          </>
        ) : children }
      </Component>
    </AlertProvider>
  )
})

Alert.displayName = 'Alert'

Alert.propTypes = {
  ...propTypes,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(oneOfVariant).isRequired,
}

export default Object.assign(Alert, {
  Heading: AlertHeading,
  Link: AlertLink as typeof AlertLink,
})
