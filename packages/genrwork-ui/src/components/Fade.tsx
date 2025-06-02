import {
  type ElementType,
  type HTMLAttributes,
  forwardRef,
  useCallback,
  useRef,
} from 'react'
import useMergedRefs from '@restart/hooks/useMergedRefs'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Transition, { ENTERING, ENTERED } from 'react-transition-group/Transition'
import { useTheme } from '../contexts/theme'

interface FadeProps extends HTMLAttributes<HTMLElement> {
  tagName?: ElementType;
  in: boolean;
}

interface AFadeProps extends FadeProps {
  onExit?(): void;
  unmountOnExit?: boolean;
}

type Props = PropsWithExit | PropsWithUnmount

interface PropsWithExit extends FadeProps {
  onExit(): void;
  unmountOnExit?: false;
}

interface PropsWithUnmount extends FadeProps {
  unmountOnExit: true;
}

const fadeStyles = {
  [ENTERING]: 'show',
  [ENTERED]: 'show',
}

const Fade = forwardRef<HTMLElement, Props>((props, ref) => {
  const { aliases } = useTheme()
  const nodeRef = useRef<HTMLElement>(null)
  const mergedRef = useMergedRefs(ref, nodeRef)

  const transitionEnd = useCallback((done: () => void) => {
    nodeRef.current?.addEventListener('transitionend', done, { once: true })
  }, [])

  const {
    tagName: Component = 'div',
    className,
    in: show,
    onExit,
    unmountOnExit = false,
    ...controlledProps
  } = props as AFadeProps

  return (
    <Transition
      nodeRef={nodeRef}
      in={show}
      timeout={300}
      addEndListener={transitionEnd}
      unmountOnExit={unmountOnExit}
      onExited={onExit}
    >
      {status => (
        <Component
          ref={mergedRef}
          {...controlledProps}
          className={classNames(
            className,
            aliases(
              'fade',
              fadeStyles[status],
            )
          )}
        />
      )}
    </Transition>
  )
})

Fade.displayName = 'Fade'

Fade.propTypes = {
  tagName: PropTypes.elementType,
  bsPrefix: PropTypes.string,
  dimension: PropTypes.string,
  onExit: PropTypes.func,
  unmountOnExit: PropTypes.bool,
  in: PropTypes.bool.isRequired,
}

export default Fade
