import { makeAutoObservable } from 'mobx';

export class ProfileStore {
  public id: string;
  public name: string;

  constructor() {
    this.id = '';
    this.name = '';
    makeAutoObservable(this);
  }
}
