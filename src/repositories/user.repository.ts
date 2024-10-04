import { Injectable } from "@nestjs/common";
import { User } from "src/entities/user.schema";
import type { Repository } from "./repository";

@Injectable()
export class UserRepository implements Repository<User> {
    public constructor() {}

    public Create = async (user: User): Promise<User> => {
        return await user.save();
    };

    public Update = async (user: User): Promise<User> => {
        return await user.save();
    };

    public Delete = async (user: User): Promise<User> => {
        const userToDelete = await User.findByPk(user.id);
        if (!userToDelete) {
            throw new Error(`User with id ${user.id} not found`);
        }
        await userToDelete.destroy();
        return userToDelete;
    };

    public GetAll = async (): Promise<User[]> => {
        return await User.findAll();
    };

    public GetById = async (id: string): Promise<User> => {
        const user = await User.findByPk(id);
        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }
        return user;
    };

    public GetByEmail = async (email: string): Promise<User> => {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error(`User with email ${email} not found`);
        }
        return user;
    };
}
