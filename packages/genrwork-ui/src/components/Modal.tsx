import {
  type UIEventHandler,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
} from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { ModalProvider, useBsPrefix } from '../contexts/modal'
import { useTheme } from '../contexts/theme'
import { generateComponent } from '../generator'
import { Props as BaseProps, propTypes } from '../helpers'
import Fade from './Fade'
import ModalBody from './ModalBody'
import ModalFooter from './ModalFooter'
import ModalHeader from './ModalHeader'
import Portal from './Portal'

interface Props extends BaseProps {
  contentProps?: Omit<BaseProps, 'children'>;
  dialogProps?: Omit<BaseProps, 'children'>;
  show: boolean;
  toggle: UIEventHandler;
}

const Modal = forwardRef<HTMLElement, Props>(({
  as: Component = 'div',
  bsPrefix = 'modal',
  children,
  className,
  contentProps,
  dialogProps,
  show,
  toggle,
  ...controlledProps
}, ref) => {
  const { aliases } = useTheme()
  const [dialog, backdrop] = useMemo(() => [
    classNames(aliases(bsPrefix), className),
    classNames(aliases(bsPrefix + '-backdrop'), className),
  ], [aliases, bsPrefix, className])

  const handleKeydown = useCallback((ev: KeyboardEvent) => {
    if (ev.key == 'Escape' && ! ev.altKey && ! ev.ctrlKey && ! ev.shiftKey && ! ev.metaKey) {
      toggle(ev as any)
    }
  }, [])

  useEffect(() => {
    if (show) {
      document.addEventListener('keydown', handleKeydown)
    }

    return () => {
      if (show) {
        document.removeEventListener('keydown', handleKeydown)
      }
    }
  }, [show])

  const handleClick: UIEventHandler = ev => {
    if (ev.target == ev.currentTarget) {
      toggle(ev)
    }
  }

  return (
    <ModalProvider
      value={{ bsPrefix, toggle }}
    >
      <Portal>
        <Fade
          ref={ref}
          tagName={Component}
          in={show}
          style={{ display: 'block' }}
          {...controlledProps}
          onClick={handleClick}
          unmountOnExit
          className={dialog}
          role="dialog"
        >
          <ModalDialog {...dialogProps}>
            <ModalContent {...contentProps}>
              {children}
            </ModalContent>
          </ModalDialog>
        </Fade>
        <Fade
          in={show}
          unmountOnExit
          className={backdrop}
        />
      </Portal>
    </ModalProvider>
  )
})

const ModalContent = generateComponent({
  bsPrefix: ['modal', 'content'],
  useBsPrefix,
})

const ModalDialog = generateComponent({
  bsPrefix: ['modal', 'dialog'],
  useBsPrefix,
  role: 'document',
})

Modal.displayName = 'Modal'

Modal.propTypes = {
  ...propTypes,
  contentProps: PropTypes.shape(propTypes),
  dialogProps: PropTypes.shape(propTypes),
  show: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
}

export default Object.assign(Modal, {
  Body: ModalBody,
  Footer: ModalFooter,
  Header: ModalHeader as typeof ModalHeader,
})
