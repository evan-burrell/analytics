import { Request, Response } from "express";
import { Redis } from "ioredis";

export type Context = {
    req: Request & { session: { userId: number } };
    redis: Redis;
    res: Response;
};
