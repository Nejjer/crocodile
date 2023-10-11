import { makeAutoObservable } from 'mobx';
import * as signalR from '@microsoft/signalr';
import { API_PATH } from '../constants.ts';

export class ChatStore {
  constructor() {
    makeAutoObservable(this);
  }

  public init() {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(API_PATH + '/chat')
      .configureLogging(signalR.LogLevel.Information)
      .build();

    connection.start();
  }
}
