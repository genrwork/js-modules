import { type InputHTMLAttributes, forwardRef } from 'react'
import PropTypes from 'prop-types'
import FormControl from './FormControl'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  bsPrefix?: string;
  type?: typeof oneOfType[number];
}

const oneOfType = ['checkbox', 'radio'] as const

const FormCheckInput = forwardRef<HTMLInputElement, Props>(({
  bsPrefix = 'input',
  type: inputType = 'checkbox',
  ...props
}, ref) => (
  <FormControl
    ref={ref}
    bsPrefix={bsPrefix}
    type={inputType}
    {...props}
  />
))

FormCheckInput.displayName = 'FormCheckInput'

FormCheckInput.propTypes = {
  bsPrefix: PropTypes.string,
  type: PropTypes.oneOf(oneOfType),
}

export default FormCheckInput

