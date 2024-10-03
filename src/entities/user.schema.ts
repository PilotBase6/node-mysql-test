

import { Table, Column, Model } from "sequelize-typescript";
import { v4 as uuidv4 } from 'uuid';

interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
}

@Table
export class User extends Model<IUser>{
    @Column
    override id!: string;

    @Column
    name!: string;

    @Column
    email!: string;

    @Column
    password!: string;

    public User(name: string, email: string, password: string) {
        this.id = uuidv4();
        this.name = name;
        this.email = email;
        this.password = password;
    }
}