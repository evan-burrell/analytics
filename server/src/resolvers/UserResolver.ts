import {
    Arg,
    Ctx,
    Field,
    InputType,
    Mutation,
    ObjectType,
    Query,
} from "type-graphql";
import argon2 from "argon2";
import { Context } from "../types";
import { User } from "../entities/User";
import { COOKIE_NAME } from "../constants";

@ObjectType()
class FieldError {
    @Field()
    field: string;
    @Field()
    message: string;
}

@ObjectType()
class UserResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => User, { nullable: true })
    user?: User;
}

@InputType()
export class LoginInput {
    @Field()
    email: string;

    @Field()
    password: string;
}

@InputType()
export class RegisterInput {
    @Field()
    name: string;

    @Field()
    email: string;

    @Field()
    password: string;
}

export class UserResolver {
    @Query(() => User, { nullable: true })
    async me(@Ctx() { req }: Context): Promise<User | null | undefined> {
        if (!req.session.userId) {
            return null;
        }

        return User.findOne(req.session.userId);
    }

    @Mutation(() => UserResponse)
    async login(
        @Arg("options") { email, password }: LoginInput,
        @Ctx() { req }: Context
    ): Promise<UserResponse> {
        const user = await User.findOne({
            email,
        });

        if (!user) {
            return {
                errors: [
                    {
                        field: "login",
                        message:
                            "Incorrect email or password. Please try again.",
                    },
                ],
            };
        }

        const valid = await argon2.verify(user.password, password);

        if (!valid) {
            return {
                errors: [
                    {
                        field: "login",
                        message:
                            "Incorrect email or password. Please try again.",
                    },
                ],
            };
        }

        req.session.userId = user.id;

        return {
            user,
        };
    }

    @Mutation(() => UserResponse)
    async register(
        @Arg("options") { name, email, password }: RegisterInput,
        @Ctx() { req }: Context
    ): Promise<UserResponse> {
        const foundUser = await User.findOne({
            email,
        });

        if (foundUser) {
            return {
                errors: [
                    {
                        field: "email",
                        message: `User with email ${email} already exists`,
                    },
                ],
            };
        }

        const hashedPassword = await argon2.hash(password);

        const userToBeCreated = User.create({
            name,
            email,
            password: hashedPassword,
        });

        const user = await User.save(userToBeCreated);

        req.session.userId = user.id;

        return {
            user,
        };
    }

    @Mutation(() => Boolean)
    logout(@Ctx() { req, res }: Context) {
        return new Promise((resolve) =>
            req.session.destroy((err) => {
                res.clearCookie(COOKIE_NAME);
                if (err) {
                    resolve(false);
                    return;
                }

                resolve(true);
            })
        );
    }
}
