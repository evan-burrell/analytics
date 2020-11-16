import { useMemo } from "react";
import {
    ApolloClient,
    InMemoryCache,
    NormalizedCacheObject,
} from "@apollo/client";
import merge from "deepmerge";

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

function createApolloClient(ctx: any): ApolloClient<NormalizedCacheObject> {
    return new ApolloClient({
        ssrMode: typeof window === "undefined",
        uri: "http://localhost:4000/graphql", // Server URL (must be absolute)
        credentials: "include",
        cache: new InMemoryCache(),
        ...(ctx && {
            headers: {
                cookie:
                    (typeof window === "undefined"
                        ? ctx?.req?.headers.cookie
                        : undefined) || "",
            },
        }),
    });
}

export function initializeApollo({
    initialState = null,
    ctx = null,
}: any = {}) {
    const _apolloClient = apolloClient ?? createApolloClient(ctx);

    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // gets hydrated here
    if (initialState) {
        // Get existing cache, loaded during client side data fetching
        const existingCache = _apolloClient.extract();

        // Merge the existing cache into data passed from getStaticProps/getServerSideProps
        const data = merge(initialState, existingCache);

        // Restore the cache with the merged data
        _apolloClient.cache.restore(data);
    }
    // For SSG and SSR always create a new Apollo Client
    if (typeof window === "undefined") return _apolloClient;
    // Create the Apollo Client once in the client
    if (!apolloClient) apolloClient = _apolloClient;

    return _apolloClient;
}

export function useApollo(initialState: any, ctx: any) {
    return useMemo(() => initializeApollo({ initialState, ctx }), [
        initialState,
        ctx,
    ]);
}
