import { makeAutoObservable } from 'mobx';

export class RoomStore {
  public id: string;

  constructor() {
    this.id = '';
    makeAutoObservable(this);
  }
}
