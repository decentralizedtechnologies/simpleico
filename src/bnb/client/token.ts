const issue = (client: any) => {
  return async (
    senderAddress: string,
    tokenName: string,
    symbol: string,
    totalSupply: number,
    mintable: boolean,
  ) => {
    try {
      const res = await client.tokens.issue(senderAddress, tokenName, symbol, totalSupply, mintable);
      console.log(res);
    } catch (error) {
      throw error;
    }
  };
};

export default {
  issue,
};
