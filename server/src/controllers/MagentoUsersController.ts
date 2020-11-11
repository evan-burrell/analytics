import { Request, Response } from "express";
import { MagentoUser } from "../entities/MagentoUser";
import { getRepository } from "typeorm";

export async function store(request: Request, response: Response) {
    const magentoUserRepository = getRepository(MagentoUser);

    const userToBeCreated = magentoUserRepository.create({
        magentoId: request.body.magentoId,
        email: request.body.email,
    });

    try {
        await magentoUserRepository.save(userToBeCreated);
        response.sendStatus(201);
    } catch (error) {
        response.status(500).send({ message: error.message });
    }
}
