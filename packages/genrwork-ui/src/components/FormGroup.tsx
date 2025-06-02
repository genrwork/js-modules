import { forwardRef, useMemo } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { FormProvider } from '../contexts/form'
import { useTheme } from '../contexts/theme'
import { type Props as BaseProps, propTypes, trimDash } from '../helpers'

interface Props extends BaseProps {
  controlId: string;
  inline?: boolean;
  reverse?: boolean;
}

const FormGroup = forwardRef<HTMLElement, Props>(({
  as: Component = 'div',
  bsPrefix,
  className,
  inline = false,
  reverse = false,
  controlId,
  ...controlledProps
}, ref) => {
  const { aliases } = useTheme()
  const cn = useMemo(() => classNames(aliases(
    bsPrefix,
    inline && `${bsPrefix && trimDash(bsPrefix)}-inline`,
    reverse && `${bsPrefix && trimDash(bsPrefix)}-reverse`,
  ), className), [
    aliases,
    bsPrefix,
    className,
    inline,
    reverse,
  ])

  return (
    <FormProvider value={{ bsPrefix, controlId }}>
      <Component
        ref={ref}
        {...controlledProps}
        className={cn}
      />
    </FormProvider>
  )
})

FormGroup.displayName = 'FormGroup'

FormGroup.propTypes = {
  ...propTypes,
  controlId: PropTypes.string.isRequired,
  inline: PropTypes.bool,
  reverse: PropTypes.bool,
}

export default FormGroup
