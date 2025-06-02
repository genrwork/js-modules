import { createContext, useContext } from 'react'
import { type UsePrefixHook, useBsPrefix as usePrefix } from '../helpers'

interface FormContextValue {
  bsPrefix?: string;
  controlId?: string;
}

const FormContext = createContext<FormContextValue>({})

export const FormProvider = FormContext.Provider

export const useBsPrefix: UsePrefixHook = (...args) => usePrefix(FormContext, ...args)

export const useFormGroup = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { bsPrefix, ...rest } = useContext(FormContext)

  return rest
}
