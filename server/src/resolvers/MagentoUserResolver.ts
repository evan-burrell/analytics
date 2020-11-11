import { MagentoUser } from "../entities/MagentoUser";
import { Query, Resolver } from "type-graphql";
import { getRepository, Repository } from "typeorm";

@Resolver()
export class MagentoUserResolver {
    magentoUserRepository: Repository<MagentoUser>;

    constructor() {
        this.magentoUserRepository = getRepository(MagentoUser);
    }

    @Query(() => [MagentoUser])
    async magentoUsers(): Promise<MagentoUser[]> {
        return this.magentoUserRepository.find();
    }
}
