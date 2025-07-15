import type { AppComponents } from '@a4smanjorg5/invoida-components/App'
import { useMutation } from '@tanstack/react-query'
import { decode } from 'cborg'
import { bytesToHex } from 'viem'
import { usePublicClient } from 'wagmi'
import { b64urlDecode } from '../helpers'

const Verifier: AppComponents['Verifier'] = props => {
  const client = usePublicClient()
  const mutation = useMutation({
    mutationFn: async (jws: Parameters<typeof props.onVerify>[0]) => {
      const signed = decode(b64urlDecode(jws))
      const valid = await client.verifyTypedData({
        ...signed,
        signature: bytesToHex(signed.signature),
      })

      if (!valid) {
        throw new Error('Invalid signed data')
      }

      return {
        verified: {
          payload: signed.message,
        } as any,
        jwt: jws,
      }
    },
    mutationKey: [props.name],
    onMutate: props.onAction,
    onSuccess: props.onSuccess,
    onError: props.onError,
  })

  return <props.VerifyAct {...mutation} />
}

export default Verifier
