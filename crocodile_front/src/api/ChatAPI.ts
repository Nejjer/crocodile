import { axiosInstance, IConnectionInfo } from './axiosInstance.ts';

class ChatAPI {
  public async sendMessage(text: string, roomId: string, name: string) {
    await axiosInstance.post('chat/message', { text, roomId, name });
  }

  public async joinChatHub(connectionInfo: IConnectionInfo) {
    await axiosInstance.post('/chat/joinChatHub', connectionInfo);
  }
}

export const chatAPI = new ChatAPI();
