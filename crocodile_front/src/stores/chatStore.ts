import { makeAutoObservable } from 'mobx';
import * as signalR from '@microsoft/signalr';
import { HubConnection } from '@microsoft/signalr';
import { API_PATH } from '../constants.ts';

interface IMessage {
  id: string;
  text: string;
}

export class ChatStore {
  public messages: IMessage[] = [];
  private connection: HubConnection | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  public async init() {
    if (this.connection) return;
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(API_PATH + '/chat')
      .configureLogging(signalR.LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    await this.connection.start();

    this.connection.on('ReceiveMessage', (args) => this.addMessage(args));

    return this.connection.connectionId;
  }

  private addMessage(message: IMessage) {
    this.messages.push(message);
  }
}
