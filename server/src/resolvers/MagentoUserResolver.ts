import { MagentoUser } from "../entities/MagentoUser";
import { Ctx, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { MagentoOrder } from "../entities/MagentoOrder";
import { Context } from "../types";

@Resolver(MagentoUser)
export class MagentoUserResolver {
    @FieldResolver(() => MagentoOrder)
    async magentoOrders(
        @Root() magentoUser: MagentoUser,
        @Ctx() { magentoOrderLoader }: Context
    ) {
        return magentoOrderLoader.load(magentoUser.id);
    }

    @Query(() => [MagentoUser])
    async magentoUsers(): Promise<MagentoUser[]> {
        return MagentoUser.find();
    }
}
