import { axiosInstance, IConnectionInfo } from './axiosInstance.ts';

class CanvasAPI {
  public async sendCanvas(base64: string, roomId: string) {
    await axiosInstance.post('/canvas/post', { base64, roomId });
  }

  public async joinCanvasHub(connectionInfo: IConnectionInfo) {
    await axiosInstance.post('/canvas/joinCanvasHub', connectionInfo);
  }
}

export const canvasAPI = new CanvasAPI();
