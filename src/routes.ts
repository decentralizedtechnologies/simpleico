export const routes = {
  root: "/",
  home: {},
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
          params: "/bnb/bep2/mint/params",
          connect: "/bnb/bep2/mint/connect",
          run: "/bnb/bep2/mint/run",
          finish: "/bnb/bep2/mint/finish",
        },
      },
    },
  },
};

export default routes;
