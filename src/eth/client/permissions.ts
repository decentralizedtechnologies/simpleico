export const ethereum = (window as any).ethereum;

export const isWeb3Compatible = (): boolean => ethereum !== undefined;

export const isEthereumEnabled = (): boolean =>
  isWeb3Compatible() && ethereum.selectedAddress !== null;

export const enableEthereumWallet = async () => {
  if (ethereum) {
    await ethereum.enable();
  }
};
