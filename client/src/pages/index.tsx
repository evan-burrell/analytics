import React from "react";
import { MagentoUsersDocument, useMagentoUsersQuery } from "generated/graphql";
import { initializeApollo } from "../utils/apolloClient";

const IndexPage = () => {
    const { data, error, loading } = useMagentoUsersQuery();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error.message}</div>;
    }

    if (!data?.magentoUsers || data.magentoUsers.length === 0) {
        return <div>No users available.</div>;
    }

    return (
        <ul>
            {data?.magentoUsers.map((user, key) => (
                <li key={key}>
                    Magento ID: {user.magentoId} - Email {user.email}
                </li>
            ))}
        </ul>
    );
};

export async function getStaticProps() {
    const apolloClient = initializeApollo();

    await apolloClient.query({
        query: MagentoUsersDocument,
    });

    return {
        props: {
            initialApolloState: apolloClient.cache.extract(),
        },
        revalidate: 1,
    };
}

export default IndexPage;
