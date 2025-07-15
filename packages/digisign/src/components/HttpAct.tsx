import type { AppComponents } from '@a4smanjorg5/invoida-components/App'
import { useMutation } from '@tanstack/react-query'
import { decode, encode } from 'cborg'
import type { ComponentType } from 'react'
import {
  type SignTypedDataParameters,
  type WalletClient,
  hexToBytes,
} from 'viem'
import { useWalletClient } from 'wagmi'
import { b64urlDecode, b64urlEncode, rejNotImplemented } from '../helpers'

type ActProps = typeof HttpAct extends ComponentType<infer P> ? P : never

const HttpAct: AppComponents['HttpAct'] = props => {
  const { data: walletClient } = useWalletClient()
  walletClient?.signTypedData
  const mutation = useMutation({
    mutationFn: (data: any) =>
      Promise.resolve(
        // biome-ignore lint/suspicious/noDoubleEquals: type of `typeof var` is definitely a string type
        typeof props.onAction == 'function' ? props.onAction(data) : data,
      ).then(data => request.call(walletClient!, props.name, data)),
    mutationKey: [props.name] as const,
    onSuccess: props.onSuccess as VoidFunction,
    onError: props.onError,
  })

  return <props.Mutation {...mutation} />
}

function request(
  this: WalletClient,
  name: ActProps['name'],
  data: unknown,
): Promise<any> {
  switch (name) {
    case 'mNew':
      return rejNotImplemented()
    case 'mSign': {
      const params = {
        primaryType: 'CustomMessage',
        // biome-ignore lint/suspicious/noDoubleEquals: type of `typeof var` is definitely a string type
        ...(typeof data == 'object'
          ? data
          : decode(b64urlDecode(data as string))),
      } as SignTypedDataParameters

      const types = { ...params.types }
      delete types[params.primaryType]

      const rawData = {
        types: {
          [params.primaryType]: [
            { name: 'iat', type: 'uint' },
            ...params.types[params.primaryType],
          ],
          ...types,
        },
        primaryType: params.primaryType,
        message: {
          iat: Math.floor(Date.now() / 1000),
          ...params.message,
        },
      }

      return this.signTypedData({
        ...rawData,
        account: this.account!,
      }).then(x =>
        b64urlEncode(
          encode({
            address: this.account!.address,
            ...rawData,
            signature: new Uint8Array(hexToBytes(x)),
          }),
        ),
      )
    }
  }
}

export default HttpAct
