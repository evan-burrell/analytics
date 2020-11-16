import { Field, ObjectType } from "type-graphql";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { MagentoUser } from "./MagentoUser";

@Entity()
@ObjectType()
export class MagentoOrder extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @Column()
    @Field()
    magentoOrderId: number;

    @Column()
    magentoUserId: number;

    @ManyToOne(() => MagentoUser, (user) => user.magentoOrders, {
        cascade: true,
    })
    magentoUser: MagentoUser;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
