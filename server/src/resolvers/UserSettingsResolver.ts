import { Ctx, Mutation } from "type-graphql";
import { v4 } from "uuid";
import { UserSettings } from "../entities/UserSettings";
import { Context } from "../types";
import argon2 from "argon2";
import dayjs from "dayjs";

export class UserSettingsResolver {
    @Mutation(() => String, { nullable: true })
    async generateApiKey(@Ctx() { req }: Context): Promise<string | null> {
        if (!req.session.userId) {
            return null;
        }

        const userSettings = await UserSettings.findOne({
            userId: req.session.userId,
        });

        if (
            userSettings?.apiKeyCreatedAt &&
            dayjs(userSettings.apiKeyCreatedAt) > dayjs().subtract(30, "day")
        ) {
            throw new Error("Unable to generate API Key.");
        }

        const apiKey = v4();
        const hashedApiKey = await argon2.hash(apiKey);

        UserSettings.create({
            apiKey: hashedApiKey,
            apiKeyCreatedAt: new Date(),
            userId: req.session.userId,
        }).save();

        return apiKey;
    }
}
