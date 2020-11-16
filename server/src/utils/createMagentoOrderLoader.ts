import DataLoader from "dataloader";
import { In } from "typeorm";
import { MagentoOrder } from "../entities/MagentoOrder";

export const createMagentoOrderLoader = () =>
    new DataLoader<number, MagentoOrder>(async (magentoUserIds) => {
        const magentoOrders = await MagentoOrder.find({
            where: { magentoUserId: In(magentoUserIds as number[]) },
        });
        const magentoUserIdToMagentoOrders: Record<number, MagentoOrder> = {};

        magentoOrders.forEach((magentoOrder) => {
            magentoUserIdToMagentoOrders[
                magentoOrder.magentoUserId
            ] = magentoOrder;
        });

        return magentoUserIds.map(
            (magentoUserId) => magentoUserIdToMagentoOrders[magentoUserId]
        );
    });
