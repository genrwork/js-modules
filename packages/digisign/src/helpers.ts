export const b64urlEncode = (buffer: ArrayBuffer) =>
  Buffer.from(buffer)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')

export const b64urlDecode = (string: string) =>
  Buffer.from(string.replace(/-/g, '+').replace(/_/g, '/'), 'base64')

export const notImplemented = () => {
  throw new Error('Function not implemented.')
}

export const rejNotImplemented = async () => {
  throw new Error('Function not implemented.')
}
