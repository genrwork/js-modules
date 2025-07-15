import { type ComponentType, useEffect } from 'react'
import Head from './Head'

const Favicon: ComponentType<{
  [K in 'appName' | 'type' | 'href']: string
}> = ({ appName, ...attr }) => {
  useEffect(() => {
    document.title = 'DigiSign'
  })

  return (
    <Head>
      <link rel="icon" {...attr} />
    </Head>
  )
}

export default Favicon
