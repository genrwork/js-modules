import { forwardRef, useCallback, useRef } from 'react'
import useMergedRefs from '@restart/hooks/useMergedRefs'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Transition, {
  EXITED,
  EXITING,
  ENTERING,
  ENTERED,
} from 'react-transition-group/Transition'
import { useTheme } from '../contexts/theme'
import { type CollapseProps, propTypes, reflow } from '../helpers'

const collapseStyles = {
  [EXITED]: 'collapse',
  [EXITING]: 'collapsing',
  [ENTERING]: 'collapsing',
  [ENTERED]: 'collapse show',
}

const Collapse = forwardRef<HTMLElement, Omit<CollapseProps, 'bsPrefix'>>(({
  as: Component = 'div',
  className,
  dimension = 'height',
  onExit, onExiting, onExited,
  onEnter, onEntering, onEntered,
  show,
  ...controlledProps
}, ref) => {
  const { aliases } = useTheme()
  const nodeRef = useRef<HTMLElement>(null)
  const mergedRef = useMergedRefs(ref, nodeRef)

  const computedDimension =
    typeof dimension == 'function' ? dimension() : dimension;

  const handleEnter = useCallback(() => {
    if (typeof onEnter == 'function') {
      requestAnimationFrame(onEnter)
    }
    nodeRef.current!.style[computedDimension] = '0'
  }, [computedDimension, onEnter])

  const handleEntering = useCallback(() => {
    const elem = nodeRef.current!
    const scrollSize = 'scroll' + computedDimension[0].toUpperCase() + computedDimension.slice(1)
    if (typeof onEntering == 'function') {
      requestAnimationFrame(onEntering)
    }
    elem.style[computedDimension] = elem[scrollSize] + 'px';
  }, [computedDimension, onEntering])

  const handleEntered = useCallback(() => {
    if (typeof onEntered == 'function') {
      requestAnimationFrame(onEntered)
    }
    nodeRef.current!.style[computedDimension] = ''
  }, [computedDimension, onEntered])

  const handleExit = useCallback(() => {
    const elem = nodeRef.current!
    if (typeof onExit == 'function') {
      requestAnimationFrame(onExit)
    }
    elem.style[computedDimension] = elem.getBoundingClientRect()[computedDimension] + 'px'
    reflow(elem)
  }, [computedDimension, onExit])

  const handleExiting = useCallback(() => {
    if (typeof onExiting == 'function') {
      requestAnimationFrame(onExiting)
    }
    nodeRef.current!.style[computedDimension] = ''
  }, [computedDimension, onExiting])

  return (
    <Transition
      timeout={300}
      in={show}
      onEnter={handleEnter}
      onEntering={handleEntering}
      onEntered={handleEntered}
      onExit={handleExit}
      onExiting={handleExiting}
      onExited={onExited}
      nodeRef={nodeRef}
      unmountOnExit={false}
    >
      {state => (
        <Component
          ref={mergedRef}
          {...controlledProps}
          className={classNames(
            className,
            aliases(
              collapseStyles[state],
              computedDimension == 'width' && 'collapse-horizontal',
            )
          )}
        />
      )}
    </Transition>
  )
})

Collapse.displayName = 'Collapse'

Collapse.propTypes = {
  ...propTypes,
  dimension: PropTypes.string,
  onExit: PropTypes.func,
  onExiting: PropTypes.func,
  onExited: PropTypes.func,
  onEnter: PropTypes.func,
  onEntering: PropTypes.func,
  onEntered: PropTypes.func,
  show: PropTypes.bool.isRequired,
}

export default Collapse

