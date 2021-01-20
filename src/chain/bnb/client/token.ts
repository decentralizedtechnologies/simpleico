const issue = (client: any) => {
  return async (
    senderAddress: string,
    tokenName: string,
    symbol: string,
    totalSupply: number,
    mintable: boolean,
  ): Promise<{ result: any; status: number }> => {
    try {
      client.useDefaultSigningDelegate();
      client.useDefaultBroadcastDelegate();
      client.tokens._bncClient = client;
      const res = await client.tokens.issue(
        senderAddress,
        tokenName,
        symbol,
        totalSupply,
        mintable,
      );
      console.log(res);
      return res;
    } catch (error) {
      throw error;
    }
  };
};

const mint = (client: any) => {
  return async (
    senderAddress: string,
    symbol: string,
    amount: number,
  ): Promise<{ result: any; status: number }> => {
    try {
      client.useDefaultSigningDelegate();
      client.useDefaultBroadcastDelegate();
      client.tokens._bncClient = client;
      const res = await client.tokens.mint(senderAddress, symbol, amount);
      console.log(res);
      return res;
    } catch (error) {
      throw error;
    }
  };
};

export default {
  issue,
  mint,
};
