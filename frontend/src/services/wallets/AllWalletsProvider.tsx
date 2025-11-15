import type { ReactNode } from "react"
import { MetaMaskClient } from "./metamask/metamaskClient"
import { WalletConnectClient } from "./walletconnect/walletConnectClient"

export const AllWalletsProvider = (props: {
  children: ReactNode | undefined
}) => {
  return (
    <>
        <MetaMaskClient />
        <WalletConnectClient />
        {props.children}
    </>
  )
}
