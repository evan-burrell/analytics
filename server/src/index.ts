import "reflect-metadata";
import "dotenv-safe/config";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { MagentoUser } from "./entities/MagentoUser";
import { MagentoUserResolver } from "./resolvers/MagentoUserResolver";
import * as MagentoUsersController from "./controllers/MagentoUsersController";
import * as MagentoOrdersController from "./controllers/MagentoOrdersController";
import bodyParser from "body-parser";
import { User } from "./entities/User";
import { UserResolver } from "./resolvers/UserResolver";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";
import { MagentoOrder } from "./entities/MagentoOrder";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { createMagentoOrderLoader } from "./utils/createMagentoOrderLoader";
import { COOKIE_NAME } from "./constants";
import { UserSettings } from "./entities/UserSettings";
import { UserSettingsResolver } from "./resolvers/UserSettingsResolver";

const main = async () => {
    createConnection({
        type: "postgres",
        database: process.env.POSTGRES_DB,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        logging: true,
        synchronize: true,
        entities: [MagentoOrder, MagentoUser, User, UserSettings],
        namingStrategy: new SnakeNamingStrategy(),
    });

    const RedisStore = connectRedis(session);
    const redis = new Redis();

    const app = express();
    app.use(bodyParser.json());
    app.use(
        cors({
            origin: process.env.CORS_ORIGIN,
            credentials: true,
        })
    );
    app.use(
        session({
            name: COOKIE_NAME,
            store: new RedisStore({
                client: redis,
                disableTouch: true,
            }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
                httpOnly: true,
                sameSite: "lax", // csrf
            },
            saveUninitialized: false,
            secret: process.env.SESSION_SECRET as string,
            resave: false,
        })
    );

    const server = new ApolloServer({
        schema: await buildSchema({
            resolvers: [
                MagentoUserResolver,
                UserResolver,
                UserSettingsResolver,
            ],
            validate: false,
        }),
        context: ({ req, res }) => ({
            req,
            res,
            redis,
            magentoOrderLoader: createMagentoOrderLoader(),
        }),
    });

    server.applyMiddleware({ app, cors: false });

    app.post("/magento/users", MagentoUsersController.store);
    app.post("/magento/orders", MagentoOrdersController.store);

    app.listen({ port: process.env.PORT }, () =>
        console.log(
            `🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`
        )
    );
};

main();
