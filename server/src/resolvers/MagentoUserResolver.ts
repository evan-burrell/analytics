import { MagentoUser } from "../entities/MagentoUser";
import { Query, Resolver } from "type-graphql";

@Resolver()
export class MagentoUserResolver {
    @Query(() => [MagentoUser])
    async magentoUsers(): Promise<MagentoUser[]> {
        return MagentoUser.find();
    }
}
