import { forwardRef, useMemo } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { useBsPrefix, useModal } from '../contexts/modal'
import { useTheme } from '../contexts/theme'
import { propTypes, type Props as BaseProps } from '../helpers'
import CloseButton from './CloseButton'
import ModalTitle from './ModalTitle'

interface Props extends BaseProps {
  titleProps?: Omit<BaseProps, 'children'>;
}

const ModalHeader = forwardRef<HTMLElement, Props>(({
  as: Component = 'div',
  bsPrefix = 'header',
  children,
  className,
  titleProps,
  ...controlledProps
}, ref) => {
  const prefix = useBsPrefix(bsPrefix, 'modal')
  const { toggle } = useModal()
  const { aliases } = useTheme()
  const cn = useMemo(() => classNames(aliases(prefix), className), [aliases, prefix, className])

  return (
    <Component
      ref={ref}
      {...controlledProps}
      className={cn}
    >
      <ModalTitle {...titleProps}>
        {children}
      </ModalTitle>
      <CloseButton onClick={toggle} />
    </Component>
  )
})

ModalHeader.displayName = 'ModalHeader'

ModalHeader.propTypes = {
  ...propTypes,
  titleProps: PropTypes.shape(propTypes),
}

export default ModalHeader
