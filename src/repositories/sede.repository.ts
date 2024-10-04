import { Injectable } from "@nestjs/common";
import { Sede } from "src/entities/sede.schema";
import type { Repository } from "./repository";

@Injectable()
export class SedeRepository implements Repository<Sede> {
    public constructor() {}

    public Create = async (sede: Sede): Promise<Sede> => {
        return await sede.save();
    };

    public Update = async (sede: Sede): Promise<Sede> => {
        return await sede.save();
    };

    public Delete = async (sede: Sede): Promise<Sede> => {
        const userToDelete = await Sede.findByPk(sede.id);
        if (!userToDelete) {
            throw new Error(`Sede with id ${sede.id} not found`);
        }
        await userToDelete.destroy();
        return userToDelete;
    };

    public GetAll = async (): Promise<Sede[]> => {
        return await Sede.findAll();
    };

    public GetById = async (id: string): Promise<Sede> => {
        const sede = await Sede.findByPk(id);
        if (!sede) {
            throw new Error(`Sede with id ${id} not found`);
        }
        return sede;
    };

    public GetByName = async (name: string): Promise<Sede> => {
        const sede = await Sede.findOne({ where: { name } });
        if (!sede) {
            throw new Error(`Sede with email ${name} not found`);
        }
        return sede;
    };
}
