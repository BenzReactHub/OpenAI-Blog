import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export const AuthRouteProtect = withPageAuthRequired(() => {
  return {
    props: {},
  };
});
