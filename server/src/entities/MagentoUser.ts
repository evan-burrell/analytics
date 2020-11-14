import { Field, ObjectType } from "type-graphql";
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity()
@ObjectType()
export class MagentoUser {
    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @Column({ unique: true })
    @Field()
    magentoId: number;

    @Column()
    @Field()
    email: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
