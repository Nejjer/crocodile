import { RoomStore } from './roomStore.ts';
import { ProfileStore } from './profileStore.ts';
import { SnackbarStore } from './snackbarStore.ts';
import { ChatStore } from './chatStore.ts';
import { CanvasStore } from './canvasStore.ts';

export interface AppStore {
  roomStore: RoomStore;
  profileStore: ProfileStore;
  snackbarStore: SnackbarStore;
  chatStore: ChatStore;
  canvasStore: CanvasStore;
}

export const createAppStore = (): AppStore => ({
  roomStore: new RoomStore(),
  profileStore: new ProfileStore(),
  snackbarStore: new SnackbarStore(),
  chatStore: new ChatStore(),
  canvasStore: new CanvasStore(),
});
