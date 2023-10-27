import * as signalR from '@microsoft/signalr';
import { HubConnection } from '@microsoft/signalr';
import { makeAutoObservable } from 'mobx';
import { API_PATH } from '../constants.ts';

interface ICanvas {
  base64: string;
}
export interface Point {
  x: number;
  y: number;
}

export class CanvasStore {
  public canvasData: ICanvas = { base64: '' };
  private connection: HubConnection | null = null;
  private _isDrawing = false;
  private _prevPoint: Point = { x: 0, y: 0 };
  private _canvasContext: CanvasRenderingContext2D | null = null;
  private _stackPrevImages: ImageData[] = [];
  private _canvasSize: Point = { x: 0, y: 0 };

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
    this.canvasData.base64 = base64;
  }

  public setCanvasContext(
    ctx: CanvasRenderingContext2D | null,
    canvas: HTMLCanvasElement,
  ) {
    if (!ctx) return;
    this._canvasSize = { x: canvas.width, y: canvas.height };
    this._stackPrevImages.push(
      ctx.getImageData(0, 0, canvas.width, canvas.height),
    );
    this._canvasContext = ctx;
    this._canvasContext.lineCap = 'round';
  }

  public startDraw(point?: Point) {
    if (!point || !this._canvasContext) return;
    this._isDrawing = true;
    this._prevPoint = point;
    this._canvasContext.lineWidth = 10;
    this._canvasContext.strokeStyle = '#000000';
  }

  public endDraw() {
    this._isDrawing = false;
    /** Складываем в массив предыдущих изображений **/
    this._canvasContext &&
      this._stackPrevImages.push(
        this._canvasContext.getImageData(
          0,
          0,
          this._canvasSize.x,
          this._canvasSize.y,
        ),
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
