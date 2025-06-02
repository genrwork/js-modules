import { forwardRef } from 'react'
import PropTypes from 'prop-types'
import FormLabel from './FormLabel'

const FormCheckLabel: typeof FormLabel = forwardRef(({
  bsPrefix = 'label',
  ...props
}, ref) => (
  <FormLabel ref={ref} bsPrefix={bsPrefix} {...props} />
))

FormCheckLabel.displayName = 'FormCheckLabel'

FormCheckLabel.propTypes = {
  bsPrefix: PropTypes.string,
}

export default FormCheckLabel
