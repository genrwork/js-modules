import { AppComponents } from '@a4smanjorg5/invoida-components/App'
import Loading from '@a4smanjorg5/invoida-components/Loading'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect, useState } from 'react'

const HttpGet: AppComponents['HttpGet'] = ({ name: sectName, refetchable, children, ...rest }) => {
  const [refetch, setRefetch] = useState(false)
  const { data, error, isFetching, isLoading } = useQuery({
    refetchOnWindowFocus: refetchable,
    ...rest,
    queryFn: process,
    queryKey: [sectName, refetch] as const,
  })

  useEffect(() => {
    if (refetchable) {
      setRefetch(s => !s)
    }
  }, [refetchable])

  if (isLoading) {
    return <Loading />
  }

  return children({
    data, error,
    isLoading: isFetching,
  })
}

const process = () => axios.get('/api/certs').then(resp => resp.data)

export default HttpGet
