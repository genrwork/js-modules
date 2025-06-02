import {
  type ElementType,
  type HTMLAttributes,
  forwardRef,
  useMemo,
} from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { useTheme } from './contexts/theme'
import type { Props as ComponentProps } from './helpers'

interface BaseProp extends HTMLAttributes<HTMLElement> {
  exotic?: ExoticComponent;
  tagName?: ElementType;
}

interface ExoticComponent {
  displayName?: string;
  propTypes?: unknown;
}

interface CommonProps extends BaseProp {
  bsPrefix: string;
  useBsPrefix?: never;
}

type Props = CommonProps | SubProps

interface SubProps extends BaseProp {
  bsPrefix: [string, string];
  useBsPrefix(prefix: string, defaultPrefix: string): string;
}

export const generateComponent = ({
  tagName = 'div',
  bsPrefix: initPrefix,
  exotic,
  useBsPrefix,
  ...rest
}: Props, displayName?: string) => {
  const component = forwardRef<HTMLElement, ComponentProps>(({
    as: Component = tagName,
    bsPrefix = useBsPrefix ? initPrefix.reduce((a, b) => b || a) : initPrefix,
    className,
    ...controlledProps
  }, ref) => {
    const prefix = useBsPrefix?.(bsPrefix, initPrefix[0]) || bsPrefix
    const { aliases } = useTheme()
    const cn = useMemo(() => classNames(aliases(prefix), className), [aliases, prefix, className])
  
    return (
      <Component
        ref={ref}
        {...rest}
        {...controlledProps}
        className={cn}
      />
    )
  })

  if (displayName) {
    component.displayName = displayName
  
    component.propTypes = {
      as: PropTypes.elementType,
      bsPrefix: PropTypes.string,
    }
  }

  return component
}
