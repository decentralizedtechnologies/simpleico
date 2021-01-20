export const isWeb3Compatible = (): boolean =>
  (window as any).ethereum !== undefined || (window as any).web3 !== undefined;

export const isEthereumEnabled = (): boolean =>
  isWeb3Compatible() && (window as any).ethereum.isConnected();

export const enableEthereumWallet = async () => {
  const ethereum = (window as any).ethereum;
  if (typeof ethereum !== "undefined") {
    await ethereum.enable();
  }
};
