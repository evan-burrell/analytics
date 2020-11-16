import { Request, Response } from "express";
import { Redis } from "ioredis";
import { createMagentoOrderLoader } from "../utils/createMagentoOrderLoader";

export type Context = {
    req: Request & { session: { userId: number } };
    redis: Redis;
    res: Response;
    magentoOrderLoader: ReturnType<typeof createMagentoOrderLoader>
};
