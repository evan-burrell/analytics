import { Field, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class MagentoUser {
    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @Column()
    @Field()
    magentoId: number;

    @Column()
    @Field()
    email: string;
}
