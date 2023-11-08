import * as signalR from '@microsoft/signalr';
import { HubConnection } from '@microsoft/signalr';
import { makeAutoObservable } from 'mobx';
import { API_PATH } from '../constants.ts';
import { canvasAPI } from '../api/canvasAPI.ts';
import { appStore } from './WithStore.tsx';

export interface Point {
  x: number;
  y: number;
}

export class CanvasStore {
  private connection: HubConnection | null = null;
  private _isDrawing = false;
  private _prevPoint: Point = { x: 0, y: 0 };
  private _canvasContext: CanvasRenderingContext2D | null = null;
  private _stackPrevImages: ImageData[] = [];

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

    this.connection.on('ReceiveCanvas', (args) => this.drawCanvas(args));

    return this.connection.connectionId;
  }

  private drawCanvas(base64: string) {
    const ctx = this._canvasContext;
    if (!ctx) return;
    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);
    };
    img.src = base64;
  }

  public setCanvasContext(ctx: CanvasRenderingContext2D | null) {
    if (!ctx) return;
    this._canvasContext = ctx;
    this._canvasContext.lineCap = 'round';
    this._stackPrevImages.push(
      ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height),
    );
  }

  public startDraw(point?: Point) {
    if (!point || !this._canvasContext) return;
    this._isDrawing = true;
    this._prevPoint = point;
    this._canvasContext.lineWidth = 10;
    this._canvasContext.strokeStyle = '#000000';
  }

  public endDraw() {
    console.log(this);
    this._isDrawing = false;
    if (!this._canvasContext) return;
    /** Складываем в массив предыдущих изображений **/
    this._stackPrevImages.push(
      this._canvasContext.getImageData(
        0,
        0,
        this._canvasContext.canvas.width,
        this._canvasContext.canvas.height,
      ),
    );
    /** Отправляем изображение всем участникам */
    canvasAPI.sendCanvas(
      this._canvasContext.canvas.toDataURL(),
      appStore.roomStore.id,
    );
  }

  public draw(point?: Point) {
    if (this._isDrawing && this._canvasContext && point) {
      this._canvasContext.beginPath();
      this._canvasContext.moveTo(this._prevPoint.x, this._prevPoint.y);
      this._canvasContext.lineTo(point.x, point.y);
      this._canvasContext.stroke();
      this._prevPoint = point;
    }
  }

  public undo() {
    if (this._stackPrevImages.length > 1) {
      /** Убираем из массива последнее изображение, так как оно является текущим */
      this._stackPrevImages.pop();

      const prevImage = this._stackPrevImages[this._stackPrevImages.length - 1];
      prevImage && this._canvasContext?.putImageData(prevImage, 0, 0);
    }
  }
}
