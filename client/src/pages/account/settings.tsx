import { useGenerateApiKeyMutation } from "generated/graphql";
import React from "react";

const Settings = () => {
    const [generate, { loading, data, error }] = useGenerateApiKeyMutation();

    const handleClick = () => {
        generate();
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="space-y-4 text-center">
                <div>
                    {data?.generateApiKey
                        ? `Your API Key is: ${data?.generateApiKey}`
                        : null}
                </div>
                <div>
                    {error?.graphQLErrors
                        ? error.graphQLErrors
                              .map(({ message }) => message)
                              .join(" ")
                        : null}
                </div>
                <button
                    className="px-3 py-2 text-white bg-blue-900 rounded"
                    type="button"
                    onClick={handleClick}
                    disabled={loading}
                >
                    Generate API Key
                </button>
            </div>
        </div>
    );
};

export default Settings;
