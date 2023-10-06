import { RoomStore } from './roomStore.ts';

export interface AppStore {
  roomStore: RoomStore;
}

export const createAppStore = (): AppStore => ({
  roomStore: new RoomStore(),
});
