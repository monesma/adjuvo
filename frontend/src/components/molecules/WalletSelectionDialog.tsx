import { connectToMetamask } from "../../services/wallets/metamask/metamaskClient";
import { openWalletConnectModal } from "../../services/wallets/walletconnect/walletConnectClient";
import MetamaskLogo from "../../assets/metamask-logo.svg";
import WalletConnectLogo from "../../assets/walletconnect-logo.svg";
import Button from "../atoms/Button";
import { H2 } from "../atoms/Headers";


interface WalletSelectionDialogProps {
  setOpen: (value: boolean) => void;
}

export const WalletSelectionDialog = (props: WalletSelectionDialogProps) => {
  const { setOpen } = props;

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000,
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
      }}
    > 
      <div className="flex justify-between mb-2 items-top">
        <H2 className="mb-0 mt-0 text-black text-lg text-left">Connect your wallet</H2>
        <button className="text-black font-bold text-md" onClick={()=>setOpen(false)}>X</button>
      </div>
      <p style={{ color: 'black', marginBottom: '0.5rem' }}>Please choose your connection method</p>
      <div className="flex justify-center">
        <Button
          onClick={() => {
            openWalletConnectModal();
            setOpen(false);
          }}
          className="w-[100px] text-[10px] p-2 mx-0"
        >
          <img
            src={WalletConnectLogo}
            alt='walletconnect logo'
            className='walletLogoImage'
            style={{width: 67, margin: "0 auto 10px"}}
          />
          WalletConnect
        </Button>
        <Button
          onClick={() => {
            connectToMetamask();
            setOpen(false);
          }}
          className="w-[100px] text-[10px] p-2 mx-4"
        >
          <img
            src={MetamaskLogo}
            alt='metamask logo'
            className='walletLogoImage'
            style={{width: 50, margin: "0 auto 10px"}}
          />
          Metamask
        </Button>
      </div>
    </div>
  );
};
