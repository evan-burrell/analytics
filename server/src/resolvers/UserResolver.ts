import { User } from "../entities/User";
import {
    Arg,
    Ctx,
    Field,
    InputType,
    Mutation,
    ObjectType,
    Query,
} from "type-graphql";
import { getRepository } from "typeorm";
import argon2 from "argon2";
import { Context } from "src/types";

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
    me(@Ctx() { req }: Context) {
        // you are not logged in
        if (!req.session.userId) {
            return null;
        }

        const userRepository = getRepository(User);

        return userRepository.findOne(req.session.userId);
    }

    @Mutation(() => UserResponse)
    async register(
        @Arg("options") { name, email, password }: RegisterInput,
        @Ctx() { req }: Context
    ): Promise<UserResponse> {
        const userRepository = getRepository(User);
        const foundUser = await userRepository.findOne({
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

        const userToBeCreated = userRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        const user = await userRepository.save(userToBeCreated);

        req.session.userId = user.id;

        return {
            user,
        };
    }
}
