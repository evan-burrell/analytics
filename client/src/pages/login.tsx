import { useLoginMutation } from "generated/graphql";
import { Form, Text } from "informed";
import { useRouter } from "next/router";
import React from "react";

type FormValues = {
    email: string;
    password: string;
};

const Login: React.FC = () => {
    const [login] = useLoginMutation();
    const router = useRouter();

    const handleSubmit = async (formValues: FormValues) => {
        const response = await login({
            variables: { options: { ...formValues } },
        });

        if (!response.data?.login.errors) {
            router.push("/");
        }

        if (
            response.data?.login.errors &&
            response.data.login.errors.length !== 0
        ) {
            throw new Error("Unable to register user.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Form className="w-2/3 space-y-4" onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-1">
                    <label htmlFor="email">Email Address</label>
                    <Text
                        className="px-3 py-2 border border-gray-400 rounded"
                        id="email"
                        field="email"
                        type="email"
                    />
                </div>
                <div className="flex flex-col space-y-1">
                    <label htmlFor="password">Password</label>
                    <Text
                        className="px-3 py-2 border border-gray-400 rounded"
                        id="password"
                        field="password"
                        type="password"
                    />
                </div>
                <button
                    className="px-3 py-2 text-white bg-blue-900 rounded"
                    type="submit"
                >
                    Login
                </button>
            </Form>
        </div>
    );
};

export default Login;
