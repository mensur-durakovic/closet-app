export default interface IBaseRepository<IEntity, IEditEntity> {
  save(entityData: IEntity): Promise<IEntity | null>;
  edit(id: number, entityData: IEditEntity): Promise<IEntity | null>;
  delete(id: number): Promise<IEntity | null>;
  findById(id: number): Promise<IEntity | null>;
  getAll(): Promise<IEntity[]>;
}
