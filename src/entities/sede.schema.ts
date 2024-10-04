import { Table, Column, Model, PrimaryKey, DataType, HasMany } from "sequelize-typescript";
import { User } from "./user.schema";

export interface ISede {
    id: string;
    name: string;
    location: string;
    createdAt?: Date;
    updatedAt?: Date;
}

@Table
export class Sede extends Model<ISede> {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
    })
    public override id!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    public name!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    public location!: string;

    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    public override createdAt?: Date;

    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    public override updatedAt?: Date;

    @HasMany(() => User)
    public users!: User[];
}
