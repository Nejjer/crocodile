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
  public async join(id: string) {
    return axiosInstance.post<string>('/room/join', id, {
      headers: { 'Content-Type': 'text/plain' },
    });
  }
}

export const roomApi = new RoomAPI();
