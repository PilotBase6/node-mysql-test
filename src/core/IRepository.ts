
export interface IRepository<T> {
    Create(model: T): Promise<T>;
    Update(model: T): Promise<T>;
    Delete(model: T): Promise<T>;
    GetAll(): Promise<T[]>;
    GetById(id: string): Promise<T>;
}
