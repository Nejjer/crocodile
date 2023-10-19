import * as signalR from '@microsoft/signalr';
import { HubConnection } from '@microsoft/signalr';
import { makeAutoObservable } from 'mobx';
import { API_PATH } from '../constants.ts';

interface ICanvas {
  base64: string;
}

export class CanvasStore {
  public canvas: ICanvas = { base64: '' };
  private connection: HubConnection | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  public async init() {
    if (this.connection) return;

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(API_PATH + '/canvas')
      .configureLogging(signalR.LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    await this.connection.start();

    this.connection.on('ReceiveMessage', (args) => this.setCanvas(args));

    return this.connection.connectionId;
  }

  private setCanvas(base64: string) {
    this.canvas.base64 = base64;
  }
}
