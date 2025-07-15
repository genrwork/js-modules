import type { AppComponents } from '@a4smanjorg5/invoida-components/App'
import { useMemo } from 'react'
import { notImplemented } from '../helpers'

const HttpGet: AppComponents['HttpGet'] = ({ children }) => {
  const error = useMemo(() => {
    try {
      notImplemented()
    } catch (error) {
      return error
    }
  }, []) as Error

  return children({ error, isLoading: false })
}

export default HttpGet
