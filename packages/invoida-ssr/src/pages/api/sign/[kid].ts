// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { sign } from '@a4smanjorg5/invoida'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<object>,
) {
  if (! req.query.kid) {
    res.status(404).send({ error: `Cannot ${req.method} ` + req.url })
  }
  if (req.method == 'POST') {
    const iss = req.query.iss && (
      typeof req.query.iss == 'string' ? req.query.iss : req.query.iss.reduce((_, str) => str)
    )
    try {
      const s = await sign(req.query.iss ? { iss, ...req.body } : req.body, '' + req.query.kid)
      if (typeof req.body == 'object') {
        res.end(s)
      } else {
        res.status(400).json({ reason: 'Required type of input must JSON object' })
      }
    } catch {
      res.status(404).send({ error: `Cannot ${req.method} ` + req.url })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).send({ error: `Method ${req.method} not allowed` })
  }
}
