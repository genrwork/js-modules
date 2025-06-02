import { type FormHTMLAttributes, forwardRef, useMemo } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { useTheme } from '../contexts/theme'
import FormCheck from './FormCheck'
import FormControl from './FormControl'
import FormGroup from './FormGroup'
import FormLabel from './FormLabel'

interface Props extends FormHTMLAttributes<HTMLFormElement> {
  validated?: boolean;
}

const Form = forwardRef<HTMLFormElement, Props>(({
  className,
  validated,
  ...controlledProps
}, ref) => {
  const { aliases } = useTheme()
  const cn = useMemo(() => classNames(
    className, aliases(validated && 'was-validated')
  ), [aliases, validated, className])

  return <form ref={ref} {...controlledProps} className={cn} />
})

Form.displayName = 'Form'

Form.propTypes = {
  validated: PropTypes.bool,
}

export default Object.assign(Form, {
  Check: FormCheck as typeof FormCheck,
  Control: FormControl as typeof FormControl,
  Group: FormGroup as typeof FormGroup,
  Label: FormLabel as typeof FormLabel,
})
