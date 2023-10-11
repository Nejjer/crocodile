import { RoomStore } from './roomStore.ts';
import { ProfileStore } from './profileStore.ts';

export interface AppStore {
  roomStore: RoomStore;
  profileStore: ProfileStore;
}

export const createAppStore = (): AppStore => ({
  roomStore: new RoomStore(),
  profileStore: new ProfileStore(),
});
