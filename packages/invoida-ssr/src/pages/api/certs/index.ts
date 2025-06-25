// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { generateKeyPair, listKeys } from '@a4smanjorg5/invoida'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<object>,
) {
  switch (req.method) {
    case 'POST':
      res.setHeader('Content-Disposition', 'attachment; filename="pubkey.json"')
      res.status(200).json(await generateKeyPair(req.body))
      break
    case 'GET':
      const certs = { keys: await listKeys() }
      if (certs.keys.length) {
        res.setHeader('Content-Disposition', 'attachment')
      }
      res.status(200).json(certs)
      break

    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).send({ error: `Method ${req.method} not allowed` })
      break
  }
}
