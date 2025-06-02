import { forwardRef, useMemo } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { AccordionProvider } from '../contexts/accordion'
import { useTheme } from '../contexts/theme'
import {
  type Props as BaseProps,
  type EventKey,
  type EventKeys,
  keyOfAny,
  propTypes,
} from '../helpers'
import AccordionBody from './AccordionBody'
import AccordionHeader from './AccordionHeader'
import AccordionItem from './AccordionItem'

interface Props extends Omit<BaseProps, 'onSelect'> {
  activeKey?: EventKeys;
  onSelect?(eventKey: EventKey): void;
}

const Accordion = forwardRef<HTMLElement, Props>(({
  as: Component = 'div',
  activeKey,
  bsPrefix = 'accordion',
  className,
  onSelect,
  ...controlledProps
}, ref) => {
  const { aliases } = useTheme()
  const cn = useMemo(() => classNames(aliases(bsPrefix), className), [aliases, bsPrefix, className])

  return (
    <AccordionProvider
      value={{
        activeEventKey: activeKey,
        bsPrefix,
        onSelect,
      }}
    >
      <Component
        ref={ref}
        {...controlledProps}
        className={cn}
      />
    </AccordionProvider>
  )
})

Accordion.displayName = 'Accordion'

Accordion.propTypes = {
  ...propTypes,
  activeKey: PropTypes.oneOfType([
    ...keyOfAny,
    PropTypes.arrayOf(PropTypes.oneOfType(
      keyOfAny.map(t => t.isRequired)
    ).isRequired),
  ]),
  onSelect: PropTypes.func,
}

export default Object.assign(Accordion, {
  Body: AccordionBody,
  Header: AccordionHeader,
  Item: AccordionItem,
})
