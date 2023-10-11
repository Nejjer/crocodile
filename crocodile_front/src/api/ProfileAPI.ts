import { axiosInstance } from './axiosInstance.ts';

class ProfileAPI {
  /**
   * Создает пользователя в комнате
   */
  public async login(roomId: string, name: string) {
    return axiosInstance.post<string>(`/profile/login/${roomId}`, { name });
  }
}

export const profileApi = new ProfileAPI();
