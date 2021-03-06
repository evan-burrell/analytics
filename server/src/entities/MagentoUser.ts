import { Field, ObjectType } from "type-graphql";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { MagentoOrder } from "./MagentoOrder";

@Entity()
@ObjectType()
export class MagentoUser extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @Column({ unique: true })
    @Field()
    magentoId: number;

    @Column({ unique: true })
    @Field()
    email: string;

    @OneToMany(() => MagentoOrder, (order) => order.magentoUser)
    magentoOrders: MagentoOrder[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
