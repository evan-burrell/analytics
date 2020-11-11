import { useRegisterMutation } from "generated/graphql";
import { Form, Text } from "informed";
import React from "react";
import { useRouter } from "next/router";

type FormValues = {
    name: string;
    email: string;
    password: string;
};

const Register: React.FC = () => {
    const router = useRouter();
    const [register] = useRegisterMutation();

    const handleSubmit = async (formValues: FormValues) => {
        try {
            const response = await register({
                variables: { options: { ...formValues } },
            });

            if (!response.data?.register.errors) {
                router.push("/");
            }

            if (
                response.data?.register.errors &&
                response.data.register.errors.length !== 0
            ) {
                throw new Error("Unable to register user.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Form className="w-2/3 space-y-4" onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-1 space-y-2">
                    <label htmlFor="name">Name</label>
                    <Text
                        className="px-3 py-2 border border-gray-400 rounded"
                        id="name"
                        field="name"
                    />
                </div>
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
                    Register
                </button>
            </Form>
        </div>
    );
};

export default Register;
