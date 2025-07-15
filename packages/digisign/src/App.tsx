import SubApp from '@a4smanjorg5/invoida-components/App'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import Favicon from './components/Favicon'
import HttpAct from './components/HttpAct'
import HttpGet from './components/HttpGet'
import Verifier from './components/Verifier'

function App() {
  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()

  return (
    <>
      <div>
        <h2>Account</h2>

        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        {account.status === 'connected' && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <div>
        <h2>Connect</h2>
        {connectors.map(connector => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>

      <SubApp
        Favicon={Favicon}
        HttpGet={HttpGet}
        HttpAct={HttpAct}
        Verifier={Verifier}
      />
    </>
  )
}

export default App
