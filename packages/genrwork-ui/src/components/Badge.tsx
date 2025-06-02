import { forwardRef, useMemo } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { useTheme } from '../contexts/theme'
import {
  type Props as BaseProps,
  type Variant,
  oneOfVariant,
  propTypes,
} from '../helpers'

interface Props extends BaseProps {
  bg?: Variant;
  text?: Variant;
  pill?: boolean;
}

const Badge = forwardRef<HTMLElement, Props>(({
  as: Component = 'span',
  bg = 'primary',
  bsPrefix = 'badge',
  className,
  pill = false,
  text,
  ...controlledProps
}, ref) => {
  const { aliases } = useTheme()
  const cn = useMemo(() => classNames(
    aliases(
      bsPrefix,
      pill && 'rounded-pill',
      text && `text-${text}`,
      bg && `bg-${bg}`,
    ),
    className
  ), [aliases, bsPrefix, pill, text, bg, className])

  return (
    <Component
      ref={ref}
      {...controlledProps}
      className={cn}
    />
  )
})

Badge.displayName = 'Badge'

Badge.propTypes = {
  ...propTypes,
  bg: PropTypes.oneOf(oneOfVariant),
  pill: PropTypes.bool,
  text: PropTypes.oneOf(oneOfVariant),
}

export default Badge
