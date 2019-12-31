export const routes = {
  root: "/",
  home: {},
  bnb: {
    token: {
      new: {
        params: "/bnb/token/new/params",
        connect: "/bnb/token/new/connect",
        deploy: "/bnb/token/new/deploy",
        next: "/bnb/token/new/next",
      },
    },
  },
};

export default routes;
