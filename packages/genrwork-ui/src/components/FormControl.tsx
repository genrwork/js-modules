import {
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
  forwardRef,
  useMemo,
} from 'react'
import classNames from 'classnames'
import { useBsPrefix, useFormGroup } from '../contexts/form'
import { useTheme } from '../contexts/theme'
import { type Props as BaseProps, propTypes } from '../helpers'

interface BsPrefixProp {
  bsPrefix?: string;
}

type FormControlElement = HTMLInputElement | HTMLTextAreaElement

type InnerProps = BaseProps<FormControlElement>

interface InputProps extends BsPrefixProp, InputHTMLAttributes<HTMLInputElement> {
  as?: 'input';
}

interface TextAreaProps extends BsPrefixProp, TextareaHTMLAttributes<HTMLTextAreaElement> {
  as: 'textarea';
}

const FormControl = forwardRef<FormControlElement, InputProps | TextAreaProps>(({
  as: Component = 'input',
  bsPrefix = 'control',
  id,
  className,
  ...controlledProps
}: InnerProps, ref) => {
  const prefix = useBsPrefix(bsPrefix, 'form')
  const { controlId } = useFormGroup()
  const { aliases } = useTheme()
  const cn = useMemo(() => classNames(aliases(prefix), className), [aliases, prefix, className])

  return (
    <Component
      ref={ref}
      id={id || controlId}
      {...controlledProps}
      className={cn}
    />
  )
})

FormControl.displayName = 'FormControl'

FormControl.propTypes = propTypes

export default FormControl
