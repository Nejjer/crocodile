import { makeAutoObservable } from 'mobx';

export class ProfileStore {
  public id: string;

  constructor() {
    this.id = '';
    makeAutoObservable(this);
  }
}
