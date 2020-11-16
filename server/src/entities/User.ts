import { Field, ObjectType } from "type-graphql";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { UserSettings } from "./UserSettings";

@Entity()
@ObjectType()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @Column()
    @Field()
    name: string;

    @Column({ unique: true })
    @Field()
    email: string;

    @Column()
    password: string;

    @OneToOne(() => UserSettings, { onDelete: "CASCADE" })
    @JoinColumn()
    userSettings: UserSettings;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
