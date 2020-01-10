export const routes = {
  root: "/",
  // root: "/eth/erc20/new/params",
  home: {},
  eth: {
    erc20: {
      new: {
        params: "/eth/erc20/new/params",
        connect: "/eth/erc20/new/connect",
        create: "/eth/erc20/new/create",
        finish: "/eth/erc20/new/finish",
      },
      tools: {
        select: "/eth/erc20/tools",
      },
    },
  },
  bnb: {
    token: {
      new: {
        params: "/bnb/token/new/params",
        connect: "/bnb/token/new/connect",
        create: "/bnb/token/new/create",
        deploy: "/bnb/token/new/deploy",
        finish: "/bnb/token/new/finish",
        next: "/bnb/token/new/next",
      },
      tools: {
        select: "/bnb/bep2/tools/select",
        mint: {
          connect: "/bnb/bep2/mint/connect",
          params: "/bnb/bep2/mint/params",
          run: "/bnb/bep2/mint/run",
          finish: "/bnb/bep2/mint/finish",
        },
      },
    },
  },
};

export default routes;
