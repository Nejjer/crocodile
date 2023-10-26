import { axiosInstance, IConnectionInfo } from './axiosInstance.ts';

class CanvasAPI {
  // public async sendMessage(text: string, roomId: string, name: string) {
  //     await axiosInstance.post('chat/message', { text, roomId, name });
  // }

  public async joinChatHub(connectionInfo: IConnectionInfo) {
    await axiosInstance.post('/canvas/joinCanvasHub', connectionInfo);
  }
}

export const canvasAPI = new CanvasAPI();
