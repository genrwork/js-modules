import { type LabelHTMLAttributes, forwardRef, useMemo } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { useBsPrefix, useFormGroup } from '../contexts/form'
import { useTheme } from '../contexts/theme'

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  bsPrefix?: string;
}

const FormLabel = forwardRef<HTMLLabelElement, Props>(({
  bsPrefix = 'label',
  htmlFor,
  className,
  ...controlledProps
}, ref) => {
  const prefix = useBsPrefix(bsPrefix, 'form')
  const { controlId } = useFormGroup()
  const { aliases } = useTheme()
  const cn = useMemo(() => classNames(aliases(prefix), className), [aliases, prefix, className])

  return (
    <label
      ref={ref}
      htmlFor={htmlFor || controlId}
      {...controlledProps}
      className={cn}
    />
  )
})

FormLabel.displayName = 'FormLabel'

FormLabel.propTypes = {
  bsPrefix: PropTypes.string,
}

export default FormLabel
