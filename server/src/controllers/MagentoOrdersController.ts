import { Request, Response } from "express";
import { MagentoUser } from "../entities/MagentoUser";
import { MagentoOrder } from "../entities/MagentoOrder";

type StoreRequestBody = {
    magentoId: number;
    email: string;
    magentoOrderId: number;
};

export async function store(request: Request, response: Response) {
    const { magentoId, email, magentoOrderId }: StoreRequestBody = request.body;

    const magentoUser = MagentoUser.create({
        magentoId,
        email,
    });

    const magentoOrder = MagentoOrder.create({
        magentoOrderId,
        magentoUser,
    });

    try {
        await MagentoOrder.save(magentoOrder);
        response.sendStatus(201);
    } catch (error) {
        response.status(500).send({ message: error.message });
    }
}
