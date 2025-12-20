export interface IUserStorage<T> {
  getAll(): Promise<T[]>;
  create(data: any): Promise<T>;
  remove(id: string): Promise<boolean>;
}

export class UserLibrary<T> {
  constructor(private storage: IUserStorage<T>) {}
  async listAll() {
    return await this.storage.getAll();
  }
  async addUser(userData: any) {
    return await this.storage.create(userData);
  }
  async deleteUser(id: string) {
    return await this.storage.remove(id);
  }
}
