import { type ElementType, type ReactNode, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { propTypes } from '../helpers'
import FormCheckInput from './FormCheckInput'
import FormCheckLabel from './FormCheckLabel'
import FormGroup from './FormGroup'

interface CheckProps extends Omit<Parameters<typeof FormCheckInput>[0], 'children'> {
  as?: ElementType;
  controlId: string,
  inline?: boolean;
  inputPrefix?: string;
  label: ReactNode;
  labelPrefix?: string;
  type?: typeof oneOfType[number];
}

const oneOfType = ['checkbox', 'radio'] as const

const FormCheck = forwardRef<HTMLElement, CheckProps>(({
  as: Component = 'div',
  bsPrefix = 'form-check',
  inline,
  controlId,
  inputPrefix,
  label,
  labelPrefix,
  type: inputType,
  ...inputProps
}, ref) => (
  <FormGroup
    as={Component}
    controlId={controlId}
    inline={inline}
    ref={ref}
    bsPrefix={bsPrefix}
  >
    <FormCheckInput
      bsPrefix={inputPrefix}
      type={inputType}
      {...inputProps}
    />
    <FormCheckLabel bsPrefix={labelPrefix}>{label}</FormCheckLabel>
  </FormGroup>
))

FormCheck.displayName = 'FormCheck'

FormCheck.propTypes = {
  ...propTypes,
  controlId: PropTypes.string.isRequired,
  inline: PropTypes.bool,
  inputPrefix: PropTypes.string,
  label: PropTypes.node.isRequired,
  labelPrefix: PropTypes.string,
  type: PropTypes.oneOf(oneOfType),
}

export default FormCheck
