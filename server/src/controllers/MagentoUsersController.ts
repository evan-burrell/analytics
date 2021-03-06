import { Request, Response } from "express";
import { MagentoUser } from "../entities/MagentoUser";

type StoreRequestBody = {
    magentoId: number;
    email: string;
};

export async function store(request: Request, response: Response) {
    const { magentoId, email }: StoreRequestBody = request.body;

    const userToBeCreated = MagentoUser.create({
        magentoId,
        email,
    });

    try {
        await MagentoUser.save(userToBeCreated);
        response.sendStatus(201);
    } catch (error) {
        response.status(500).send({ message: error.message });
    }
}
