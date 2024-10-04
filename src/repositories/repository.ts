import { IRepository } from "src/core/IRepository";

export abstract class Repository<T> implements IRepository<T> {
	abstract Create(model: T): Promise<T>;
	abstract Update(model: T): Promise<T>;
	abstract Delete(model: T): Promise<T>;
	abstract GetAll(): Promise<T[]>;
	abstract GetById(id: string): Promise<T>;
}