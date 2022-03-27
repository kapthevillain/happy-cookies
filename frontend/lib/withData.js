import withApollo from "next-with-apollo";
import ApolloClient from "apollo-boost";
import { endpoint } from "../config";
import { LOCAL_STATE_QUERY } from "../components/Cart/Cart";
import { LOCAL_STATE_MININAV_QUERY } from "../components/Nav/MiniNav";

function createClient({ headers }) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === "development" ? endpoint : endpoint,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: "include"
        },
        headers
      });
    },

    // local data
    clientState: {
      resolvers: {
        Mutation: {
          toggleCart(_, variables, { cache }) {
            // 1. read the cartOpen value from cache
            const { cartOpen } = cache.readQuery({
              query: LOCAL_STATE_QUERY
            });
            // write cart state to opposite bool
            const data = {
              data: { cartOpen: !cartOpen }
            };
            cache.writeData(data);
            return data;
          },
          toggleMiniNav(_, variables, { cache }) {
            const { miniNavOpen } = cache.readQuery({
              query: LOCAL_STATE_MININAV_QUERY
            });
            const data = {
              data: { miniNavOpen: !miniNavOpen }
            };
            cache.writeData(data);

            return data;
          }
        }
      },
      defaults: {
        cartOpen: false,
        miniNavOpen: false
      }
    }
  });
}

export default withApollo(createClient);
