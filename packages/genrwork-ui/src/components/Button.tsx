import {
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ElementType,
  forwardRef,
  useMemo,
} from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { useTheme } from '../contexts/theme'
import {
  type ButtonVariant,
  oneOfButtonVariant,
  propTypes,
  trimDash,
} from '../helpers'

type AnchorProps = Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'target'>

interface BsAnchorProps
  extends AnchorHTMLAttributes<HTMLElement>,
    BsProps {
}

interface BsButtonProps
  extends ButtonHTMLAttributes<HTMLElement>,
    BsProps {
}

interface BsProps {
  active?: boolean;
  as?: ElementType;
  bsPrefix?: string;
  variant?: ButtonVariant;
}

const Button = forwardRef<HTMLElement, BsAnchorProps | BsButtonProps>(({
  as: Component = 'button',
  bsPrefix = 'btn',
  className,
  variant = 'primary',
  ...controlledProps
}, ref) => {
  const { aliases } = useTheme()
  const cn = useMemo(() => classNames(
    aliases(
      trimDash(bsPrefix),
      trimDash(bsPrefix) + '-' + trimDash(variant),
    ),
    className
  ), [aliases, bsPrefix, variant, className])

  if ((controlledProps as AnchorProps).href || (controlledProps as AnchorProps).target || controlledProps.rel) {
    Component = 'a'
  }

  return (
    <Component
      ref={ref}
      {...controlledProps}
      className={cn}
    />
  )
})

Button.displayName = 'Button'

Button.propTypes = {
  ...propTypes,
  active: PropTypes.bool,
  variant: PropTypes.oneOf(oneOfButtonVariant),
}

export default Button
