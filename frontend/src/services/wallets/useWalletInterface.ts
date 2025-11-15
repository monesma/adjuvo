
import { useSelector } from "react-redux";
import { metamaskWallet } from "./metamask/metamaskClient";
import { walletConnectWallet } from "./walletconnect/walletConnectClient";
import type { RootState } from "../../redux/index";

export const useWalletInterface = () => {
  const { accountId: connectedAccountId } = useSelector(
    (state: RootState) => state.walletConnect
  )
  const { metamaskAccountAddress: connectedmetamaskAccountAddress } = useSelector(
    (state: RootState) => state.metamask
  )
  if (connectedmetamaskAccountAddress) {
    return {
      accountId: connectedmetamaskAccountAddress,
      walletInterface: metamaskWallet
    };
  } else if (connectedAccountId) {
    return {
      accountId: connectedAccountId,
      walletInterface: walletConnectWallet
    }
  } else {
    return {
      accountId: null,
      walletInterface: null
    };
  }
}