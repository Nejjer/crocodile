import { axiosInstance } from './axiosInstance.ts';

class RoomAPI {
  /**
   * Создает комнату и возвращает id созданной комнаты
   */
  public async create() {
    return axiosInstance.post<string>('/room/create');
  }

  /**
   * Присоединяемся к комнате
   */
  public async join(roomId: string) {
    return axiosInstance.get<string>(`/room/join/${roomId}`);
  }
}

export const roomApi = new RoomAPI();
