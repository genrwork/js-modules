import { type AppComponents } from '@a4smanjorg5/invoida-components/App'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { type ComponentType } from 'react'

type ActProps = typeof HttpAct extends ComponentType<infer P> ? P : never

const HttpAct: AppComponents['HttpAct'] = props => {
  const mutation = useMutation({
    mutationFn: (data: never) => Promise.resolve(
      typeof props.onAction == 'function'
      ? props.onAction(data)
      : data
    ).then(data => request(props, data).then(resp => resp.data)),
    mutationKey: [props.name] as const,
    onSuccess: props.onSuccess as VoidFunction,
    onError: props.onError,
  })

  return <props.Mutation {...mutation} />
}

const request = ({ name, params }: ActProps, data: unknown) => {
  switch (name) {
    case 'mNew':
      return axios.post('/api/certs', data, {
        headers: { 'Content-Type': 'text/plain' }
      })
    case 'mSign':
      return axios.post('/api/sign/' + params.kid + (
        (params.issuer || '') && ('?iss=' + encodeURIComponent(params.issuer))
      ), data, {
        headers: { 'Content-Type': 'application/json' }
      })
  }
}

export default HttpAct
